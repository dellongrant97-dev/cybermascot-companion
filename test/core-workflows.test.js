'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');
const workspaceUtils = require('../workspace-utils');

const mainSource = fs.readFileSync(path.join(__dirname, '..', 'main.js'), 'utf8');
const rendererSource = fs.readFileSync(path.join(__dirname, '..', 'renderer.js'), 'utf8');

function sourceBetween(startMarker, endMarker) {
  const start = mainSource.indexOf(startMarker);
  const end = mainSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `Missing source marker: ${startMarker}`);
  assert.ok(end > start, `Missing source marker: ${endMarker}`);
  return mainSource.slice(start, end);
}

function rendererSourceBetween(startMarker, endMarker) {
  const start = rendererSource.indexOf(startMarker);
  const end = rendererSource.indexOf(endMarker, start);
  assert.notEqual(start, -1, `Missing renderer source marker: ${startMarker}`);
  assert.ok(end > start, `Missing renderer source marker: ${endMarker}`);
  return rendererSource.slice(start, end);
}

function captureHandlers(source, context) {
  const handlers = {};
  context.ipcMain = context.ipcMain || {
    handle: (name, callback) => { handlers[name] = callback; },
    on: (name, callback) => { handlers[name] = callback; }
  };
  vm.runInNewContext(source, context);
  return handlers;
}

test('postponing a task moves its planned date forward one local day', () => {
  const source = sourceBetween(
    'function dateKeyFromLocalDate(',
    "ipcMain.handle('tasks:add'"
  ) + sourceBetween(
    "ipcMain.handle('tasks:defer'",
    "ipcMain.handle('tasks:snooze'"
  );
  const task = { id: 'plain', text: 'Plan work', createdAt: new Date(2026, 10, 20, 12).getTime() };
  const context = {
    tasks: [task],
    Date,
    String,
    Number,
    RegExp,
    ipcMain: undefined,
    saveTasks() {},
    scheduleTaskReminders() {},
    send() {}
  };
  const handlers = captureHandlers(source, context);
  const result = handlers['tasks:defer']({}, 'plain');
  assert.equal(result.ok, true);
  assert.equal(task.plannedDate, '2026-11-21');
});

test('postponing a reminder keeps its local time and clears the old notification state', () => {
  const source = sourceBetween(
    'function dateKeyFromLocalDate(',
    "ipcMain.handle('tasks:add'"
  ) + sourceBetween(
    "ipcMain.handle('tasks:defer'",
    "ipcMain.handle('tasks:snooze'"
  );
  const reminder = new Date(2026, 10, 20, 14, 30);
  const task = {
    id: 'reminder',
    text: 'Call back',
    remindAt: reminder.getTime(),
    remindedAt: Date.now(),
    notificationSent: true,
    missedAt: Date.now()
  };
  const context = {
    tasks: [task],
    Date,
    String,
    Number,
    RegExp,
    saveTasks() {},
    scheduleTaskReminders() {},
    send() {}
  };
  const handlers = captureHandlers(source, context);
  const result = handlers['tasks:defer']({}, 'reminder');
  assert.equal(result.ok, true);
  const moved = new Date(task.remindAt);
  assert.equal(moved.getDate(), 21);
  assert.equal(moved.getHours(), 14);
  assert.equal(moved.getMinutes(), 30);
  assert.equal(task.remindedAt, undefined);
  assert.equal(task.notificationSent, undefined);
  assert.equal(task.missedAt, undefined);
});

test('reminder scheduling selects the earliest unfinished reminder and records delivery', () => {
  const source = sourceBetween('function scheduleTaskReminders(', 'function saveHistory()');
  const now = 1000000;
  const scheduled = [];
  const cleared = [];
  const tasks = [
    { id: 'later', remindAt: now + 5000 },
    { id: 'earliest', remindAt: now + 2000 },
    { id: 'done', remindAt: now + 500, done: true },
    { id: 'invalid', remindAt: NaN }
  ];
  const context = {
    Date: { now: () => now },
    tasks,
    taskReminderTimer: null,
    config: { settings: { notifications: true } },
    clearTimeout: (timer) => cleared.push(timer),
    setTimeout: (callback, delay) => {
      const timer = { callback, delay };
      scheduled.push(timer);
      return timer;
    },
    saveTasks() {},
    send() {},
    console: { error() {} },
    wakeNow() {}
  };
  const notifications = [];
  class FakeNotification {
    constructor(options) { notifications.push({ options, shown: false, click: null }); this.record = notifications[notifications.length - 1]; }
    on(name, callback) { if (name === 'click') this.record.click = callback; }
    show() { this.record.shown = true; }
  }
  FakeNotification.isSupported = () => true;
  context.Notification = FakeNotification;
  let saved = 0;
  const updates = [];
  context.saveTasks = () => { saved++; };
  context.send = (channel, value) => updates.push([channel, value]);
  try {
    vm.runInNewContext(source, context);
    context.scheduleTaskReminders();
    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0].delay, 2000);

    tasks[1].remindAt = now - 120000;
    context.checkTaskReminders();
    assert.equal(tasks[1].remindedAt, now);
    assert.equal(tasks[1].notificationSent, true);
    assert.equal(tasks[1].missedAt, now);
    assert.equal(tasks[2].remindedAt, undefined);
    assert.equal(saved, 1);
    assert.equal(updates[0][0], 'tasks:updated');
    assert.equal(notifications.length, 1);
    assert.equal(notifications[0].shown, true);
    notifications[0].click();
  } finally {
    for (const timer of scheduled) cleared.push(timer);
  }
});

test('startup preferences report actual state and surface registration errors', () => {
  const source = sourceBetween(
    'function applyAutostart(',
    'function applyFocus()'
  );
  let actual = false;
  let saves = 0;
  const config = { settings: { launchAtLogin: false }, autostart: false, autostartConfigured: false };
  const context = {
    app: {
      isPackaged: true,
      setLoginItemSettings(options) { actual = options.openAtLogin; },
      getLoginItemSettings() { return { openAtLogin: actual }; }
    },
    process: { execPath: 'CyberMascot.exe' },
    config,
    saveConfig() { saves++; },
    updateTray() {},
    Boolean,
    String
  };
  vm.runInNewContext(source, context);
  const enabled = vm.runInContext('applyAutostart(true)', context);
  assert.equal(enabled.ok, true);
  assert.equal(config.autostartConfigured, true);
  actual = false;
  assert.equal(vm.runInContext('getAutostartStatus().enabled', context), false);
  context.app.setLoginItemSettings = () => { throw new Error('test permission error'); };
  const failure = vm.runInContext('applyAutostart(false)', context);
  assert.equal(failure.ok, false);
  assert.match(failure.error, /test permission error/);
  assert.equal(saves, 1);
});

test('application startup registers services and shutdown clears timers and hotkeys', () => {
  const start = mainSource.indexOf('const gotLock = app.requestSingleInstanceLock();');
  assert.notEqual(start, -1, 'application lifecycle entrypoint should exist');
  const source = mainSource.slice(start);
  const appEvents = {};
  const events = [];
  const intervals = [];
  const clearedIntervals = [];
  const clearedTimeouts = [];
  let readyCallback;
  let unregistered = false;
  const context = {
    app: {
      requestSingleInstanceLock: () => true,
      on: (name, callback) => { appEvents[name] = callback; },
      whenReady: () => ({ then: (callback) => { readyCallback = callback; } }),
      setAppUserModelId() {},
      quit() { events.push('quit'); }
    },
    process: { argv: [] },
    config: { settings: { idleMinutes: 0 }, autostartConfigured: true },
    screen: { on: () => {} },
    powerMonitor: { on: () => {} },
    globalShortcut: { unregisterAll: () => { unregistered = true; } },
    loadState: () => events.push('loadState'),
    scheduleTaskReminders: () => { events.push('scheduleTaskReminders'); context.taskReminderTimer = 'reminder'; },
    handleScreenUnlock() {},
    createWindow: () => events.push('createWindow'),
    registerHotkeys: () => events.push('registerHotkeys'),
    startClipboardWatch: () => { context.clipTimer = context.setInterval(() => {}, 1200); },
    startMediaWatch: () => { context.mediaTimer = context.setInterval(() => {}, 30000); },
    createTray: () => events.push('createTray'),
    setInterval(callback, delay) {
      const timer = { callback, delay };
      intervals.push(timer);
      return timer;
    },
    clearInterval: (timer) => clearedIntervals.push(timer),
    clearTimeout: (timer) => clearedTimeouts.push(timer),
    console: { error() {} },
    metricsTimer: null,
    cursorTimer: null,
    dragTimer: null,
    idleTimer: null,
    clipTimer: null,
    boundsTimer: null,
    mediaTimer: null,
    taskReminderTimer: null,
    sendMetrics() {},
    Number,
    Date,
    Math
  };
  vm.runInNewContext(source, context);
  assert.equal(typeof readyCallback, 'function');
  readyCallback();
  assert.deepEqual(events, [
    'loadState',
    'scheduleTaskReminders',
    'createWindow',
    'registerHotkeys',
    'createTray'
  ]);
  assert.equal(intervals.length, 5);
  assert.equal(typeof appEvents['before-quit'], 'function');
  assert.equal(typeof appEvents['will-quit'], 'function');
  appEvents['before-quit']();
  appEvents['will-quit']();
  assert.ok(clearedIntervals.includes(context.metricsTimer));
  assert.ok(clearedIntervals.includes(context.cursorTimer));
  assert.ok(clearedIntervals.includes(context.clipTimer));
  assert.ok(clearedIntervals.includes(context.mediaTimer));
  assert.ok(clearedTimeouts.includes('reminder'));
  assert.equal(unregistered, true);
});

test('assistant uses late-night local time and honors humor and emoji settings', () => {
  const source = sourceBetween(
    'function localDaypart(',
    'async function readHttpError'
  );
  const config = {
    name: 'Test',
    weather: { city: 'Nairobi' },
    settings: { humorLevel: 'medium', useEmojis: true }
  };
  const context = { config, Date, String, Array, RegExp };
  vm.runInNewContext(source, context);
  const atNight = new Date(2026, 10, 20, 23, 52);
  const prompt = vm.runInContext(`systemPrompt(null, new Date(${atNight.getTime()}))`, context);
  assert.match(prompt, /late night/);
  assert.match(prompt, /Use emojis naturally/);
  assert.match(prompt, /do not bring up weather unless the user asks/);
  assert.match(vm.runInContext("quickGreetingReply([{role:'user', content:'yooh..'}])", context), /🙂/);
});

test('mouse hit state is resent so a transparent window can recover after blur', () => {
  const source = rendererSourceBetween(
    'function updateMouseHit(e) {',
    "window.addEventListener('mousemove', updateMouseHit);"
  );
  const hits = [];
  const context = {
    performance: { now: () => 1000 },
    lastHitAt: 0,
    lastHit: true,
    noteActivity() {},
    document: { elementFromPoint: () => ({ closest: () => true }) },
    api: { hit: (value) => hits.push(value) }
  };
  vm.runInNewContext(source, context);
  vm.runInContext('updateMouseHit({clientX: 1, clientY: 2})', context);
  assert.deepEqual(hits, [true]);
});

test('the mascot remains clickable while collapsed or asleep unless click-through is enabled', () => {
  const source = sourceBetween(
    'function applyFocus()',
    'function applyDnd('
  ) + sourceBetween(
    "ipcMain.on('ui:hit'",
    "ipcMain.on('drag:start'"
  );
  const handlers = {};
  const calls = [];
  const context = {
    win: { isDestroyed: () => false, setIgnoreMouseEvents: (ignored) => calls.push(ignored) },
    clickThroughMode: false,
    focusable: true,
    sleeping: true,
    collapsed: true,
    dnd: false,
    fullscreenHidden: false,
    ipcMain: { on: (name, callback) => { handlers[name] = callback; } },
    updateTray() {},
    send: (channel, value) => calls.push([channel, value]),
    Boolean,
    console
  };
  vm.runInNewContext(source, context);
  vm.runInContext('applyFocus()', context);
  assert.equal(calls.pop(), false);
  handlers['ui:hit']({}, true);
  assert.equal(calls.pop(), false);
  context.clickThroughMode = true;
  handlers['ui:hit']({}, true);
  assert.equal(calls.pop(), true);
  vm.runInContext('setClickThroughMode(false)', context);
  assert.equal(context.clickThroughMode, false);
  assert.equal(calls[0], false);
});

test('Windows screen unlock wakes the mascot without taking focus and requests a briefing', () => {
  const source = sourceBetween('function handleScreenUnlock()', 'function registerHotkeys()');
  const calls = [];
  const context = {
    win: {
      isDestroyed: () => false,
      showInactive: () => calls.push('show-inactive'),
      webContents: { isLoading: () => false }
    },
    fullscreenHidden: false,
    sleeping: true,
    collapsed: false,
    lastActivity: 0,
    Date,
    exitSleep: (...args) => { calls.push(['exit-sleep', ...args]); context.sleeping = false; },
    send: (channel) => calls.push(channel),
    applyFocus: () => calls.push('apply-focus')
  };
  vm.runInNewContext(source, context);
  vm.runInContext('handleScreenUnlock()', context);
  assert.deepEqual(calls, [
    ['exit-sleep', true, false],
    'briefing:show'
  ]);
  assert.ok(context.lastActivity > 0);
  assert.match(mainSource, /powerMonitor\.on\('unlock-screen', handleScreenUnlock\)/);
});

test('screen-unlock briefing opens the briefing view and replaces the existing card', () => {
  const source = rendererSourceBetween(
    'api.onBriefingRequest(() => {',
    'api.onFocusChat(() => {'
  );
  const calls = [];
  let onRequest;
  const context = {
    api: { onBriefingRequest: (callback) => { onRequest = callback; } },
    appState: { tasks: [{ id: 'todo' }] },
    showView: (name) => calls.push(['view', name]),
    buildDailyBriefing: (tasks) => ({ toast: 'Welcome back', tasks }),
    addDailyBriefingCard: (briefing) => calls.push(['briefing', briefing.tasks.length]),
    showThought: (message) => calls.push(['thought', message])
  };
  vm.runInNewContext(source, context);
  onRequest();
  assert.deepEqual(calls, [
    ['view', 'chat'],
    ['briefing', 1],
    ['thought', 'Welcome back']
  ]);
  assert.match(rendererSource, /const previous = messagesEl\.querySelector\('\.briefing-card'\)/);
});

test('multi-file proposals apply and undo as a group, with stale-file protection', async () => {
  const source = sourceBetween(
    "ipcMain.handle('coding:propose-edit'",
    "ipcMain.handle('coding:run-check'"
  );
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-test-'));
  const workspace = path.join(tempRoot, 'workspace');
  fs.mkdirSync(workspace);
  const aPath = path.join(workspace, 'a.txt');
  const bPath = path.join(workspace, 'b.txt');
  fs.writeFileSync(aPath, 'old a\n');
  fs.writeFileSync(bPath, 'old b\n');
  const undoPath = path.join(tempRoot, 'undo.json');
  const undoHistory = [];
  const pendingCodingEdits = new Map();
  const approvals = [1, 0, 1, 0];
  const hash = (value) => crypto.createHash('sha256').update(value, 'utf8').digest('hex');
  const context = {
    Buffer,
    Date,
    Math,
    crypto,
    fs,
    path,
    process,
    trustedWindowEvent: () => true,
    pendingCodingEdits,
    currentWorkspaceRoot: () => workspace,
    workspaceTextFile: (value) => /\.txt$/i.test(value),
    resolveWorkspaceFile(relativePath, root = workspace) {
      if (!relativePath || path.isAbsolute(relativePath)) throw new Error('invalid path');
      const absolute = path.resolve(root, relativePath);
      const relative = path.relative(root, absolute);
      if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        throw new Error('outside workspace');
      }
      const real = fs.realpathSync(absolute);
      if (!fs.statSync(real).isFile()) throw new Error('not a file');
      return { absolute: real, relative: path.relative(root, real).split(path.sep).join('/') };
    },
    sha256: hash,
    codingUndoPath: () => undoPath,
    writeJsonStrict: (file, value) => fs.writeFileSync(file, JSON.stringify(value), 'utf8'),
    undoHistory,
    win: {},
    dialog: { showMessageBox: async () => ({ response: approvals.shift() }) },
    chatCompletion: async () => JSON.stringify({
      files: [
        { path: 'a.txt', content: 'new a\n' },
        { path: 'b.txt', content: 'new b\n' }
      ]
    })
  };
  try {
    const handlers = captureHandlers(source, context);
    const proposal = await handlers['coding:propose-edit']({}, { paths: ['a.txt', 'b.txt'], instruction: 'Update both files' });
    assert.equal(proposal.ok, true);
    assert.equal(proposal.edits.length, 2);
    assert.equal(typeof proposal.proposalId, 'string');
    assert.equal((await handlers['coding:apply-edit']({}, { edits: proposal.edits })).ok, false);

    fs.writeFileSync(bPath, 'changed elsewhere\n');
    const stale = await handlers['coding:apply-edit']({}, { proposalId: proposal.proposalId });
    assert.equal(stale.ok, false);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');
    fs.writeFileSync(bPath, 'old b\n');

    const refreshedProposal = await handlers['coding:propose-edit']({}, { paths: ['a.txt', 'b.txt'], instruction: 'Update both files' });
    const cancelled = await handlers['coding:apply-edit']({}, { proposalId: refreshedProposal.proposalId });
    assert.equal(cancelled.cancelled, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');

    const applied = await handlers['coding:apply-edit']({}, { proposalId: refreshedProposal.proposalId });
    assert.equal(applied.ok, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'new a\n');
    assert.equal(fs.readFileSync(bPath, 'utf8'), 'new b\n');
    const undoCancelled = await handlers['coding:undo-edit']({}, applied.undoId);
    assert.equal(undoCancelled.cancelled, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'new a\n');
    const undone = await handlers['coding:undo-edit']({}, applied.undoId);
    assert.equal(undone.ok, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');
    assert.equal(fs.readFileSync(bPath, 'utf8'), 'old b\n');
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('workspace reads and listings reject traversal, symlinks, and sensitive files', () => {
  const source = sourceBetween("ipcMain.handle('workspace:list'", "ipcMain.handle('coding:ask'");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-workspace-'));
  const workspace = path.join(tempRoot, 'workspace');
  const outside = path.join(tempRoot, 'outside');
  fs.mkdirSync(workspace);
  fs.mkdirSync(outside);
  fs.writeFileSync(path.join(workspace, 'safe.txt'), 'visible context\n');
  fs.writeFileSync(path.join(workspace, 'credentials.txt'), 'private marker\n');
  fs.writeFileSync(path.join(workspace, '.env.local'), 'private marker\n');
  fs.writeFileSync(path.join(outside, 'secret.txt'), 'outside marker\n');
  fs.symlinkSync(outside, path.join(workspace, 'linked'), 'junction');
  const context = {
    fs,
    path,
    Buffer,
    crypto,
    String,
    Set,
    Date,
    workspacePath: workspace,
    currentWorkspaceRoot: () => workspace,
    resolveWorkspaceFile: (value, root = workspace) => workspaceUtils.resolveWorkspaceFile(value, root),
    isSensitiveWorkspaceFile: workspaceUtils.isSensitiveWorkspaceFile,
    workspaceTextFile: workspaceUtils.workspaceTextFile,
    sha256: workspaceUtils.sha256,
    trustedWindowEvent: () => true
  };
  try {
    const handlers = captureHandlers(source, context);
    const listing = handlers['workspace:list']({});
    assert.equal(listing.ok, true);
    assert.equal(listing.files.map((file) => file.path).join('|'), 'safe.txt');

    const safeRead = handlers['workspace:read']({}, 'safe.txt');
    assert.equal(safeRead.ok, true, JSON.stringify(safeRead));
    assert.equal(safeRead.content, 'visible context\n');
    assert.equal(handlers['workspace:read']({}, 'credentials.txt').ok, false);
    assert.equal(handlers['workspace:read']({}, '.env.local').ok, false);
    assert.equal(handlers['workspace:read']({}, '../outside/secret.txt').ok, false);
    assert.equal(handlers['workspace:read']({}, path.join(outside, 'secret.txt')).ok, false);
    const linkedRead = handlers['workspace:read']({}, 'linked/secret.txt');
    assert.equal(linkedRead.ok, false);
    assert.match(linkedRead.error, /outside the selected workspace/);

    const search = handlers['workspace:search']({}, 'private marker');
    assert.equal(search.ok, true);
    assert.equal(search.matches.length, 0);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('failed multi-file apply rolls back earlier writes and discards unusable undo state', async () => {
  const handlerSource = sourceBetween(
    "ipcMain.handle('coding:apply-edit'",
    "ipcMain.handle('coding:undo-edit'"
  );
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-rollback-'));
  const workspace = path.join(tempRoot, 'workspace');
  fs.mkdirSync(workspace);
  const aPath = path.join(workspace, 'a.txt');
  const bPath = path.join(workspace, 'b.txt');
  fs.writeFileSync(aPath, 'old a\n');
  fs.writeFileSync(bPath, 'old b\n');
  const undoHistory = [];
  const pendingCodingEdits = new Map();
  const hash = (value) => crypto.createHash('sha256').update(value, 'utf8').digest('hex');
  const token = 'a'.repeat(32);
  pendingCodingEdits.set(token, {
    root: workspace,
    createdAt: Date.now(),
    edits: [
      { path: 'a.txt', original: 'old a\n', content: 'new a\n', baseHash: hash('old a\n') },
      { path: 'b.txt', original: 'old b\n', content: 'new b\n', baseHash: hash('old b\n') }
    ]
  });
  const fileSystem = Object.create(fs);
  fileSystem.renameSync = (from, to) => {
    if (path.resolve(to) === bPath && path.basename(from).startsWith('.cybermascot-')) {
      throw new Error('simulated second-file rename failure');
    }
    return fs.renameSync(from, to);
  };
  const context = {
    Buffer,
    Date,
    Math,
    crypto,
    fs: fileSystem,
    path,
    trustedWindowEvent: () => true,
    pendingCodingEdits,
    currentWorkspaceRoot: () => workspace,
    resolveWorkspaceFile: (relativePath, root = workspace) => workspaceUtils.resolveWorkspaceFile(relativePath, root),
    workspaceTextFile: workspaceUtils.workspaceTextFile,
    workspacePath: workspace,
    sha256: workspaceUtils.sha256,
    codingUndoPath: () => path.join(tempRoot, 'undo.json'),
    writeJsonStrict: (file, value) => fs.writeFileSync(file, JSON.stringify(value), 'utf8'),
    undoHistory,
    dialog: { showMessageBox: async () => ({ response: 0 }) },
    win: {}
  };
  try {
    const handlers = captureHandlers(handlerSource, context);
    const result = await handlers['coding:apply-edit']({}, { proposalId: token });
    assert.equal(result.ok, false);
    assert.match(result.error, /simulated second-file rename failure/);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');
    assert.equal(fs.readFileSync(bPath, 'utf8'), 'old b\n');
    assert.equal(context.undoHistory.length, 0);
    assert.deepEqual(fs.readdirSync(workspace).sort(), ['a.txt', 'b.txt']);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('coding checks use approved shell-free executables and report bounded output', async () => {
  const source = sourceBetween(
    'function parseCodingCheckCommand(',
    "ipcMain.handle('coding:sessions:get'"
  );
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-check-'));
  const workspace = path.join(tempRoot, 'workspace');
  const bin = path.join(tempRoot, 'node-bin');
  const npmCli = path.join(bin, 'node_modules', 'npm', 'bin', 'npm-cli.js');
  fs.mkdirSync(workspace);
  fs.mkdirSync(path.dirname(npmCli), { recursive: true });
  fs.writeFileSync(path.join(bin, 'node.exe'), '');
  fs.writeFileSync(npmCli, '');
  const spawnCalls = [];
  const prompts = [];
  const processContext = {
    platform: 'win32',
    env: {
      PATH: bin,
      SystemRoot: path.join(tempRoot, 'Windows'),
      NODE_OPTIONS: '--require injected.js',
      npm_config_script_shell: 'untrusted-shell.exe'
    }
  };
  const context = {
    Buffer,
    Date,
    String,
    Number,
    Object,
    Array,
    RegExp,
    Promise,
    process: processContext,
    fs,
    path,
    setTimeout,
    clearTimeout,
    queueMicrotask,
    trustedWindowEvent: () => true,
    currentWorkspaceRoot: () => workspace,
    win: {},
    dialog: {
      showMessageBox: async (_win, options) => {
        prompts.push(options);
        return { response: prompts.length === 2 ? 1 : 0 };
      }
    },
    codingSessions: [],
    codingSessionsPath: () => path.join(tempRoot, 'sessions.json'),
    writeJsonStrict() {},
    spawn(executable, args, options) {
      const child = new EventEmitter();
      child.pid = 456;
      child.stdout = new EventEmitter();
      child.stderr = new EventEmitter();
      child.kill = () => child.emit('close', null);
      spawnCalls.push({ executable, args, options, child });
      queueMicrotask(() => {
        child.stdout.emit('data', Buffer.alloc(50000, 0xFF));
        child.stderr.emit('data', Buffer.from('warning'));
        child.emit('close', 0);
      });
      return child;
    }
  };
  try {
    const handlers = captureHandlers(source, context);
    const result = await handlers['coding:run-check']({}, { command: 'npm test' });
    assert.equal(result.ok, true);
    assert.ok(Buffer.byteLength(result.stdout, 'utf8') <= 40000);
    assert.equal(result.stdoutTruncated, true);
    assert.equal(result.stderr, 'warning');
    assert.equal(result.stderrTruncated, false);
    assert.equal(spawnCalls.length, 1);
    assert.equal(spawnCalls[0].executable, fs.realpathSync(path.join(bin, 'node.exe')));
    assert.equal(spawnCalls[0].args[0], fs.realpathSync(npmCli));
    assert.equal(spawnCalls[0].args.slice(1).join(' '), 'test');
    assert.equal(spawnCalls[0].options.cwd, workspace);
    assert.equal(spawnCalls[0].options.shell, false);
    assert.equal(spawnCalls[0].options.env.NODE_OPTIONS, undefined);
    assert.equal(spawnCalls[0].options.env.npm_config_script_shell, undefined);
    assert.match(prompts[0].detail, /not confined to this workspace/);

    const rejected = await handlers['coding:run-check']({}, { command: 'npm test & calc.exe' });
    assert.equal(rejected.ok, false);
    assert.equal(rejected.cancelled, undefined);
    assert.equal(spawnCalls.length, 1);

    const cancelled = await handlers['coding:run-check']({}, { command: 'npm test' });
    assert.equal(cancelled.cancelled, true);
    assert.equal(spawnCalls.length, 1);

    fs.writeFileSync(path.join(workspace, 'node.exe'), '');
    processContext.env.PATH = workspace;
    assert.throws(() => context.findCodingExecutable('node', workspace), /Could not find node on PATH/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('coding-check timeout attempts Windows process-tree termination', async () => {
  const source = sourceBetween(
    'function parseCodingCheckCommand(',
    "ipcMain.handle('coding:sessions:get'"
  );
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-timeout-'));
  const workspace = path.join(tempRoot, 'workspace');
  const bin = path.join(tempRoot, 'bin');
  fs.mkdirSync(workspace);
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(bin, 'node.exe'), '');
  const timers = [];
  const spawnCalls = [];
  const processContext = { platform: 'win32', env: { PATH: bin, SystemRoot: path.join(tempRoot, 'Windows') } };
  const context = {
    Buffer,
    Date,
    String,
    Number,
    Object,
    Array,
    RegExp,
    Promise,
    process: processContext,
    fs,
    path,
    setTimeout(callback, delay) {
      const timer = { callback, delay, cleared: false };
      timers.push(timer);
      return timer;
    },
    clearTimeout(timer) { if (timer) timer.cleared = true; },
    queueMicrotask,
    trustedWindowEvent: () => true,
    currentWorkspaceRoot: () => workspace,
    win: {},
    dialog: { showMessageBox: async () => ({ response: 0 }) },
    codingSessions: [],
    codingSessionsPath: () => path.join(tempRoot, 'sessions.json'),
    writeJsonStrict() {},
    spawn(executable, args, options) {
      const child = new EventEmitter();
      child.stdout = new EventEmitter();
      child.stderr = new EventEmitter();
      child.pid = spawnCalls.length ? undefined : 789;
      child.kill = () => child.emit('close', null);
      spawnCalls.push({ executable, args, options, child });
      if (spawnCalls.length > 1) {
        queueMicrotask(() => {
          spawnCalls[0].child.emit('close', null);
          child.emit('close', 0);
        });
      }
      return child;
    }
  };
  try {
    const handlers = captureHandlers(source, context);
    const resultPromise = handlers['coding:run-check']({}, { command: 'node --test' });
    await new Promise((resolve) => setImmediate(resolve));
    const timeout = timers.find((timer) => timer.delay === 120000);
    assert.ok(timeout, 'a 120-second timeout should be set');
    timeout.callback();
    const result = await resultPromise;
    assert.equal(result.timedOut, true);
    assert.equal(result.ok, false);
    assert.match(result.error, /timed out after 120 seconds/);
    assert.equal(spawnCalls.length, 2);
    assert.match(spawnCalls[1].executable, /taskkill\.exe$/i);
    assert.equal(spawnCalls[1].args.join(' '), '/PID 789 /T /F');
    assert.equal(spawnCalls[1].options.shell, false);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('IPC permits only the trusted main frame and bounded plain-data payloads', () => {
  const source = sourceBetween('function assertSafeIpcArguments(', 'const WIN_W =');
  const context = { Buffer, Number, Object, Array, console };
  vm.runInNewContext(`${source}\nglobalThis.ipcHelpers = { assertSafeIpcArguments, createTrustedIpcMain };`, context);
  const helpers = context.ipcHelpers;
  const handlers = {};
  const events = {};
  const rawIpcMain = {
    handle: (name, callback) => { handlers[name] = callback; },
    on: (name, callback) => { events[name] = callback; }
  };
  const secure = helpers.createTrustedIpcMain(rawIpcMain, (event) => Boolean(event && event.trusted));
  secure.handle('safe:call', (_event, payload) => payload.value);
  assert.equal(handlers['safe:call']({ trusted: true }, { value: 'ok' }), 'ok');
  assert.throws(() => handlers['safe:call']({ trusted: false }, { value: 'no' }), /untrusted frame/);
  assert.throws(() => handlers['safe:call']({ trusted: true }, { constructor: 'blocked' }), /prohibited field/);
  assert.throws(() => handlers['safe:call']({ trusted: true }, 'x'.repeat(8 * 1024 * 1024 + 1)), /too large/);

  let eventCalled = false;
  secure.on('safe:event', () => { eventCalled = true; });
  events['safe:event']({ trusted: false });
  assert.equal(eventCalled, false);
  events['safe:event']({ trusted: true }, true);
  assert.equal(eventCalled, true);
});

test('IPC sender validation rejects subframes and unexpected renderer URLs', () => {
  const source = sourceBetween('function trustedWindowEvent(', 'function makeEncryptedConfigBackup(');
  const mainFrame = { url: 'file:///C:/app/renderer.html' };
  const webContents = { mainFrame };
  const context = {
    win: { isDestroyed: () => false, webContents },
    rendererFileUrl: mainFrame.url,
    Boolean
  };
  vm.runInNewContext(source, context);
  const trusted = (frame, sender = webContents) => vm.runInContext(
    'trustedWindowEvent(event)',
    Object.assign(context, { event: { sender, senderFrame: frame } })
  );
  assert.equal(trusted(mainFrame), true);
  assert.equal(trusted({ url: mainFrame.url }), false);
  assert.equal(trusted({ url: 'https://example.com' }), false);
  assert.equal(trusted(mainFrame, {}), false);
});

test('settings validation restricts provider URLs and rejects unsupported fields', () => {
  const source = sourceBetween('function isPlainObject(', "ipcMain.handle('settings:set'");
  const context = { Object, Set, URL, Array, Number, RegExp, String };
  vm.runInNewContext(`${source}\nglobalThis.validateSettingsPatch = validateSettingsPatch;`, context);
  const validate = context.validateSettingsPatch;
  assert.equal(validate({ chat: { url: 'http://127.0.0.1:11434', provider: 'ollama' } }), '');
  assert.match(validate({ chat: { baseUrl: 'http://example.com/api', apiKey: 'secret' } }), /HTTPS/);
  assert.match(validate({ chat: { baseUrl: 'https://user:pass@example.com/api' } }), /credentials/);
  assert.match(validate({ chat: { provider: 'custom-shell' } }), /provider/);
  assert.match(validate({ settings: { arbitraryFlag: true } }), /unsupported field/);
  assert.equal(validate({
    settings: {
      cpuWarningThreshold: 85,
      memoryWarningThreshold: 95,
      clipboardHistoryPaused: true,
      clipboardRetentionDays: 7
    }
  }), '');
  assert.match(validate({ settings: { cpuWarningThreshold: 100 } }), /threshold/);
  assert.match(validate({ settings: { clipboardHistoryPaused: 'true' } }), /pause/);
  assert.match(validate({ settings: { clipboardRetentionDays: 2 } }), /retention/);
});

test('external links are limited to credential-free HTTP(S) destinations', () => {
  const source = sourceBetween('function parseApprovedExternalUrl(', 'function clamp(');
  const context = { URL, String };
  vm.runInNewContext(`${source}\nglobalThis.parseApprovedExternalUrl = parseApprovedExternalUrl;`, context);
  const parse = context.parseApprovedExternalUrl;
  assert.equal(parse('https://example.com/path'), 'https://example.com/path');
  assert.equal(parse('http://localhost:3000'), 'http://localhost:3000/');
  assert.equal(parse('javascript:alert(1)'), null);
  assert.equal(parse('file:///C:/Windows/win.ini'), null);
  assert.equal(parse('https://user:pass@example.com'), null);
});

test('provider HTTP errors redact the configured API key', async () => {
  const source = sourceBetween('async function readHttpError(', 'async function chatCompletion(');
  const context = { config: { chat: { apiKey: 'secret-value' } }, String, Error };
  vm.runInNewContext(`${source}\nglobalThis.readHttpError = readHttpError;`, context);
  const error = await context.readHttpError({
    status: 401,
    text: async () => 'invalid key secret-value'
  });
  assert.doesNotMatch(error.message, /secret-value/);
  assert.match(error.message, /\[redacted\]/);
});

test('chat requests return provider failures without a success-shaped response', async () => {
  const source = sourceBetween("ipcMain.handle('chat:send'", "ipcMain.handle('chat:set-model'");
  const context = {
    Array,
    String,
    config: { chat: { provider: 'openai', model: 'test-model' } },
    weatherCache: null,
    isPlainObject: (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value)),
    quickGreetingReply: () => '',
    fetchWeather() {},
    systemPrompt: () => 'test prompt',
    chatCompletion: async () => { throw new Error('HTTP 503 provider unavailable'); }
  };
  const handlers = captureHandlers(source, context);
  const messages = [{ role: 'user', content: 'Explain this error.' }];
  const failure = await handlers['chat:send']({}, messages);
  assert.equal(failure.ok, false);
  assert.match(failure.error, /HTTP 503 provider unavailable/);

  context.chatCompletion = async () => { throw new Error('request timeout'); };
  const timeout = await handlers['chat:send']({}, messages);
  assert.equal(timeout.ok, false);
  assert.match(timeout.error, /Timed out after 45s talking to openai/);
});

test('config persistence stores API keys only as safeStorage ciphertext', () => {
  const source = sourceBetween('function persistConfigStrict(', 'function saveConfig()');
  let persisted;
  const context = {
    config: { name: 'Test', chat: { model: 'test-model', apiKey: 'secret-value' } },
    encryptedApiKey: '',
    safeStorage: {
      isEncryptionAvailable: () => true,
      encryptString: (value) => Buffer.from(`ciphertext:${value}`, 'utf8')
    },
    configPath: () => 'config.json',
    writeJsonStrict: (_file, value) => { persisted = value; }
  };
  vm.runInNewContext(`${source}\nglobalThis.persistConfigStrict = persistConfigStrict;`, context);
  context.persistConfigStrict();
  assert.equal(persisted.chat.apiKey, undefined);
  assert.equal(persisted.chat.apiKeyEncrypted, Buffer.from('ciphertext:secret-value').toString('base64'));
  assert.doesNotMatch(JSON.stringify(persisted), /secret-value/);
});

test('legacy API-key migration preserves settings and creates an encrypted timestamped backup', () => {
  const storageSource = sourceBetween('function makeEncryptedConfigBackup(', 'function currentWorkspaceRoot(');
  const loadSource = sourceBetween('function loadState()', 'function saveTasks()');
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-config-'));
  const configFile = path.join(tempRoot, 'config.json');
  fs.writeFileSync(configFile, JSON.stringify({
    name: 'Test',
    chat: { provider: 'openai', model: 'test-model', apiKey: 'legacy-secret' },
    weather: { city: 'Nairobi' },
    settings: { alwaysOnTop: false, humorLevel: 'low', useEmojis: false },
    clipboard: []
  }), 'utf8');
  const context = {
    Buffer,
    Date,
    JSON,
    Number,
    String,
    Array,
    Object,
    fs,
    path,
    config: null,
    CLIP_LIMIT: 5,
    configPath: () => configFile,
    userDir: () => tempRoot,
    tasksPath: () => path.join(tempRoot, 'tasks.json'),
    historyPath: () => path.join(tempRoot, 'chat-history.json'),
    codingSessionsPath: () => path.join(tempRoot, 'coding-sessions.json'),
    codingUndoPath: () => path.join(tempRoot, 'coding-undo.json'),
    readJson(file, fallback) {
      try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { return fallback; }
    },
    writeJsonStrict(file, value) { fs.writeFileSync(file, JSON.stringify(value, null, 2), 'utf8'); },
    safeStorage: {
      isEncryptionAvailable: () => true,
      encryptString: () => Buffer.from('mock-ciphertext'),
      decryptString: () => 'legacy-secret'
    },
    DEFAULT_CONFIG: {
      name: 'Default',
      chat: { provider: 'ollama', url: 'http://127.0.0.1:11434', model: 'llama3.2', baseUrl: 'https://api.example.test', apiKey: '' },
      weather: {},
      settings: { humorLevel: 'medium', useEmojis: true },
      clipboard: []
    },
    normalizeOllamaUrl: (value) => value,
    encryptedApiKey: '',
    keyStorageError: '',
    workspacePath: '',
    tasks: [],
    chatHistory: [],
    codingSessions: [],
    undoHistory: [],
    console
  };
  try {
    vm.runInNewContext(`${storageSource}\n${loadSource}\nloadState()`, context);
    const saved = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    assert.equal(context.config.chat.apiKey, 'legacy-secret');
    assert.equal(saved.settings.alwaysOnTop, false);
    assert.equal(saved.settings.humorLevel, 'low');
    assert.equal(saved.weather.city, 'Nairobi');
    assert.equal(saved.chat.apiKey, undefined);
    assert.equal(saved.chat.apiKeyEncrypted, Buffer.from('mock-ciphertext').toString('base64'));
    const backupNames = fs.readdirSync(tempRoot).filter((name) => name.startsWith('config.json.pre-safestorage-') && name.endsWith('.enc'));
    assert.equal(backupNames.length, 1);
    assert.doesNotMatch(fs.readFileSync(path.join(tempRoot, backupNames[0]), 'utf8'), /legacy-secret/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('dropped-file reads reject sensitive files and accept bounded text files', () => {
  const source = sourceBetween("ipcMain.handle('file:read-dropped'", 'function desktopFileGroup(');
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-drop-'));
  const normalPath = path.join(tempRoot, 'notes.txt');
  const secretPath = path.join(tempRoot, 'credentials.txt');
  fs.writeFileSync(normalPath, 'safe context', 'utf8');
  fs.writeFileSync(secretPath, 'private value', 'utf8');
  try {
    const handlers = captureHandlers(source, { fs, path, isSensitiveWorkspaceFile: workspaceUtils.isSensitiveWorkspaceFile });
    const readDropped = handlers['file:read-dropped'];
    assert.equal(readDropped({}, normalPath).content, 'safe context');
    assert.equal(readDropped({}, secretPath).ok, false);
    assert.equal(readDropped({}, path.join(tempRoot, '.env')).ok, false);
    assert.equal(readDropped({}, tempRoot).ok, false);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('clipboard history deduplicates entries and enforces text and history limits', () => {
  const source = sourceBetween('function pushClipboard(text)', "ipcMain.handle('state:get'") +
    sourceBetween("ipcMain.handle('clipboard:list'", "ipcMain.handle('launch:app'");
  const config = { clipboard: [], settings: { clipboardHistoryPaused: false, clipboardRetentionDays: 0 } };
  const written = [];
  let clipboardText = '';
  let saved = 0;
  const context = {
    CLIP_LIMIT: 5,
    config,
    lastClip: '',
    saveConfig: () => { saved++; },
    send() {},
    clipboard: {
      readText: () => clipboardText,
      writeText(value) { clipboardText = value; written.push(value); }
    }
  };
  try {
    const handlers = captureHandlers(source, context);
    for (let index = 0; index < 6; index++) {
      assert.equal(handlers['clipboard:copy']({}, `clip-${index}`), true);
    }
    assert.equal(config.clipboard.length, 5);
    assert.equal(config.clipboard.map((entry) => entry.text).join('|'), 'clip-5|clip-4|clip-3|clip-2|clip-1');
    const saveCount = saved;
    handlers['clipboard:copy']({}, 'clip-5');
    assert.equal(saved, saveCount);

    const longText = 'x'.repeat(7000);
    assert.equal(handlers['clipboard:copy']({}, longText), true);
    assert.equal(config.clipboard[0].text.length, 6000);
    assert.equal(handlers['clipboard:copy']({}, 'x'.repeat(200001)), false);
    assert.equal(written[written.length - 1], longText);
    assert.equal(handlers['clipboard:read']({}), longText);
  } finally {
    context.clipboard = null;
  }
});

test('clipboard pause blocks capture and retention removes expired history', () => {
  const source = sourceBetween('function pushClipboard(text) {', 'function startClipboardWatch() {');
  const now = Date.now();
  const config = {
    settings: { clipboardHistoryPaused: true, clipboardRetentionDays: 1 },
    clipboard: [
      { text: 'expired', at: now - 2 * 24 * 60 * 60 * 1000 },
      { text: 'recent', at: now }
    ]
  };
  let saved = 0;
  const context = {
    CLIP_LIMIT: 5,
    config,
    Date,
    Number,
    String,
    saveConfig: () => { saved++; },
    send() {}
  };
  vm.runInNewContext(source, context);

  context.pushClipboard('while paused');
  assert.deepEqual(Array.from(config.clipboard, (item) => item.text), ['recent']);
  assert.equal(saved, 1);

  config.settings.clipboardHistoryPaused = false;
  context.pushClipboard('new item');
  assert.deepEqual(Array.from(config.clipboard, (item) => item.text), ['new item', 'recent']);
  assert.equal(saved, 2);
});

test('clipboard history clearing requires confirmation and preserves entries when cancelled', async () => {
  const source = sourceBetween("ipcMain.handle('clipboard:clear-history'", "ipcMain.handle('launch:app'");
  const config = { clipboard: [{ text: 'keep', at: Date.now() }] };
  let response = 1;
  let saved = 0;
  const context = {
    ipcMain: undefined,
    trustedWindowEvent: () => true,
    dialog: { showMessageBox: async () => ({ response }) },
    win: {},
    config,
    persistConfigStrict: () => { saved++; },
    send() {}
  };
  const handlers = captureHandlers(source, context);
  const cancelled = await handlers['clipboard:clear-history']({});
  assert.equal(cancelled.ok, false);
  assert.equal(cancelled.cancelled, true);
  assert.equal(config.clipboard.length, 1);
  assert.equal(saved, 0);

  response = 0;
  const result = await handlers['clipboard:clear-history']({});
  assert.equal(result.ok, true);
  assert.equal(config.clipboard.length, 0);
  assert.equal(saved, 1);
});

test('mascot state updates are accessible and listening takes precedence when restored', () => {
  const source = rendererSourceBetween("let mascotState = 'idle';", 'function applyGlow(');
  const classes = new Set();
  const context = {
    clearTimeout,
    setTimeout,
    listening: false,
    thinkingActive: false,
    mascotWrap: {
      dataset: {},
      classList: {
        toggle(name, enabled) {
          if (enabled) classes.add(name);
          else classes.delete(name);
        }
      }
    },
    mascotEl: { setAttribute(_name, value) { this.label = value; } },
    mascotStatus: { textContent: '' }
  };
  vm.runInNewContext(`${source}\nglobalThis.setMascotState = setMascotState; globalThis.restoreMascotState = restoreMascotState;`, context);

  context.setMascotState('working');
  assert.equal(context.mascotWrap.dataset.state, 'working');
  assert.match(context.mascotEl.label, /working/);
  assert.match(context.mascotStatus.textContent, /working/);
  context.listening = true;
  context.restoreMascotState();
  assert.equal(context.mascotWrap.dataset.state, 'listening');
  assert.equal(classes.has('listening'), true);
});

test('system-load alerts honor separate thresholds and the sustained-load delay', () => {
  const source = rendererSourceBetween('function monitorLoad(m)', 'function taskMinutes(');
  let now = 1000000;
  const alerts = [];
  const context = {
    Date: { now: () => now },
    Math,
    appState: { settings: { cpuWarningThreshold: 70, memoryWarningThreshold: 80 } },
    highSince: 0,
    highNotifiedAt: 0,
    highSignature: '',
    notifyEvent: (title, body) => alerts.push({ title, body })
  };
  vm.runInNewContext(`${source}\nglobalThis.monitorLoad = monitorLoad;`, context);

  context.monitorLoad({ cpu: 20, mem: { pct: 80 } });
  now += 29999;
  context.monitorLoad({ cpu: 20, mem: { pct: 80 } });
  assert.equal(alerts.length, 0);

  now += 1;
  context.monitorLoad({ cpu: 20, mem: { pct: 80 } });
  assert.equal(alerts.length, 1);
  assert.match(alerts[0].body, /RAM 80% \(threshold 80%\)/);
  assert.doesNotMatch(alerts[0].body, /CPU/);
});

test('the Electron window keeps sandboxing, navigation and CSP restrictions enabled', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'renderer.html'), 'utf8');
  assert.match(mainSource, /sandbox:\s*true/);
  assert.match(mainSource, /setWindowOpenHandler/);
  assert.match(mainSource, /will-navigate/);
  assert.match(mainSource, /will-redirect/);
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /object-src 'none'/);
  assert.match(html, /base-uri 'none'/);
  assert.match(html, /frame-src 'none'/);
});
