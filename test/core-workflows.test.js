'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

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

    fs.writeFileSync(bPath, 'changed elsewhere\n');
    const stale = handlers['coding:apply-edit']({}, { edits: proposal.edits });
    assert.equal(stale.ok, false);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');
    fs.writeFileSync(bPath, 'old b\n');

    const applied = handlers['coding:apply-edit']({}, { edits: proposal.edits });
    assert.equal(applied.ok, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'new a\n');
    assert.equal(fs.readFileSync(bPath, 'utf8'), 'new b\n');
    const undone = handlers['coding:undo-edit']({}, applied.undoId);
    assert.equal(undone.ok, true);
    assert.equal(fs.readFileSync(aPath, 'utf8'), 'old a\n');
    assert.equal(fs.readFileSync(bPath, 'utf8'), 'old b\n');
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
