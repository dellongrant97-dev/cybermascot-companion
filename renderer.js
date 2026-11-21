'use strict';

const appEl = document.getElementById('app');
const panelsEl = document.getElementById('panels');
const mascotEl = document.getElementById('mascot');
const mascotWrap = document.getElementById('mascotWrap');
const mascotStatus = document.getElementById('mascotStatus');
const bodyGroup = document.getElementById('bodyGroup');
const eyesGroup = document.getElementById('eyesGroup');
const eyeL = document.getElementById('eyeL');
const eyeR = document.getElementById('eyeR');
const greetingEl = document.getElementById('greeting');
const dateLineEl = document.getElementById('dateLine');
const clockEl = document.getElementById('clock');
const wxIcon = document.getElementById('wxIcon');
const wxTemp = document.getElementById('wxTemp');
const wxSub = document.getElementById('wxSub');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskReminder = document.getElementById('taskReminder');
const metricsEl = document.getElementById('metrics');
const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const micBtn = document.getElementById('micBtn');
const modelBtn = document.getElementById('modelBtn');
const modelName = document.getElementById('modelName');
const modelMenu = document.getElementById('modelMenu');
const modelList = document.getElementById('modelList');
const modelRefresh = document.getElementById('modelRefresh');
const settingsBtn = document.getElementById('settingsBtn');
const tabs = Array.from(document.querySelectorAll('.tab'));
const views = { chat: document.getElementById('viewChat'), code: document.getElementById('viewCode'), skills: document.getElementById('viewSkills'), settings: document.getElementById('viewSettings') };
const focusRing = document.getElementById('focusRing');
const ringFg = document.getElementById('ringFg');
const focusTime = document.getElementById('focusTime');
const focusBtn = document.getElementById('focusBtn');
const codingSessionToggle = document.getElementById('codingSessionToggle');
const codingSessionStatus = document.getElementById('codingSessionStatus');
const ramList = document.getElementById('ramList');
const ramRefresh = document.getElementById('ramRefresh');
const ramClean = document.getElementById('ramClean');
const cpuList = document.getElementById('cpuList');
const cpuClean = document.getElementById('cpuClean');
const cpuScan = document.getElementById('cpuScan');
const cpuSampleStatus = document.getElementById('cpuSampleStatus');
const diagnosticsCheck = document.getElementById('diagnosticsCheck');
const diagnosticsTestModel = document.getElementById('diagnosticsTestModel');
const diagnosticsCopy = document.getElementById('diagnosticsCopy');
const diagnosticsStatus = document.getElementById('diagnosticsStatus');
const diagnosticsList = document.getElementById('diagnosticsList');
const desktopSearchForm = document.getElementById('desktopSearchForm');
const desktopSearchInput = document.getElementById('desktopSearchInput');
const desktopSearchButton = document.getElementById('desktopSearchButton');
const desktopSearchStatus = document.getElementById('desktopSearchStatus');
const desktopSearchResults = document.getElementById('desktopSearchResults');
const workspaceSelect = document.getElementById('workspaceSelect');
const workspaceClear = document.getElementById('workspaceClear');
const workspaceRefresh = document.getElementById('workspaceRefresh');
const workspacePathEl = document.getElementById('workspacePath');
const workspaceGitRefresh = document.getElementById('workspaceGitRefresh');
const workspaceGitStatus = document.getElementById('workspaceGitStatus');
const workspaceGitDiff = document.getElementById('workspaceGitDiff');
const workspaceFileSearch = document.getElementById('workspaceFileSearch');
const workspaceFileList = document.getElementById('workspaceFileList');
const workspaceCodeSearchForm = document.getElementById('workspaceCodeSearchForm');
const workspaceCodeSearch = document.getElementById('workspaceCodeSearch');
const workspaceCodeSearchButton = document.getElementById('workspaceCodeSearchButton');
const workspaceCodeSearchResults = document.getElementById('workspaceCodeSearchResults');
const workspaceContextStatus = document.getElementById('workspaceContextStatus');
const codingAgentTask = document.getElementById('codingAgentTask');
const codingAgentAsk = document.getElementById('codingAgentAsk');
const codingAgentPropose = document.getElementById('codingAgentPropose');
const codingAgentStatus = document.getElementById('codingAgentStatus');
const codingAgentAnswer = document.getElementById('codingAgentAnswer');
const codingEditProposal = document.getElementById('codingEditProposal');
const codingEditPath = document.getElementById('codingEditPath');
const codingEditDiffs = document.getElementById('codingEditDiffs');
const codingEditApply = document.getElementById('codingEditApply');
const codingEditDiscard = document.getElementById('codingEditDiscard');
const codingEditUndo = document.getElementById('codingEditUndo');
const codingCheckForm = document.getElementById('codingCheckForm');
const codingCheckCommand = document.getElementById('codingCheckCommand');
const codingCheckRun = document.getElementById('codingCheckRun');
const codingCheckStatus = document.getElementById('codingCheckStatus');
const codingCheckOutput = document.getElementById('codingCheckOutput');
const codingSessionForm = document.getElementById('codingSessionForm');
const codingSessionPlatform = document.getElementById('codingSessionPlatform');
const codingSessionTitle = document.getElementById('codingSessionTitle');
const codingSessionGoal = document.getElementById('codingSessionGoal');
const codingSessionSelect = document.getElementById('codingSessionSelect');
const codingSessionProjectStatus = document.getElementById('codingSessionProjectStatus');
const codingSessionGitStatus = document.getElementById('codingSessionGitStatus');
const codingSessionResume = document.getElementById('codingSessionResume');
const codingSessionGitRefresh = document.getElementById('codingSessionGitRefresh');
const codingSessionNotes = document.getElementById('codingSessionNotes');
const codingSessionNoteForm = document.getElementById('codingSessionNoteForm');
const codingSessionNote = document.getElementById('codingSessionNote');
const codingSessionFollowUp = document.getElementById('codingSessionFollowUp');
const codingSessionFinish = document.getElementById('codingSessionFinish');
const codingSessionFollowUpResult = document.getElementById('codingSessionFollowUpResult');
const codingSessionSummary = document.getElementById('codingSessionSummary');
const reminderCenterStatus = document.getElementById('reminderCenterStatus');
const reminderCenterList = document.getElementById('reminderCenterList');
const clipList = document.getElementById('clipList');
const clearClipboardHistory = document.getElementById('clearClipboardHistory');
const clipboardHistoryStatus = document.getElementById('clipboardHistoryStatus');
const setClipboardHistoryPaused = document.getElementById('setClipboardHistoryPaused');
const setClipboardRetention = document.getElementById('setClipboardRetention');
const setCpuWarningThreshold = document.getElementById('setCpuWarningThreshold');
const setMemoryWarningThreshold = document.getElementById('setMemoryWarningThreshold');
const settingsNote = document.getElementById('settingsNote');
const thoughtPop = document.getElementById('thoughtPop');
const clickThroughIndicator = document.getElementById('clickThroughIndicator');
const dotsEl = document.querySelector('.thought-dots');
const setNotify = document.getElementById('setNotify');
const setPerf = document.getElementById('setPerf');
const setDnd = document.getElementById('setDnd');
const setWeatherLocation = document.getElementById('setWeatherLocation');
const clearMemory = document.getElementById('clearMemory');
const screenBtn = document.getElementById('screenBtn');
const attachStrip = document.getElementById('attachStrip');
const screenCaptureSkill = document.getElementById('screenCaptureSkill');
const mediaState = document.getElementById('mediaState');
const mediaPlay = document.getElementById('mediaPlay');
const voicePlaybackStatus = document.getElementById('voicePlaybackStatus');

const api = window.companion;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const voiceController = window.CyberMascotVoice ? window.CyberMascotVoice.createVoiceController({
  synthesis: window.speechSynthesis,
  Utterance: window.SpeechSynthesisUtterance,
  onState: (state) => {
    if (state === 'speaking') setMascotState('speaking');
    else if (mascotState === 'speaking') restoreMascotState();
    if (voicePlaybackStatus) voicePlaybackStatus.textContent = state === 'speaking' ? 'Speaking' : state === 'paused' ? 'Paused' : 'Ready';
  }
}) : null;

const appState = {
  name: 'Dellon',
  side: 'right',
  tasks: [],
  provider: 'ollama',
  model: '',
  baseUrl: '',
  ollamaUrl: 'http://127.0.0.1:11434',
  settings: { idleMinutes: 3, unit: 'C', alwaysOnTop: true, launchAtLogin: true, opacity: 0.55, notifications: true, clock: '24', accessory: 'classic', performance: false, humorLevel: 'medium', useEmojis: true, cpuWarningThreshold: 90, memoryWarningThreshold: 90, clipboardHistoryPaused: false, clipboardRetentionDays: 0, voiceAutoPlay: true, voiceName: '', voiceRate: 1, voiceVolume: 1 },
  weather: null,
  weatherLocationEnabled: true,
  clipboard: [],
  workspacePath: '',
  autostartError: '',
  keyStorageError: ''
};
const chatHistory = [];
let lastMetrics = null;
let highSince = 0;
let highNotifiedAt = 0;
let highSignature = '';
let lastDiagnosticsReport = '';
let cpuLoadPromise = null;
let codingSessionActive = false;
let collapsed = false;
let sleeping = false;
let currentView = 'chat';
let eyeWide = 0;
let lastActivitySent = 0;
const workspaceFiles = [];
const workspaceContext = new Map();
let activeCodingSessions = [];
const selectedEditPaths = new Set();
let currentEditProposal = null;
let lastCodingUndoId = '';
let workspaceSearchTimer = null;
let workspaceLoadToken = 0;

const EYE_MAX = 15;
const BODY_MAX = 5.5;
const TILT_MAX = 10;
const ROT_MAX = 1.5;
const BOB_MAX = 4;
const RING_LEN = 628.3;

const tgt = { ex: 0, ey: 0, bx: 0, by: 0, tilt: 0, rot: 0 };
const cur = { ex: 0, ey: 0, bx: 0, by: 0, tilt: 0, rot: 0 };
let expression = 1;
let droop = 0;
let thinkingActive = false;
let think = 0;
let vibe = 0;
let dropHot = false;
let pendingImage = null;
let attachedFile = null;
let mediaPlaying = false;
let manualPlaying = false;
let idle = 0;
let lastSignificant = performance.now();
let lastN = { nx: 0, ny: 0 };
let pointerDown = false;
let mascotPointerStart = null;
let lastHit = null;

const clampNum = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function noteActivity() {
  const now = Date.now();
  if (now - lastActivitySent > 500) {
    lastActivitySent = now;
    api.activity();
  }
}

function greetingText(now = new Date()) {
  const h = now.getHours();
  const name = appState.name || 'Dellon';
  if (h < 5) return `Still awake, ${name}?`;
  if (h < 12) return `Good morning, ${name}!`;
  if (h < 17) return `Good afternoon, ${name}!`;
  if (h < 22) return `Good evening, ${name}!`;
  return `Working late, ${name}?`;
}

function dateText() {
  return new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

function renderGreeting() {
  greetingEl.textContent = greetingText();
  dateLineEl.textContent = dateText();
}

function localDateKey(timestamp) {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function briefingTaskNames(tasks, includeTime) {
  const labels = tasks.slice(0, 3).map((task) => {
    const text = String(task.text || 'Untitled task').replace(/\s+/g, ' ').trim().slice(0, 70);
    if (includeTime && Number.isFinite(task.remindAt)) {
      return `${text} (${new Date(task.remindAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })})`;
    }
    return text;
  });
  if (tasks.length > labels.length) labels.push(`and ${tasks.length - labels.length} more`);
  return labels.join(', ');
}

function buildDailyBriefing(tasks, now = new Date()) {
  const todayKey = localDateKey(now.getTime());
  const plannedDate = (task) => /^\d{4}-\d{2}-\d{2}$/.test(task.plannedDate || '')
    ? task.plannedDate
    : localDateKey(
      Number.isFinite(task.remindAt) ? task.remindAt :
        (Number.isFinite(task.createdAt) ? task.createdAt : now.getTime())
    );
  const validTasks = Array.isArray(tasks) ? tasks.filter((task) => task && typeof task === 'object') : [];
  const todayTasks = validTasks.filter((task) => plannedDate(task) === todayKey);
  const openToday = todayTasks.filter((task) => !task.done);
  const doneToday = todayTasks.length - openToday.length;
  const overdue = validTasks.filter((task) => !task.done && plannedDate(task) < todayKey);
  const later = validTasks.filter((task) => !task.done && plannedDate(task) > todayKey);
  const dayLabel = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  let message = `${greetingText(now)} Here's your plan for ${dayLabel}. `;
  message += todayTasks.length
    ? `${todayTasks.length} planned: ${doneToday} done, ${openToday.length} still open.`
    : 'No tasks planned for today yet.';
  if (openToday.length) message += ` Still to do: ${briefingTaskNames(openToday, true)}.`;
  if (overdue.length) message += ` Unfinished from earlier days (${overdue.length}): ${briefingTaskNames(overdue, false)}.`;
  if (later.length) message += ` ${later.length} task${later.length === 1 ? '' : 's'} planned for later.`;
  message += ' I’m here if you want help prioritizing.';

  const outstanding = openToday.length + overdue.length;
  const toast = outstanding
    ? `Welcome back, ${appState.name || 'friend'}. ${openToday.length} left today${overdue.length ? ` and ${overdue.length} carryover${overdue.length === 1 ? '' : 's'}` : ''}.`
    : `Welcome back, ${appState.name || 'friend'}. You're all caught up for today.`;
  return { message, toast, actionableTasks: [...overdue, ...openToday] };
}

function updateClock() {
  const mode = appState.settings.clock || '24';
  if (mode === 'off') {
    clockEl.classList.add('hidden');
    return;
  }
  clockEl.classList.remove('hidden');
  const now = new Date();
  if (mode === '12') {
    const hours = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${mins} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  } else {
    clockEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
}

function weatherGroup(code) {
  if (code === 0) return 'clear';
  if (code <= 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloud';
}

function weatherLabel(code) {
  return {
    clear: 'Clear skies',
    partly: 'Partly cloudy',
    cloud: 'Overcast',
    fog: 'Foggy',
    drizzle: 'Drizzle',
    rain: 'Rain',
    snow: 'Snow',
    storm: 'Thunderstorm'
  }[weatherGroup(code)] || 'Cloudy';
}

function weatherSvg(code) {
  const s = 'stroke="rgba(255,255,255,0.88)" stroke-width="1.7" stroke-linecap="round" fill="none"';
  const sun = `<circle cx="16" cy="16" r="5.4" ${s}/><g ${s}><path d="M16 3.2v2.6M16 26.2v2.6M3.2 16h2.6M26.2 16h2.6M7 7l1.9 1.9M23.1 23.1 25 25M25 7l-1.9 1.9M8.9 23.1 7 25"/></g>`;
  const cloud = `<path d="M10 21.5a4 4 0 0 1-.4-8 5.4 5.4 0 0 1 10.5-1.6 4.6 4.6 0 0 1 3.4 7.9 5 5 0 0 1-3.3 1.7H10Z" ${s}/>`;
  const partly = `<circle cx="12.6" cy="12.2" r="4.2" ${s}/><g ${s}><path d="M12.6 3.6v2M4 12.2h2M6.6 6.2l1.4 1.4M18.6 6.2 17.2 7.6"/></g><path d="M17 25.5h8.4a3.6 3.6 0 0 0 .3-7.2 4.9 4.9 0 0 0-9.4-1.3 3.9 3.9 0 0 0-1 8" ${s}/>`;
  const fog = `<g ${s}><path d="M6 12h20M9 17h14M5 22h22"/></g>`;
  const drizzle = `${cloud}<g ${s}><path d="M12 25.5v1.8M17 25.5v1.8M22 25.5v1.8"/></g>`;
  const rain = `${cloud}<g ${s}><path d="M12 25v3M17 24.5v3.5M22 25v3"/></g>`;
  const snow = `${cloud}<g ${s}><path d="M12 25.5v3M10.7 26.2l2.6 1.6M13.3 26.2l-2.6 1.6M20 25.5v3M18.7 26.2l2.6 1.6M21.3 26.2l-2.6 1.6"/></g>`;
  const storm = `${cloud}<path d="M17 24.5h3.2l-2 3.4h2.2L15.6 32l.9-4h-2.3l2.8-3.5Z" ${s}/>`;
  return `<svg viewBox="0 0 32 32">${{ clear: sun, partly, cloud, fog, drizzle, rain, snow, storm }[weatherGroup(code)] || cloud}</svg>`;
}

function renderWeather(w) {
  if (w) appState.weather = w;
  const data = appState.weather;
  if (!data) {
    wxTemp.textContent = '--°';
    wxSub.textContent = 'weather unavailable';
    wxIcon.innerHTML = weatherSvg(-1);
    return;
  }
  const unit = appState.settings.unit === 'F' ? 'F' : 'C';
  const temp = unit === 'F' ? Math.round(data.tempC * 9 / 5 + 32) : data.tempC;
  wxTemp.innerHTML = `${temp}°${unit}${data.stale ? '<span class="stale">cached</span>' : ''}`;
  const fallback = appState.weatherLocationEnabled && data.source !== 'device' ? ' · using saved city' : '';
  wxSub.textContent = `${weatherLabel(data.code)} · ${data.place}${fallback}`;
  wxIcon.innerHTML = weatherSvg(data.code);
}

async function requestDeviceWeatherLocation() {
  if (!appState.weatherLocationEnabled) return;
  let result;
  try {
    result = await api.updateWeatherLocation();
  } catch (err) {
    result = { ok: false, locationAvailable: false, error: String((err && err.message) || err) };
  }
  if (result && result.ok && result.weather) {
    renderWeather(result.weather);
    return;
  }
  if (result && result.locationAvailable) {
    appState.weather = null;
    renderWeather();
    wxSub.textContent = `Current location saved · ${String(result.error || 'current conditions unavailable').slice(0, 100)}`;
    return;
  }

  let fallback;
  try {
    fallback = await api.clearWeatherLocation();
  } catch (err) {
    wxSub.textContent = `Weather location failed: ${String((err && err.message) || err)}`;
    return;
  }
  if (fallback && fallback.weather) renderWeather(fallback.weather);
  else {
    appState.weather = null;
    renderWeather();
  }
  wxSub.textContent = `Using saved city · ${String((result && result.error) || 'device location unavailable').slice(0, 100)}`;
}

function metricCell(label, value, pct, warn) {
  return `<div class="metric${warn ? ' warn' : ''}"><div class="row"><span>${label}</span><b>${value}</b></div><div class="bar"><i style="width:${clampNum(pct, 0, 100)}%"></i></div></div>`;
}

function renderMetrics(m) {
  lastMetrics = m;
  const cpu = m.cpu == null ? null : Math.round(m.cpu);
  const memPct = Math.round(m.mem.pct);
  const memValue = `${m.mem.usedGb.toFixed(1)} / ${m.mem.totalGb.toFixed(0)} GB`;

  let powerValue = 'AC';
  let powerPct = 0;
  let powerWarn = false;
  if (m.battery) {
    powerValue = `${Math.round(m.battery.percent)}%${m.battery.charging ? ' ↑' : ''}`;
    powerPct = m.battery.percent;
    powerWarn = m.battery.percent < 20 && !m.battery.charging;
  }

  let diskValue = '--';
  let diskPct = 0;
  let diskWarn = false;
  if (m.disk) {
    diskValue = `${m.disk.freeGb.toFixed(0)} GB free`;
    diskPct = m.disk.usedPct;
    diskWarn = m.disk.usedPct > 90;
  }

  monitorLoad(m);
  applyGlow(m);

  metricsEl.innerHTML = [
    metricCell('cpu', cpu == null ? '--' : `${cpu}%`, cpu == null ? 0 : cpu, cpu != null && cpu > 85),
    metricCell('ram', memValue, memPct, memPct > 85),
    metricCell('disk', diskValue, diskPct, diskWarn),
    metricCell('power', powerValue, powerPct, powerWarn)
  ].join('');
}

function renderTasks() {
  taskList.innerHTML = '';
  if (!appState.tasks.length) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Nothing on the list yet.';
    taskList.appendChild(empty);
  } else {
    for (const task of appState.tasks) {
      const li = document.createElement('li');
      li.className = `task${task.done ? ' done' : ''}`;

      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = task.done;
      box.dataset.id = task.id;

      const content = document.createElement('span');
      content.className = 'task-content';
      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;
      content.appendChild(span);
      if (Number.isFinite(task.remindAt) && Number.isFinite(new Date(task.remindAt).getTime())) {
        const reminder = document.createElement('small');
        reminder.className = 'task-reminder-time';
        const reminderDate = new Date(task.remindAt);
        const label = task.remindedAt
          ? (task.notificationSent === false ? 'Reminder handled · ' : 'Reminder sent · ')
          : 'Reminder · ';
        reminder.textContent = label +
          reminderDate.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        content.appendChild(reminder);
      }

      const del = document.createElement('button');
      del.className = 'del';
      del.dataset.id = task.id;
      del.textContent = '×';
      del.setAttribute('aria-label', 'Remove task');

      li.append(box, content, del);
      taskList.appendChild(li);
    }
  }
  const done = appState.tasks.filter((t) => t.done).length;
  taskCount.textContent = `${done}/${appState.tasks.length}`;
  renderReminderCenter();
}

function renderReminderCenter() {
  const now = Date.now();
  const tasks = appState.tasks.filter((task) =>
    task && !task.done && Number.isFinite(task.remindAt) && Number.isFinite(new Date(task.remindAt).getTime())
  );
  const upcoming = tasks
    .filter((task) => task.remindAt > now && !task.remindedAt)
    .sort((a, b) => a.remindAt - b.remindAt);
  const due = tasks
    .filter((task) => task.remindAt <= now)
    .sort((a, b) => a.remindAt - b.remindAt);

  reminderCenterStatus.textContent = `${upcoming.length} upcoming · ${due.length} due or missed`;
  reminderCenterList.innerHTML = '';
  if (!upcoming.length && !due.length) {
    const empty = document.createElement('div');
    empty.className = 'list-row';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = 'No upcoming or missed reminders.';
    empty.appendChild(name);
    reminderCenterList.appendChild(empty);
    return;
  }

  const appendGroup = (label, items, isDue) => {
    if (!items.length) return;
    const heading = document.createElement('div');
    heading.className = 'optimizer-note';
    heading.textContent = label;
    reminderCenterList.appendChild(heading);

    for (const task of items) {
      const row = document.createElement('div');
      row.className = 'list-row';
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = task.text;
      name.title = task.text;

      const meta = document.createElement('span');
      meta.className = 'meta';
      const reminderDate = new Date(task.remindAt);
      if (!isDue) {
        meta.textContent = reminderDate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
      } else if (task.missedAt) {
        meta.textContent = 'Missed · ' + new Date(task.missedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      } else if (task.notificationSent === false) {
        meta.textContent = 'Notifications off';
      } else if (task.remindedAt) {
        meta.textContent = 'Reminder sent';
      } else {
        meta.textContent = 'Due';
      }

      row.append(name, meta);
      if (isDue) {
        const snooze = document.createElement('button');
        snooze.type = 'button';
        snooze.className = 'mini-btn';
        snooze.textContent = 'Snooze 10m';
        snooze.setAttribute('aria-label', 'Snooze ' + task.text + ' for 10 minutes');
        snooze.addEventListener('click', async () => {
          snooze.disabled = true;
          try {
            const result = await api.snoozeTask(task.id);
            if (!result || !result.ok) throw new Error((result && result.error) || 'Snooze failed.');
            appState.tasks = result.tasks;
            renderTasks();
          } catch (err) {
            reminderCenterStatus.textContent = 'Could not snooze reminder: ' + String((err && err.message) || err);
          } finally {
            if (snooze.isConnected) snooze.disabled = false;
          }
        });
        row.appendChild(snooze);
      }
      reminderCenterList.appendChild(row);
    }
  };

  appendGroup('Upcoming', upcoming, false);
  appendGroup('Due / missed', due, true);
}

function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function newsRefreshButton(message) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mini-btn news-refresh';
  button.textContent = 'Refresh headlines';
  button.addEventListener('click', () => {
    button.disabled = true;
    button.textContent = 'Refreshing…';
    loadNewsBriefing(message, true);
  });
  return button;
}

function renderNewsBriefing(container, result, statusText = '') {
  container.replaceChildren();
  const stories = result.stories.filter((story) =>
    story && typeof story.title === 'string' && typeof story.url === 'string'
  );
  const heading = document.createElement('div');
  heading.className = 'news-heading';
  heading.textContent = stories.length ? 'Today’s news' : 'News briefing unavailable';
  container.appendChild(heading);

  for (const story of stories) {
    const item = document.createElement('div');
    item.className = 'news-story';

    const topic = document.createElement('div');
    topic.className = 'news-topic';
    topic.textContent = String(story.topic || 'News');

    const headline = document.createElement('button');
    headline.type = 'button';
    headline.textContent = story.title;
    headline.setAttribute('aria-label', `Open headline: ${story.title}`);
    headline.addEventListener('click', async () => {
      headline.disabled = true;
      headline.textContent = 'Opening in browser…';
      try {
        const opened = await api.openNewsArticle(story.url);
        if (!opened || !opened.ok) throw new Error((opened && opened.error) || 'Unknown error');
        headline.textContent = 'Opened in browser';
      } catch (err) {
        headline.disabled = false;
        headline.textContent = story.title;
        addMessage('bot', `Could not open this headline: ${String((err && err.message) || err)}`);
      }
    });

    const published = Number.isFinite(story.publishedAt)
      ? new Date(story.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : '';
    const metadata = document.createElement('div');
    metadata.className = 'news-source';
    metadata.textContent = [
      story.source || 'Google News',
      published,
      story.stale ? 'saved copy' : ''
    ].filter(Boolean).join(' · ');

    item.append(topic, headline, metadata);
    container.appendChild(item);
  }

  if (result.failedTopics.length) {
    const warning = document.createElement('div');
    warning.className = 'news-status';
    warning.textContent = `Could not refresh: ${result.failedTopics.join(', ')}.`;
    container.appendChild(warning);
  }
  if (!stories.length) {
    const unavailable = document.createElement('div');
    unavailable.className = 'news-status';
    unavailable.textContent = 'Check your internet connection, then try again.';
    container.appendChild(unavailable);
  }
  if (result.cacheWarning) {
    const cacheWarning = document.createElement('div');
    cacheWarning.className = 'news-status';
    cacheWarning.textContent = result.cacheWarning;
    container.appendChild(cacheWarning);
  }
  if (statusText) {
    const status = document.createElement('div');
    status.className = 'news-status';
    status.textContent = statusText;
    container.appendChild(status);
  }

  const note = document.createElement('div');
  note.className = 'news-note';
  note.textContent = 'Google News RSS · English (US) · Local omitted · Click a headline to open it';
  container.append(note, newsRefreshButton(container));
}

async function loadNewsBriefing(container, refresh = false) {
  let cached = null;
  let cacheReadError = '';
  if (!refresh) {
    try {
      cached = await api.getCachedNewsBriefing();
      if (!container.isConnected) return;
      if (cached && Array.isArray(cached.stories) && cached.stories.length) {
        renderNewsBriefing(container, cached, cached.stale ? 'Updating saved headlines…' : '');
      }
    } catch (err) {
      cacheReadError = String((err && err.message) || err);
    }
  } else {
    const status = document.createElement('div');
    status.className = 'news-status';
    status.textContent = 'Refreshing headlines…';
    container.insertBefore(status, container.querySelector('.news-refresh'));
  }

  if (!cached || !cached.stories || !cached.stories.length) {
    const status = document.createElement('div');
    status.className = 'news-status';
    status.textContent = 'Loading today’s headlines…';
    container.replaceChildren(status);
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const result = await api.getNewsBriefing({ refresh });
    if (!container.isConnected) return;
    if (!result || !Array.isArray(result.stories) || !Array.isArray(result.failedTopics)) {
      throw new Error('The news service returned an invalid response.');
    }
    if (cacheReadError && !result.cacheWarning) result.cacheWarning = 'Could not read the saved news cache.';
    renderNewsBriefing(container, result);
  } catch (err) {
    if (!container.isConnected) return;
    const errorText = `News refresh failed: ${String((err && err.message) || err)}`;
    if (refresh && container.querySelector('.news-story')) {
      const status = container.querySelector('.news-status');
      if (status) status.textContent = errorText;
      const button = container.querySelector('.news-refresh');
      if (button) {
        button.disabled = false;
        button.textContent = 'Retry refresh';
      }
      return;
    }
    if (cached && cached.stories && cached.stories.length) {
      renderNewsBriefing(container, cached, errorText);
    } else {
      renderNewsBriefing(container, {
        stories: [],
        failedTopics: [],
        cacheWarning: cacheReadError ? 'Could not read the saved news cache.' : ''
      }, errorText);
    }
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addDailyBriefingCard(briefing) {
  const previous = messagesEl.querySelector('.briefing-card');
  if (previous) previous.remove();
  const card = document.createElement('section');
  card.className = 'msg bot briefing-card';
  card.setAttribute('aria-label', 'Daily briefing');

  const header = document.createElement('div');
  header.className = 'briefing-header';
  const title = document.createElement('div');
  title.className = 'briefing-title';
  title.textContent = 'Daily briefing';
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'briefing-dismiss';
  dismiss.textContent = '×';
  dismiss.setAttribute('aria-label', 'Dismiss daily briefing');
  dismiss.addEventListener('click', () => card.remove());
  header.append(title, dismiss);

  const tasks = document.createElement('div');
  tasks.className = 'briefing-tasks';
  tasks.textContent = briefing.message;

  const actions = document.createElement('div');
  actions.className = 'briefing-task-actions';
  const actionStatus = document.createElement('div');
  actionStatus.className = 'optimizer-note';
  actionStatus.setAttribute('aria-live', 'polite');
  const updateTaskActions = (items) => {
    actions.replaceChildren();
    for (const task of items.slice(0, 5)) {
      const row = document.createElement('div');
      row.className = 'briefing-task-row';
      const name = document.createElement('span');
      name.textContent = task.text;
      name.title = task.text;
      const done = document.createElement('button');
      done.type = 'button';
      done.className = 'mini-btn';
      done.textContent = 'Done';
      done.setAttribute('aria-label', `Mark ${task.text} as done`);
      done.addEventListener('click', async () => {
        done.disabled = true;
        try {
          appState.tasks = await api.toggleTask(task.id);
          renderTasks();
          const nextBriefing = buildDailyBriefing(appState.tasks);
          tasks.textContent = nextBriefing.message;
          updateTaskActions(nextBriefing.actionableTasks);
          actionStatus.textContent = 'Task marked complete.';
        } catch (err) {
          actionStatus.textContent = `Could not complete task: ${String((err && err.message) || err)}`;
          done.disabled = false;
        }
      });
      const defer = document.createElement('button');
      defer.type = 'button';
      defer.className = 'mini-btn';
      defer.textContent = 'Tomorrow';
      defer.setAttribute('aria-label', `Move ${task.text} to tomorrow`);
      defer.addEventListener('click', async () => {
        defer.disabled = true;
        try {
          const result = await api.deferTask(task.id);
          if (!result || !result.ok) throw new Error((result && result.error) || 'Could not move task.');
          appState.tasks = result.tasks;
          renderTasks();
          const nextBriefing = buildDailyBriefing(appState.tasks);
          tasks.textContent = nextBriefing.message;
          updateTaskActions(nextBriefing.actionableTasks);
          actionStatus.textContent = 'Task moved to tomorrow.';
        } catch (err) {
          actionStatus.textContent = `Could not postpone task: ${String((err && err.message) || err)}`;
          defer.disabled = false;
        }
      });
      row.append(name, done, defer);
      actions.appendChild(row);
    }
    if (items.length > 5) actionStatus.textContent = `${items.length - 5} more task${items.length - 5 === 1 ? '' : 's'} remain in the task list.`;
    else if (!items.length) actionStatus.textContent = 'No open tasks in today’s briefing.';
  };
  updateTaskActions(briefing.actionableTasks || []);

  const news = document.createElement('div');
  news.className = 'briefing-news';
  card.append(header, tasks, actions, actionStatus, news);
  messagesEl.appendChild(card);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  loadNewsBriefing(news);
}

function getVoiceSettings() {
  return { voiceName: appState.settings.voiceName || '', rate: Number(appState.settings.voiceRate) || 1, volume: Number.isFinite(appState.settings.voiceVolume) ? appState.settings.voiceVolume : 1 };
}
function speakResponse(text) {
  if (!voiceController || !voiceController.isSupported()) { showThought('Speech synthesis is not available in this Windows installation.'); return false; }
  const result = voiceController.speak(text, getVoiceSettings());
  if (!result.ok) showThought(result.error || 'Could not start speech playback.');
  return result.ok;
}
function addVoiceControls(container, content) {
  if (!voiceController || !voiceController.isSupported()) return;
  const controls = document.createElement('div'); controls.className = 'tts-controls';
  const actions = [['Play', () => speakResponse(content)], ['Pause', () => voiceController.pause()], ['Resume', () => voiceController.resume()], ['Stop', () => voiceController.stop()], ['Replay', () => { const result = voiceController.replay(getVoiceSettings()); if (!result.ok) showThought(result.error); }]];
  for (const [label, action] of actions) { const button = document.createElement('button'); button.type = 'button'; button.className = 'tts-button'; button.textContent = label; button.setAttribute('aria-label', label + ' this response'); button.addEventListener('click', action); controls.appendChild(button); }
  container.appendChild(controls);
}
function populateVoiceOptions() {
  const select = document.getElementById('setVoiceName'); if (!select || !voiceController) return;
  const current = appState.settings.voiceName || ''; const voices = voiceController.getVoices(); select.replaceChildren();
  const automatic = document.createElement('option'); automatic.value = ''; automatic.textContent = 'Automatic (prefer a female voice)'; select.appendChild(automatic);
  for (const voice of voices) { const option = document.createElement('option'); option.value = voice.name; option.textContent = voice.name + (voice.lang ? ' · ' + voice.lang : ''); select.appendChild(option); }
  select.value = voices.some((voice) => voice.name === current) ? current : '';
}

function renderMarkdown(text) {
  const div = document.createElement('div');
  div.className = 'msg bot rich';
  let html = '';
  try {
    html = marked.parse(text, { gfm: true, breaks: true });
  } catch (_) {
    html = '';
  }
  div.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(html) : '';
  if (!div.innerHTML) div.textContent = text;
  decorateCode(div);
  addVoiceControls(div, text);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

messagesEl.addEventListener('click', (event) => {
  const anchor = event.target && event.target.closest ? event.target.closest('a') : null;
  if (!anchor) return;
  event.preventDefault();
  api.openExternal(anchor.href).then((result) => {
    if (!result || !result.ok) showThought((result && result.error) || 'Could not open that link.');
  }).catch((error) => {
    showThought(`Could not open that link: ${String((error && error.message) || error)}`);
  });
});

function decorateCode(root) {
  root.querySelectorAll('pre > code').forEach((codeEl) => {
    const cls = Array.from(codeEl.classList).find((c) => c.startsWith('language-'));
    const lang = cls ? cls.slice(9) : '';
    const pre = codeEl.parentElement;
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    const bar = document.createElement('div');
    bar.className = 'code-bar';

    const label = document.createElement('span');
    label.className = 'lang';
    label.textContent = lang || 'code';

    const acts = document.createElement('div');
    acts.className = 'acts';

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy';
    copy.addEventListener('click', async () => {
      const code = codeEl.textContent;
      try {
        await navigator.clipboard.writeText(code);
        await api.clipboardCopy(code);
        copy.textContent = 'Copied';
      } catch (_) {
        copy.textContent = 'Failed';
      }
      setTimeout(() => { copy.textContent = 'Copy'; }, 1400);
    });

    const open = document.createElement('button');
    open.type = 'button';
    open.textContent = 'Open in VS Code';
    open.addEventListener('click', async () => {
      open.textContent = 'Opening...';
      const res = await api.openCode({ code: codeEl.textContent, language: lang });
      open.textContent = res && res.ok ? 'Opened' : 'VS Code missing';
      setTimeout(() => { open.textContent = 'Open in VS Code'; }, 1600);
    });

    acts.append(copy, open);
    bar.append(label, acts);
    try { Prism.highlightElement(codeEl); } catch (_) {}
    pre.replaceWith(wrap);
    wrap.append(bar, pre);
  });
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot typing';
  div.innerHTML = '<i></i><i></i><i></i>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function parseTaskCommand(text) {
  const clean = text.trim();
  const match =
    clean.match(/^(?:add|create|new)\s+(?:a\s+)?task\s*[:\-]\s*(.+)$/i) ||
    clean.match(/^remind me to\s+(.+)$/i) ||
    clean.match(/^(?:todo|task)\s*[:\-]\s*(.+)$/i) ||
    clean.match(/^add\s+(.+?)\s+to\s+(?:my\s+)?(?:tasks?|to-?do(?:\s+list)?)$/i);
  return match ? match[1].trim() : null;
}

async function commitTask(text, remindAt = null) {
  const result = await api.addTask({ text, remindAt });
  if (!result || !result.ok) {
    showThought((result && result.error) || 'Could not add that task.');
    return false;
  }
  appState.tasks = result.tasks;
  renderTasks();
  return true;
}

async function requestReply(image) {
  noteActivity();
  const typing = showTyping();
  setThinking(true);
  let result;
  try {
    result = await api.chat(chatHistory.slice(-16), image || '');
  } catch (error) {
    result = { ok: false, error: String((error && error.message) || error) };
  } finally {
    typing.remove();
    setThinking(false);
  }

  if (result.ok && result.reply) {
    const content = result.reply.trim();
    if (result.notice) addMessage('bot', result.notice);
    chatHistory.push({ role: 'assistant', content });
    api.appendHistory({ role: 'assistant', content });
    renderMarkdown(content);
    if (appState.settings.voiceAutoPlay !== false) speakResponse(content);
    else setMascotState('speaking', 1800);
    return;
  }
  const provider = appState.provider === 'openai'
    ? 'the configured API endpoint'
    : appState.provider === 'gemini'
      ? 'Google Gemini'
      : 'the local model';
  if (result.error) {
    addMessage('bot', `Request failed (${provider}): ${result.error}\n\nCheck Settings: provider, Base URL, model, and API key.`);
  } else {
    addMessage('bot', `I cannot reach ${provider} right now. Check Settings, or keep talking to me in commands like "add task: review the diff".`);
  }
}

async function sendChat(raw, extras) {
  const text = raw.trim();
  const fileCtx = extras && extras.file;
  const image = extras && extras.image;
  if (!text && !fileCtx && !image) return;
  showView('chat');

  const shown = text || (fileCtx ? 'Review this file.' : 'What is on my screen?');
  const bubble = addMessage('user', shown);
  if (image) {
    const img = document.createElement('img');
    img.className = 'shot';
    img.src = image.dataUrl;
    bubble.prepend(img);
  }

  const taskText = parseTaskCommand(text);
  if (taskText && !fileCtx && !image) {
    const added = await commitTask(taskText);
    if (added) addMessage('bot', `Added to your tasks: ${taskText}`);
    return;
  }

  let outgoing = shown;
  let persisted = shown;
  if (fileCtx) {
    outgoing += `\n\nAttached file (${fileCtx.name})${fileCtx.truncated ? ', truncated' : ''}:\n\`\`\`\n${fileCtx.content}\n\`\`\``;
    persisted += `\n\n[attached file: ${fileCtx.name}]`;
  }
  if (image) persisted += '\n\n[screenshot attached]';

  chatHistory.push({ role: 'user', content: outgoing });
  api.appendHistory({ role: 'user', content: persisted });
  pendingImage = null;
  attachedFile = null;
  renderAttachments();
  await requestReply(image ? image.base64 : '');
}

async function askWithPrompt(display, prompt) {
  showView('chat');
  addMessage('user', display);
  chatHistory.push({ role: 'user', content: prompt });
  api.appendHistory({ role: 'user', content: prompt });
  await requestReply();
}

function updateModelLabel() {
  modelName.textContent = appState.model || 'select model';
  modelBtn.title = `${appState.provider} · ${appState.model || 'default'} — click to choose a local model`;
}

function formatSize(bytes) {
  if (!bytes) return '';
  return `${(bytes / 1e9).toFixed(1)} GB`;
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unitIndex]}`;
}

function closeModelMenu() {
  modelMenu.classList.remove('open');
}

async function loadModels() {
  modelList.innerHTML = '<div class="model-note">looking for local models...</div>';
  const res = await api.getOllamaModels();
  modelList.innerHTML = '';

  if (!res.ok) {
    const note = document.createElement('div');
    note.className = 'model-note';
    note.textContent = 'Ollama is not reachable. Start it with "ollama serve" and refresh.';
    modelList.appendChild(note);
    return;
  }

  if (!res.models.length) {
    const note = document.createElement('div');
    note.className = 'model-note';
    note.textContent = 'No local models installed. Pull one with "ollama pull llama3.2".';
    modelList.appendChild(note);
    return;
  }

  for (const model of res.models) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'model-item';

    const check = document.createElement('span');
    check.className = 'check';
    check.textContent = model.name === appState.model ? '✓' : '';

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = model.name;

    const size = document.createElement('span');
    size.className = 'size';
    size.textContent = formatSize(model.size);

    item.append(check, label, size);
    item.addEventListener('click', async () => {
      appState.model = await api.setModel(model.name);
      updateModelLabel();
      addMessage('bot', `Model set to ${appState.model}.`);
      closeModelMenu();
    });
    modelList.appendChild(item);
  }
}

function showView(name) {
  if (!Object.prototype.hasOwnProperty.call(views, name)) return;
  currentView = name;
  for (const [key, view] of Object.entries(views)) view.classList.toggle('active', key === name);
  for (const tab of tabs) {
    const active = tab.dataset.view === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  settingsBtn.classList.toggle('active', name === 'settings');
  if (name === 'settings') syncSettingsForm();
  if (name === 'skills') {
    loadClips();
    loadRam();
    loadCpu();
    renderReminderCenter();
  }
  if (name === 'code') {
    loadWorkspaceFiles();
    loadCodingSessions();
  }
}

function updateWorkspaceContextStatus() {
  const selected = selectedEditPaths.size ? `${selectedEditPaths.size} edit target${selectedEditPaths.size === 1 ? '' : 's'} selected (maximum 5). ` : '';
  const contextFiles = Array.from(workspaceContext.keys());
  const contextLabel = contextFiles.length ? `Context sent on request: ${contextFiles.join(', ')}.` : 'No project files selected as Q&A context.';
  workspaceContextStatus.textContent = `${selected}${contextLabel}`;
  codingAgentPropose.disabled = !selectedEditPaths.size || !appState.workspacePath;
}

function confirmProviderContext(action, paths, notesDescription = '') {
  const providerName = {
    ollama: 'Ollama (local endpoint configured in Settings)',
    gemini: 'Gemini (configured cloud endpoint)',
    openai: 'OpenAI-compatible configured endpoint'
  }[appState.provider] || `${appState.provider} configured provider`;
  const model = appState.model || 'default model';
  const fileList = paths.length ? paths.map((filePath) => `• ${filePath}`).join('\n') : '(No project files)';
  return window.confirm(
    `${action}\n\nProvider: ${providerName}\nModel: ${model}\n\nFiles whose contents will be sent:\n${fileList}` +
    `${notesDescription ? `\n\n${notesDescription}` : ''}\n\nContinue?`
  );
}

async function loadWorkspaceFiles(query = workspaceFileSearch.value) {
  const loadToken = ++workspaceLoadToken;
  workspacePathEl.textContent = appState.workspacePath || 'No workspace selected.';
  workspaceFileList.replaceChildren();
  if (!appState.workspacePath) {
    workspacePathEl.textContent = 'Choose a workspace folder to browse project files.';
    codingAgentStatus.textContent = 'No workspace selected.';
    workspaceGitStatus.textContent = 'Choose a workspace to inspect Git changes.';
    workspaceGitDiff.classList.add('hidden');
    return;
  }
  workspacePathEl.textContent = `Workspace: ${appState.workspacePath}`;
  workspaceFileList.textContent = 'Loading files…';
  const result = await api.listWorkspaceFiles({ query });
  if (loadToken !== workspaceLoadToken) return;
  workspaceFileList.replaceChildren();
  if (!result || !result.ok) {
    codingAgentStatus.textContent = `Could not list workspace files: ${(result && result.error) || 'Unknown error'}`;
    return;
  }
  workspaceFiles.splice(0, workspaceFiles.length, ...result.files);
  codingAgentStatus.textContent = `${result.files.length} supported text files${result.truncated ? ' (list capped)' : ''}. Files are read only when you add them to context.`;
  if (!result.files.length) {
    workspaceFileList.textContent = 'No supported text files matched.';
    return;
  }
  for (const file of result.files.slice(0, 100)) {
    const row = document.createElement('div');
    row.className = 'list-row workspace-file';
    const label = document.createElement('span');
    label.className = 'path';
    label.textContent = file.path;
    label.title = file.path;

    const useContext = document.createElement('button');
    useContext.type = 'button';
    useContext.className = 'mini-btn';
    const currentContext = workspaceContext.get(file.path);
    useContext.textContent = currentContext ? 'Remove context' : 'Use context';
    useContext.addEventListener('click', async () => {
      if (workspaceContext.has(file.path)) {
        workspaceContext.delete(file.path);
        useContext.textContent = 'Use context';
        updateWorkspaceContextStatus();
        return;
      }
      if (workspaceContext.size >= 5) {
        codingAgentStatus.textContent = 'Remove a context file first (maximum 5 files).';
        return;
      }
      useContext.disabled = true;
      try {
        const content = await api.readWorkspaceFile(file.path);
        if (!content || !content.ok) throw new Error((content && content.error) || 'Unknown error');
        workspaceContext.set(file.path, content.content.slice(0, 30000));
        useContext.textContent = 'Remove context';
        codingAgentStatus.textContent = `Added ${file.path} to model context.`;
        updateWorkspaceContextStatus();
      } catch (err) {
        codingAgentStatus.textContent = `Could not read ${file.path}: ${String((err && err.message) || err)}`;
      } finally {
        useContext.disabled = false;
      }
    });

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'mini-btn';
    edit.textContent = selectedEditPaths.has(file.path) ? 'Edit target' : 'Select edit';
    edit.setAttribute('aria-pressed', String(selectedEditPaths.has(file.path)));
    edit.addEventListener('click', () => {
      if (selectedEditPaths.has(file.path)) {
        selectedEditPaths.delete(file.path);
      } else if (selectedEditPaths.size < 5) {
        selectedEditPaths.add(file.path);
      } else {
        codingAgentStatus.textContent = 'Select up to five edit targets. Remove one first to choose another.';
      }
      for (const button of workspaceFileList.querySelectorAll('.workspace-file .mini-btn:last-child')) {
        const rowPath = button.parentElement.querySelector('.path').textContent;
        const selected = selectedEditPaths.has(rowPath);
        button.textContent = selected ? 'Edit target' : 'Select edit';
        button.setAttribute('aria-pressed', String(selected));
      }
      updateWorkspaceContextStatus();
    });

    row.append(label, useContext, edit);
    workspaceFileList.appendChild(row);
  }
  updateWorkspaceContextStatus();
}

function renderWorkspaceSearchResults(result) {
  workspaceCodeSearchResults.replaceChildren();
  for (const match of result.matches) {
    const row = document.createElement('div');
    row.className = 'list-row workspace-file';
    const label = document.createElement('span');
    label.className = 'path';
    label.textContent = `${match.path}:${match.line} — ${match.text}`;
    label.title = label.textContent;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mini-btn';
    button.textContent = 'Use file';
    button.addEventListener('click', async () => {
      if (!selectedEditPaths.has(match.path) && selectedEditPaths.size >= 5) {
        codingAgentStatus.textContent = 'Select up to five edit targets. Remove one first to choose another.';
        return;
      }
      const read = await api.readWorkspaceFile(match.path);
      if (!read || !read.ok) {
        codingAgentStatus.textContent = `Could not read ${match.path}: ${(read && read.error) || 'Unknown error'}`;
        return;
      }
      if (workspaceContext.size >= 5 && !workspaceContext.has(match.path)) {
        codingAgentStatus.textContent = 'Remove a context file first (maximum 5 files).';
        return;
      }
      workspaceContext.set(match.path, read.content.slice(0, 30000));
      selectedEditPaths.add(match.path);
      updateWorkspaceContextStatus();
      codingAgentStatus.textContent = `Added ${match.path} to model context and selected it for edits.`;
      await loadWorkspaceFiles();
    });
    row.append(label, button);
    workspaceCodeSearchResults.appendChild(row);
  }
  if (result.truncated) {
    const note = document.createElement('div');
    note.className = 'optimizer-note';
    note.textContent = 'Search results were capped. Narrow the query for more precise results.';
    workspaceCodeSearchResults.appendChild(note);
  }
  if (!result.matches.length) workspaceCodeSearchResults.textContent = 'No matches found.';
}

function createTextDiff(original, proposed) {
  const before = original.split(/\r?\n/);
  const after = proposed.split(/\r?\n/);
  if (before.length * after.length > 1000000) {
    return 'Diff too large for safe inline review. Select a smaller file or make a more focused change.';
  }
  const rows = Array.from({ length: before.length + 1 }, () => new Uint32Array(after.length + 1));
  for (let i = before.length - 1; i >= 0; i--) {
    for (let j = after.length - 1; j >= 0; j--) {
      rows[i][j] = before[i] === after[j]
        ? rows[i + 1][j + 1] + 1
        : Math.max(rows[i + 1][j], rows[i][j + 1]);
    }
  }
  const lines = ['--- current file', '+++ proposed file'];
  let i = 0;
  let j = 0;
  while (i < before.length || j < after.length) {
    if (i < before.length && j < after.length && before[i] === after[j]) {
      lines.push(` ${before[i]}`);
      i++;
      j++;
    } else if (i < before.length && (j >= after.length || rows[i + 1][j] >= rows[i][j + 1])) {
      lines.push(`-${before[i++]}`);
    } else {
      lines.push(`+${after[j++]}`);
    }
    if (lines.length > 4000) {
      return 'Diff too large for safe inline review. Select a smaller file or make a more focused change.';
    }
  }
  return lines.join('\n');
}

workspaceSelect.addEventListener('click', async () => {
  workspaceSelect.disabled = true;
  try {
    const result = await api.chooseWorkspace();
    if (result && result.ok) {
      appState.workspacePath = result.path;
      workspaceContext.clear();
      selectedEditPaths.clear();
      currentEditProposal = null;
      workspaceGitStatus.textContent = 'Git status has not been checked.';
      workspaceGitDiff.classList.add('hidden');
      codingEditProposal.classList.add('hidden');
      workspaceFileSearch.value = '';
      await loadWorkspaceFiles('');
      await loadCodingSessions();
    } else if (result && result.error) {
      codingAgentStatus.textContent = result.error;
    }
  } catch (err) {
    codingAgentStatus.textContent = `Workspace selection failed: ${String((err && err.message) || err)}`;
  } finally {
    workspaceSelect.disabled = false;
  }
});

workspaceClear.addEventListener('click', async () => {
  if (!appState.workspacePath) return;
  const cleared = await api.clearWorkspace();
  if (!cleared || !cleared.ok) {
    codingAgentStatus.textContent = `Could not clear workspace: ${(cleared && cleared.error) || 'Unknown error'}`;
    return;
  }
  appState.workspacePath = '';
  workspaceContext.clear();
  selectedEditPaths.clear();
  currentEditProposal = null;
  workspaceGitStatus.textContent = 'Choose a workspace to inspect Git changes.';
  workspaceGitDiff.classList.add('hidden');
  codingEditProposal.classList.add('hidden');
  loadWorkspaceFiles('');
  updateWorkspaceContextStatus();
});

workspaceRefresh.addEventListener('click', () => loadWorkspaceFiles());
workspaceGitRefresh.addEventListener('click', async () => {
  if (!appState.workspacePath) {
    workspaceGitStatus.textContent = 'Choose a workspace first.';
    return;
  }
  workspaceGitRefresh.disabled = true;
  workspaceGitStatus.textContent = 'Reading Git status and tracked diff…';
  workspaceGitDiff.classList.remove('hidden');
  workspaceGitDiff.textContent = '';
  try {
    const result = await api.getWorkspaceGitStatus();
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    workspaceGitStatus.textContent = result.truncated
      ? 'Read-only Git view · output capped at 40,000 characters per section.'
      : 'Read-only Git view · no files were staged, changed, or committed by CyberMascot.';
    workspaceGitDiff.textContent = `STATUS\n${result.status}\n\nDIFF\n${result.diff}`;
  } catch (err) {
    workspaceGitStatus.textContent = `Could not read Git changes: ${String((err && err.message) || err)}`;
    workspaceGitDiff.classList.add('hidden');
  } finally {
    workspaceGitRefresh.disabled = false;
  }
});
workspaceFileSearch.addEventListener('input', () => {
  clearTimeout(workspaceSearchTimer);
  workspaceSearchTimer = setTimeout(() => loadWorkspaceFiles(), 220);
});

workspaceCodeSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  workspaceCodeSearchButton.disabled = true;
  workspaceCodeSearchResults.textContent = 'Searching selected workspace…';
  try {
    const result = await api.searchWorkspace(workspaceCodeSearch.value);
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    renderWorkspaceSearchResults(result);
  } catch (err) {
    workspaceCodeSearchResults.textContent = `Search failed: ${String((err && err.message) || err)}`;
  } finally {
    workspaceCodeSearchButton.disabled = false;
  }
});

codingAgentAsk.addEventListener('click', async () => {
  if (!appState.workspacePath) {
    codingAgentStatus.textContent = 'Choose a workspace first.';
    return;
  }
  const task = codingAgentTask.value.trim();
  if (!task) {
    codingAgentStatus.textContent = 'Describe what you want help with.';
    return;
  }
  if (!confirmProviderContext('Send this coding question to the configured AI provider?', Array.from(workspaceContext.keys()))) return;
  codingAgentAsk.disabled = true;
  codingAgentStatus.textContent = 'Reviewing the selected context…';
  codingAgentAnswer.textContent = '';
  setMascotState('working');
  try {
    const context = Array.from(workspaceContext, ([filePath, content]) => `File: ${filePath}\n\`\`\`\n${content}\n\`\`\``).join('\n\n');
    const result = await api.askCodingAgent({ task, context });
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    codingAgentAnswer.textContent = result.reply;
    codingAgentStatus.textContent = `Answered using ${workspaceContext.size} selected file${workspaceContext.size === 1 ? '' : 's'}.`;
    setMascotState('speaking', 1800);
  } catch (err) {
    codingAgentStatus.textContent = `Coding agent failed: ${String((err && err.message) || err)}`;
  } finally {
    codingAgentAsk.disabled = false;
    if (mascotState === 'working') restoreMascotState();
  }
});

codingAgentPropose.addEventListener('click', async () => {
  const instruction = codingAgentTask.value.trim();
  if (!appState.workspacePath || !selectedEditPaths.size || !instruction) {
    codingAgentStatus.textContent = 'Select a workspace, one or more edit target files, and describe the change.';
    return;
  }
  if (!confirmProviderContext('Send this edit request and the current contents of these files to the configured AI provider?', Array.from(selectedEditPaths))) return;
  codingAgentPropose.disabled = true;
  codingAgentStatus.textContent = `Preparing a reviewable proposal for ${selectedEditPaths.size} file${selectedEditPaths.size === 1 ? '' : 's'}…`;
  setMascotState('working');
  try {
    const result = await api.proposeCodeEdit({ paths: Array.from(selectedEditPaths), instruction });
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    currentEditProposal = result;
    codingEditPath.textContent = `${result.edits.length} selected file${result.edits.length === 1 ? '' : 's'} · Review every diff before applying`;
    codingEditDiffs.replaceChildren();
    let hasChanges = false;
    let diffTooLarge = false;
    for (const edit of result.edits) {
      const section = document.createElement('section');
      const title = document.createElement('div');
      title.className = 'optimizer-note';
      title.textContent = edit.path;
      const diff = document.createElement('pre');
      if (edit.original === edit.content) {
        diff.textContent = 'No change proposed for this file.';
      } else {
        hasChanges = true;
        diff.textContent = createTextDiff(edit.original, edit.content);
        if (diff.textContent.startsWith('Diff too large')) diffTooLarge = true;
      }
      section.append(title, diff);
      codingEditDiffs.appendChild(section);
    }
    codingEditApply.disabled = diffTooLarge || !hasChanges;
    codingEditProposal.classList.remove('hidden');
    codingAgentStatus.textContent = codingEditApply.disabled
      ? (!hasChanges ? 'The proposal made no changes.' : 'At least one diff is too large to safely review. Narrow the request.')
      : 'Proposal ready. Nothing has changed on disk.';
  } catch (err) {
    codingAgentStatus.textContent = `Could not create edit proposal: ${String((err && err.message) || err)}`;
  } finally {
    updateWorkspaceContextStatus();
    if (mascotState === 'working') restoreMascotState();
  }
});

codingEditDiscard.addEventListener('click', () => {
  currentEditProposal = null;
  codingEditDiffs.replaceChildren();
  codingEditApply.disabled = false;
  codingEditProposal.classList.add('hidden');
  codingAgentStatus.textContent = 'Edit proposal discarded; no file was changed.';
});

codingEditApply.addEventListener('click', async () => {
  if (!currentEditProposal) return;
  codingEditApply.disabled = true;
  setMascotState('working');
  try {
    const result = await api.applyCodeEdit({ proposalId: currentEditProposal.proposalId });
    if (result && result.cancelled) {
      codingAgentStatus.textContent = 'Applying the edit was cancelled; no file was changed.';
      return;
    }
    if (result && result.partial) {
      lastCodingUndoId = result.undoId || '';
      codingEditUndo.disabled = !lastCodingUndoId;
      currentEditProposal = null;
      codingEditDiffs.replaceChildren();
      codingEditProposal.classList.add('hidden');
      codingAgentStatus.textContent = result.error;
      await loadWorkspaceFiles();
      return;
    }
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    lastCodingUndoId = result.undoId;
    codingEditUndo.disabled = false;
    codingAgentStatus.textContent = `Applied ${result.paths.join(', ')}. Use Undo last edit to restore the group.`;
    currentEditProposal = null;
    codingEditDiffs.replaceChildren();
    codingEditApply.disabled = false;
    codingEditProposal.classList.add('hidden');
    await loadWorkspaceFiles();
  } catch (err) {
    codingAgentStatus.textContent = `Could not apply edit: ${String((err && err.message) || err)}`;
  } finally {
    codingEditApply.disabled = false;
    if (mascotState === 'working') restoreMascotState();
  }
});

codingEditUndo.addEventListener('click', async () => {
  if (!lastCodingUndoId) return;
  codingEditUndo.disabled = true;
  setMascotState('working');
  try {
    const result = await api.undoCodeEdit(lastCodingUndoId);
    if (result && result.cancelled) {
      codingAgentStatus.textContent = 'Undo was cancelled; no file was restored.';
      codingEditUndo.disabled = false;
      return;
    }
    if (result && result.partial) {
      lastCodingUndoId = result.undoId || '';
      codingEditUndo.disabled = !lastCodingUndoId;
      const restored = result.restoredPaths && result.restoredPaths.length
        ? ` Restored: ${result.restoredPaths.join(', ')}.`
        : '';
      codingAgentStatus.textContent = `${result.error}${restored}`;
      await loadWorkspaceFiles();
      return;
    }
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    lastCodingUndoId = '';
    codingAgentStatus.textContent = `Restored ${result.paths.join(', ')}.`;
    await loadWorkspaceFiles();
  } catch (err) {
    codingAgentStatus.textContent = `Could not undo edit: ${String((err && err.message) || err)}`;
    codingEditUndo.disabled = false;
  } finally {
    if (mascotState === 'working') restoreMascotState();
  }
});

codingCheckForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!appState.workspacePath) {
    codingCheckStatus.textContent = 'Choose a workspace first.';
    return;
  }
  const command = codingCheckCommand.value.trim();
  if (!command) return;
  codingCheckRun.disabled = true;
  codingCheckStatus.textContent = 'Running check… (up to 120 seconds)';
  codingCheckOutput.classList.remove('hidden');
  codingCheckOutput.textContent = '';
  setMascotState('working');
  try {
    const result = await api.runCodingCheck({ command });
    if (result && result.cancelled) {
      codingCheckStatus.textContent = 'Run cancelled; no check was started.';
      codingCheckOutput.textContent = '(No command was run.)';
      return;
    }
    if (result && result.timedOut) {
      codingCheckStatus.textContent = result.error;
    } else if (!result || !result.command) {
      throw new Error((result && result.error) || 'Command was not run.');
    } else {
      codingCheckStatus.textContent = result.ok ? `Passed: ${result.command}` : `Failed (exit ${result.exitCode}): ${result.command}`;
    }
    codingCheckOutput.textContent = [
      result.stdout ? `STDOUT:\n${result.stdout}` : '',
      result.stderr ? `STDERR:\n${result.stderr}` : '',
      result.stdoutTruncated ? '[STDOUT truncated at 40,000 bytes]' : '',
      result.stderrTruncated ? '[STDERR truncated at 40,000 bytes]' : '',
      result.error || ''
    ].filter(Boolean).join('\n\n') || '(No output)';
    if (result.historyWarning) codingCheckStatus.textContent += ` · ${result.historyWarning}`;
    await loadCodingSessions();
  } catch (err) {
    codingCheckStatus.textContent = `Check failed: ${String((err && err.message) || err)}`;
  } finally {
    codingCheckRun.disabled = false;
    if (mascotState === 'working') restoreMascotState();
  }
});

async function loadCodingSessions(selectedId) {
  const result = await api.getCodingSessions();
  if (!result || !result.ok || !Array.isArray(result.sessions)) {
    codingSessionFollowUpResult.textContent = `Could not load session history: ${(result && result.error) || 'Unknown error'}`;
    return;
  }
  activeCodingSessions = result.sessions;
  const currentId = selectedId || codingSessionSelect.value;
  codingSessionSelect.replaceChildren();
  for (const session of activeCodingSessions) {
    const option = document.createElement('option');
    option.value = session.id;
    option.textContent = `${session.status === 'active' ? 'Active' : 'Done'} · ${session.platform} · ${session.title}`;
    codingSessionSelect.appendChild(option);
  }
  if (!activeCodingSessions.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No sessions yet';
    codingSessionSelect.appendChild(option);
  }
  if (currentId && activeCodingSessions.some((session) => session.id === currentId)) codingSessionSelect.value = currentId;
  else {
    const active = activeCodingSessions.find((session) => session.status === 'active');
    if (active) codingSessionSelect.value = active.id;
  }
  renderCodingSessionDetails();
}

function renderCodingSessionDetails() {
  const session = activeCodingSessions.find((entry) => entry.id === codingSessionSelect.value);
  codingSessionNotes.replaceChildren();
  codingSessionSummary.textContent = '';
  codingSessionFollowUpResult.textContent = '';
  codingSessionGitStatus.textContent = 'Git status is not checked.';
  const active = Boolean(session && session.status === 'active');
  codingSessionNoteForm.querySelector('button[type="submit"]').disabled = !active;
  codingSessionNote.disabled = !active;
  codingSessionFinish.disabled = !active;
  codingSessionFollowUp.disabled = !session;
  codingSessionResume.disabled = !session || !session.workspace;
  codingSessionGitRefresh.disabled = !session || !session.workspace || session.workspace !== appState.workspacePath;
  if (!session) {
    codingSessionProjectStatus.textContent = 'No project session selected.';
    codingSessionNotes.textContent = 'Start a session to keep a manual progress log.';
    return;
  }
  const check = session.lastCheck;
  codingSessionProjectStatus.textContent = session.workspace
    ? `Workspace: ${session.workspace}\nLast check: ${check
      ? `${check.ok ? 'Passed' : check.timedOut ? 'Timed out' : 'Failed'} · ${check.command} · ${new Date(check.at).toLocaleString()}`
      : 'No saved test/build result for this session.'}`
    : 'This session has no linked workspace.';
  for (const note of session.notes || []) {
    const item = document.createElement('div');
    item.className = 'coding-session-note';
    item.textContent = note.text;
    const date = document.createElement('time');
    date.textContent = new Date(note.createdAt).toLocaleString();
    item.appendChild(date);
    codingSessionNotes.appendChild(item);
  }
  if (!session.notes || !session.notes.length) codingSessionNotes.textContent = 'No notes yet.';
}

codingSessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const result = await api.startCodingSession({
      platform: codingSessionPlatform.value,
      title: codingSessionTitle.value,
      goal: codingSessionGoal.value
    });
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    codingSessionTitle.value = '';
    codingSessionGoal.value = '';
    await loadCodingSessions(result.session.id);
  } catch (err) {
    codingSessionFollowUpResult.textContent = `Could not start session: ${String((err && err.message) || err)}`;
  }
});

codingSessionNoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const sessionId = codingSessionSelect.value;
  try {
    const result = await api.addCodingSessionNote({ id: sessionId, text: codingSessionNote.value });
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    codingSessionNote.value = '';
    await loadCodingSessions(sessionId);
  } catch (err) {
    codingSessionFollowUpResult.textContent = `Could not save note: ${String((err && err.message) || err)}`;
  }
});

codingSessionSelect.addEventListener('change', renderCodingSessionDetails);

codingSessionResume.addEventListener('click', async () => {
  const sessionId = codingSessionSelect.value;
  if (!sessionId) return;
  codingSessionResume.disabled = true;
  codingSessionProjectStatus.textContent = 'Restoring saved workspace…';
  try {
    const result = await api.resumeCodingSession(sessionId);
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    appState.workspacePath = result.path;
    workspaceContext.clear();
    selectedEditPaths.clear();
    currentEditProposal = null;
    codingEditProposal.classList.add('hidden');
    workspaceFileSearch.value = '';
    await loadWorkspaceFiles('');
    await loadCodingSessions(sessionId);
    codingSessionGitStatus.textContent = 'Workspace restored. Reading Git status…';
    codingSessionGitRefresh.disabled = false;
    codingSessionGitRefresh.click();
  } catch (err) {
    codingSessionProjectStatus.textContent = `Could not resume session workspace: ${String((err && err.message) || err)}`;
  } finally {
    codingSessionResume.disabled = false;
  }
});

codingSessionGitRefresh.addEventListener('click', async () => {
  const session = activeCodingSessions.find((entry) => entry.id === codingSessionSelect.value);
  if (!session || session.workspace !== appState.workspacePath) {
    codingSessionGitStatus.textContent = 'Resume this session’s workspace before checking its Git state.';
    return;
  }
  codingSessionGitRefresh.disabled = true;
  codingSessionGitStatus.textContent = 'Reading Git status…';
  try {
    const result = await api.getWorkspaceGitStatus();
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    codingSessionGitStatus.textContent = `Read-only Git status:\n${result.status}${result.truncated ? '\nGit output was capped.' : ''}`;
  } catch (err) {
    codingSessionGitStatus.textContent = `Could not read Git status: ${String((err && err.message) || err)}`;
  } finally {
    codingSessionGitRefresh.disabled = false;
  }
});

codingSessionFinish.addEventListener('click', async () => {
  const sessionId = codingSessionSelect.value;
  if (!sessionId || !window.confirm('Mark this coding session complete?')) return;
  const result = await api.finishCodingSession(sessionId);
  if (!result || !result.ok) {
    codingSessionFollowUpResult.textContent = `Could not finish session: ${(result && result.error) || 'Unknown error'}`;
    return;
  }
  await loadCodingSessions(sessionId);
});

codingSessionFollowUp.addEventListener('click', async () => {
  const sessionId = codingSessionSelect.value;
  if (!sessionId) return;
  const session = activeCodingSessions.find((entry) => entry.id === sessionId);
  if (!session) return;
  const notesDescription = `Session: ${session.title}\n${(session.notes || []).length} saved note(s). The note contents are visible above and will be sent for summarization.`;
  if (!confirmProviderContext('Send this follow-up request to the configured AI provider?', [], notesDescription)) return;
  codingSessionFollowUp.disabled = true;
  codingSessionFollowUpResult.textContent = 'Preparing a follow-up from your saved notes…';
  try {
    const result = await api.followUpCodingSession(sessionId);
    if (!result || !result.ok) throw new Error((result && result.error) || 'Unknown error');
    codingSessionSummary.textContent = result.reply;
    codingSessionFollowUpResult.textContent = 'Follow-up ready. This uses only the notes you entered.';
  } catch (err) {
    codingSessionFollowUpResult.textContent = `Could not prepare follow-up: ${String((err && err.message) || err)}`;
  } finally {
    codingSessionFollowUp.disabled = false;
  }
});

function toggleCollapsed() {
  collapsed = !appEl.classList.contains('collapsed');
  appEl.classList.toggle('collapsed', collapsed);
  api.setCollapsed(collapsed);
}

function applySide(next) {
  appState.side = next === 'left' ? 'left' : 'right';
  appEl.classList.toggle('dock-left', appState.side === 'left');
  appEl.classList.toggle('dock-right', appState.side === 'right');
}

function easeInOut(v) {
  return v * v * (3 - 2 * v);
}

function bounce() {
  mascotEl.classList.remove('happy');
  void mascotEl.offsetWidth;
  mascotEl.classList.add('happy');
  setTimeout(() => mascotEl.classList.remove('happy'), 700);
}

let blinkStart = -1;
let blinkDur = 0;
let nextBlink = performance.now() + 2200 + Math.random() * 3000;

function blinkTick(now) {
  if (blinkStart < 0) {
    if (now >= nextBlink) {
      blinkStart = now;
      blinkDur = 190 + Math.random() * 70;
    } else {
      return 0;
    }
  }
  const p = (now - blinkStart) / blinkDur;
  if (p >= 1) {
    blinkStart = -1;
    nextBlink = now + 2400 + Math.random() * 4200;
    if (Math.random() < 0.14) nextBlink = now + 140;
    return 0;
  }
  if (p < 0.32) return easeInOut(p / 0.32);
  if (p < 0.46) return 1;
  return 1 - easeInOut((p - 0.46) / 0.54);
}

function applyBlink(amount) {
  const sy = 1 - 0.92 * amount;
  const sx = 1 + 0.07 * amount;
  const value = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
  eyeL.style.transform = value;
  eyeR.style.transform = value;
}

function computeExpression() {
  const hour = new Date().getHours();
  let target = 1;
  if (lastMetrics) {
    const cpu = lastMetrics.cpu == null ? 0 : lastMetrics.cpu;
    if (cpu > 85 || lastMetrics.mem.pct > 85) target = 0.55;
    else if (cpu > 65 || lastMetrics.mem.pct > 65) target = 0.82;
    else if (mediaPlaying || manualPlaying) target = 0.56;
  } else if (mediaPlaying || manualPlaying) {
    target = 0.56;
  }
  if (hour >= 23 || hour < 6) target = Math.min(target, 0.46);
  return target;
}

let lastFrameAt = 0;

function frame(now) {
  requestAnimationFrame(frame);
  if (sleeping) return;
  const minGap = collapsed ? 120 : 33;
  if (now - lastFrameAt < minGap) return;
  lastFrameAt = now;

  const k = 0.15;
  cur.ex += (tgt.ex - cur.ex) * k;
  cur.ey += (tgt.ey - cur.ey) * k;
  cur.bx += (tgt.bx - cur.bx) * k;
  cur.by += (tgt.by - cur.by) * k;
  cur.tilt += (tgt.tilt - cur.tilt) * k;
  cur.rot += (tgt.rot - cur.rot) * k;

  const listening = chatForm.classList.contains('listening');
  const wideTarget = dropHot ? 1.4 : listening ? 1.2 : 1;
  eyeWide += (wideTarget - eyeWide) * 0.12;

  think += ((thinkingActive ? 1 : 0) - think) * 0.055;
  const thinkTilt = Math.sin(now * 0.0019) * 8 * think;
  const thinkBob = Math.sin(now * 0.0031) * 3.6 * think;
  const thinkLook = -4.6 * think;

  vibe += (((mediaPlaying || manualPlaying) ? 1 : 0) - vibe) * 0.05;
  const vibeSway = Math.sin(now * 0.0024) * 3.6 * vibe;
  const vibeBob = Math.sin(now * 0.0048) * 3.4 * vibe;

  const exprTarget = sleeping || thinkingActive ? 1 : computeExpression();
  expression += (exprTarget - expression) * 0.07;
  const droopTarget = expression < 0.85 ? 2.4 : 0;
  droop += (droopTarget - droop) * 0.07;

  const idleTarget = !reduced && !sleeping && now - lastSignificant > 1600 ? 1 : 0;
  idle += (idleTarget - idle) * 0.04;

  if (!reduced) applyBlink(blinkTick(now));

  const bob = reduced ? 0 : Math.sin(now * 0.0016) * BOB_MAX * idle;
  const sway = reduced ? 0 : Math.sin(now * 0.0011 + 1.3) * 2 * idle;
  const breath = reduced ? 0 : Math.sin(now * 0.0016) * 0.01 * idle;

  bodyGroup.style.transform =
    `translate(${(cur.bx + sway + vibeSway).toFixed(3)}px, ${(cur.by + bob + thinkBob + vibeBob).toFixed(3)}px) ` +
    `rotate(${(cur.rot + thinkTilt * 0.12 + vibeSway * 0.06).toFixed(3)}deg) scale(${(1 + breath).toFixed(4)})`;

  eyesGroup.style.transform =
    `translate(${cur.ex.toFixed(3)}px, ${(cur.ey + droop + thinkLook).toFixed(3)}px) ` +
    `rotate(${(cur.tilt + thinkTilt).toFixed(3)}deg) scale(${eyeWide.toFixed(3)}, ${expression.toFixed(4)})`;
}

api.onCursor(({ nx, ny }) => {
  if (sleeping || collapsed) return;
  const eyeX = clampNum(nx * EYE_MAX, -EYE_MAX, EYE_MAX);
  const eyeY = clampNum(ny * EYE_MAX, -EYE_MAX, EYE_MAX);
  const len = Math.hypot(eyeX, eyeY);
  const scale = len > EYE_MAX ? EYE_MAX / len : 1;
  tgt.ex = eyeX * scale;
  tgt.ey = eyeY * scale;
  tgt.bx = nx * BODY_MAX;
  tgt.by = ny * BODY_MAX;
  tgt.tilt = nx * TILT_MAX;
  tgt.rot = nx * ROT_MAX;

  if (Math.abs(nx - lastN.nx) + Math.abs(ny - lastN.ny) > 0.008) {
    lastSignificant = performance.now();
    lastN = { nx, ny };
  }
});

api.onSide(applySide);
api.onTap(toggleCollapsed);
api.onMetrics(renderMetrics);
api.onDragState((dragging) => mascotEl.classList.toggle('dragging', dragging));

api.onSleep(() => {
  sleeping = true;
  closeModelMenu();
  appEl.classList.add('sleeping', 'collapsed');
  api.setCollapsed(true);
  setTimeout(() => {
    if (sleeping) panelsEl.style.display = 'none';
  }, 320);
});

api.onWake(() => {
  sleeping = false;
  panelsEl.style.display = '';
  appEl.classList.remove('sleeping', 'collapsed');
  collapsed = false;
  api.setCollapsed(false);
  bounce();
});

api.onBriefingRequest(() => {
  showView('chat');
  const briefing = buildDailyBriefing(appState.tasks);
  addDailyBriefingCard(briefing);
  showThought(briefing.toast);
});

api.onFocusChat(() => {
  showView('chat');
  setTimeout(() => chatInput.focus(), 60);
});

api.onSettings((payload) => {
  if (!payload) return;
  if (typeof payload.opacity === 'number') {
    document.body.style.setProperty('--glass', String(payload.opacity));
    appState.settings.opacity = payload.opacity;
  }
  if (typeof payload.performance === 'boolean') {
    appState.settings.performance = payload.performance;
    document.body.classList.toggle('perf', payload.performance);
  }
  if (typeof payload.dnd === 'boolean') {
    appState.settings.dnd = payload.dnd;
    document.body.classList.toggle('dnd', payload.dnd);
    if (payload.dnd && sleepTimer) { clearTimeout(sleepTimer); sleepTimer = null; }
  }
});

api.onClipboard((list) => {
  appState.clipboard = list || [];
  if (currentView === 'skills') renderClips();
});

let lastHitAt = 0;
function updateMouseHit(e) {
  const gate = performance.now();
  if (gate - lastHitAt < 90) return;
  lastHitAt = gate;
  noteActivity();
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const hit = Boolean(el && el.closest('.hit'));
  lastHit = hit;
  api.hit(hit);
}
window.addEventListener('mousemove', updateMouseHit);

window.addEventListener('keydown', noteActivity);
window.addEventListener('pointerdown', noteActivity);

mascotEl.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  if (sleeping) {
    api.wake();
    return;
  }
  pointerDown = true;
  mascotPointerStart = { x: e.clientX, y: e.clientY };
  api.dragStart();
});

const endPointer = (event) => {
  if (!pointerDown) return;
  pointerDown = false;
  api.dragEnd();
  mascotEl.classList.remove('dragging');
  const start = mascotPointerStart;
  mascotPointerStart = null;
  if (event && event.type === 'pointerup' && start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) < 6) {
    noteActivity();
    bounce();
  }
};

window.addEventListener('pointerup', endPointer);
window.addEventListener('pointercancel', endPointer);
window.addEventListener('blur', endPointer);

mascotEl.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  noteActivity();
  if (sleeping) api.wake();
  else bounce();
});

mascotEl.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  api.menu();
});

taskList.addEventListener('change', async (e) => {
  const box = e.target.closest('input[type="checkbox"]');
  if (!box) return;
  appState.tasks = await api.toggleTask(box.dataset.id);
  renderTasks();
});

api.onTasks((tasks) => {
  if (!Array.isArray(tasks)) return;
  appState.tasks = tasks;
  renderTasks();
});

taskList.addEventListener('click', async (e) => {
  const del = e.target.closest('.del');
  if (!del) return;
  appState.tasks = await api.removeTask(del.dataset.id);
  renderTasks();
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  const remindAt = taskReminder.value ? new Date(taskReminder.value).getTime() : null;
  if (taskReminder.value && (!Number.isSafeInteger(remindAt) || !Number.isFinite(new Date(remindAt).getTime()) || remindAt <= Date.now())) {
    taskReminder.setCustomValidity('Choose a future date and time.');
    taskReminder.reportValidity();
    taskReminder.setCustomValidity('');
    return;
  }
  if (await commitTask(value, remindAt)) {
    taskInput.value = '';
    taskReminder.value = '';
  }
});

desktopSearchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  desktopSearchButton.disabled = true;
  desktopSearchStatus.textContent = 'Searching top-level Desktop files…';
  desktopSearchResults.replaceChildren();
  try {
    const result = await api.searchDesktop({ query: desktopSearchInput.value });
    if (!result || !result.ok || !Array.isArray(result.files) || !result.groups) {
      throw new Error((result && result.error) || 'The Desktop search returned an invalid response.');
    }

    if (!result.totalMatches) {
      desktopSearchStatus.textContent = 'No matching Desktop files found.';
      return;
    }

    const suggestions = Object.entries(result.groups)
      .map(([group, count]) => `${group} (${count})`)
      .join(' · ');
    desktopSearchStatus.textContent = `Found ${result.totalMatches} file${result.totalMatches === 1 ? '' : 's'}. Suggested groups: ${suggestions}.${result.truncated ? ` Showing the first ${result.files.length}.` : ''}`;

    for (const file of result.files) {
      const row = document.createElement('div');
      row.className = 'list-row';
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = file.name;
      name.title = file.name;

      const modified = Number.isFinite(file.modifiedAt)
        ? new Date(file.modifiedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        : '';
      const meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = [file.group, formatFileSize(file.sizeBytes), modified].filter(Boolean).join(' · ');

      const reveal = document.createElement('button');
      reveal.type = 'button';
      reveal.className = 'mini-btn';
      reveal.textContent = 'Show';
      reveal.setAttribute('aria-label', `Show ${file.name} in File Explorer`);
      reveal.addEventListener('click', async () => {
        reveal.disabled = true;
        try {
          const opened = await api.revealDesktopFile(file.name);
          if (!opened || !opened.ok) throw new Error((opened && opened.error) || 'Unknown error');
          reveal.textContent = 'Shown';
        } catch (err) {
          reveal.disabled = false;
          desktopSearchStatus.textContent = `Could not locate ${file.name}: ${String((err && err.message) || err)}`;
        }
      });

      row.append(name, meta, reveal);
      desktopSearchResults.appendChild(row);
    }
  } catch (err) {
    desktopSearchStatus.textContent = `Desktop search failed: ${String((err && err.message) || err)}`;
  } finally {
    desktopSearchButton.disabled = false;
  }
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = chatInput.value;
  chatInput.value = '';
  sendChat(value, { file: attachedFile, image: pendingImage });
});

modelBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  const open = modelMenu.classList.toggle('open');
  if (open) await loadModels();
});

modelRefresh.addEventListener('click', (e) => {
  e.stopPropagation();
  loadModels();
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#modelMenu') && !e.target.closest('#modelBtn')) closeModelMenu();
});

for (const tab of tabs) {
  tab.addEventListener('click', () => showView(tab.dataset.view));
  tab.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(tab);
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    showView(nextTab.dataset.view);
    nextTab.focus();
  });
}

settingsBtn.addEventListener('click', () => showView(currentView === 'settings' ? 'chat' : 'settings'));

api.onOpenSettings(() => {
  wake();
  showView('settings');
});

api.onClickThrough((enabled) => {
  clickThroughIndicator.classList.toggle('hidden', !enabled);
  showThought(enabled
    ? 'Desktop click-through is on. Press Ctrl+Shift+X to interact with me again.'
    : 'Desktop click-through is off. You can interact with me again.');
  if (!enabled) api.hit(Boolean(lastHit));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModelMenu();
    if (currentView !== 'chat') showView('chat');
    chatInput.blur();
  }
});

const speechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;

function setListening(on) {
  listening = on;
  chatForm.classList.toggle('listening', on);
  mascotWrap.classList.toggle('listening', on);
  micBtn.classList.toggle('listening', on);
  micBtn.title = on ? 'Listening... click to stop' : 'Press to speak';
  if (on) setMascotState('listening');
  else if (mascotState === 'listening') restoreMascotState();
}

if (speechApi) {
  recognition = new speechApi();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.onresult = (event) => {
    let finalText = '';
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const chunk = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalText += chunk;
      else interim += chunk;
    }
    if (finalText) chatInput.value = finalText.trim();
    else if (interim) chatInput.value = interim;
    noteActivity();
  };
  recognition.onerror = (event) => {
    setListening(false);
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      addMessage('bot', 'Microphone access was blocked. Allow it for CyberMascot in Windows privacy settings.');
    }
  };
  recognition.onend = () => setListening(false);
  recognition.onstart = () => setListening(true);
}

micBtn.addEventListener('click', () => {
  noteActivity();
  if (!recognition) {
    addMessage('bot', 'Speech recognition is not available in this runtime. Try the clipboard skills instead.');
    return;
  }
  if (listening) {
    recognition.stop();
    return;
  }
  try {
    recognition.start();
  } catch (_) {
    setListening(false);
  }
});

document.querySelectorAll('[data-skill]').forEach((btn) => {
  btn.addEventListener('click', () => runSkill(btn.dataset.skill));
});

document.querySelectorAll('[data-launch]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const label = btn.textContent;
    btn.textContent = 'Opening...';
    await api.launchApp(btn.dataset.launch);
    setTimeout(() => { btn.textContent = label; }, 1200);
  });
});

async function runSkill(kind) {
  noteActivity();
  if (kind === 'cpu-optimizer') {
    await loadCpu();
    return;
  }

  if (kind === 'debug') {
    const clip = (await api.clipboardRead()).trim();
    if (!clip) {
      showView('chat');
      addMessage('bot', 'Clipboard is empty. Copy the failing command or stack trace first, then press Analyze error again.');
      return;
    }
    const snippet = clip.slice(0, 3000);
    await askWithPrompt(
      'Debug the error in my clipboard.',
      `Debug this error from my clipboard. Explain the most likely cause, then give the exact fix. If a code change is needed, show a minimal patch in a fenced block.\n\n\`\`\`\n${snippet}\n\`\`\``
    );
    return;
  }

  if (kind === 'code-python' || kind === 'code-react') {
    const clip = (await api.clipboardRead()).trim().slice(0, 2000);
    const lang = kind === 'code-python' ? 'Python' : 'React (JavaScript, functional component with hooks)';
    const context = clip ? `\n\nClipboard context:\n\`\`\`\n${clip}\n\`\`\`` : '';
    await askWithPrompt(
      kind === 'code-python' ? 'Generate a Python script.' : 'Generate a React component.',
      `Write a complete, runnable ${lang} snippet based on what I am working on. Keep it focused, include imports, and return one fenced ${kind === 'code-python' ? 'python' : 'jsx'} block.${context}`
    );
    return;
  }

  if (kind === 'code-refactor') {
    const clip = (await api.clipboardRead()).trim();
    if (!clip) {
      showView('chat');
      addMessage('bot', 'Clipboard is empty. Copy the code you want refactored first.');
      return;
    }
    await askWithPrompt(
      'Refactor the code in my clipboard.',
      `Refactor the following code for readability and correctness without changing behavior. Explain the key changes in one or two bullets, then return the full refactored code in one fenced block.\n\n\`\`\`\n${clip.slice(0, 4000)}\n\`\`\``
    );
  }
}

async function loadProcessList(listEl, sortBy) {
  const isCpuAverage = sortBy === 'cpu-average';
  if (isCpuAverage) cpuSampleStatus.textContent = 'Sampling CPU across five readings...';
  listEl.textContent = 'Reading process table...';
  let res;
  try {
    res = await api.topProcesses(sortBy);
  } catch (err) {
    res = { ok: false, error: String((err && err.message) || err) };
  }
  listEl.innerHTML = '';
  if (!res || !res.ok) {
    if (isCpuAverage) cpuSampleStatus.textContent = 'CPU sample failed.';
    const row = document.createElement('div');
    row.className = 'list-row';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = 'Process list unavailable: ' + ((res && res.error) || 'unknown error');
    row.appendChild(name);
    listEl.appendChild(row);
    return;
  }
  if (isCpuAverage) {
    const seconds = Math.max(1, Math.round((res.sampleDurationMs || 0) / 1000));
    cpuSampleStatus.textContent = `Five-sample average over about ${seconds}s. Review the process name and PID before closing.`;
  }
  if (!res.list.length) {
    const row = document.createElement('div');
    row.className = 'list-row';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = 'No eligible processes found.';
    row.appendChild(name);
    listEl.appendChild(row);
    return;
  }

  for (const proc of res.list) {
    const row = document.createElement('div');
    row.className = 'list-row';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'ram-check';
    check.dataset.pid = String(proc.pid);
    check.dataset.name = proc.name;
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = proc.name;
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = 'PID ' + proc.pid + ' · ' + proc.memMb + ' MB · ' + proc.cpu + '%';
    const kill = document.createElement('button');
    kill.type = 'button';
    kill.className = 'mini-btn danger';
    kill.textContent = 'Close';
    kill.addEventListener('click', async () => {
      if (!window.confirm('Close ' + proc.name + ' (PID ' + proc.pid + ')? Unsaved work in it will be lost.')) return;
      kill.textContent = 'Closing...';
      try {
        const out = await api.killProcess(proc.pid);
        kill.textContent = out && out.ok ? 'Closed' : 'Failed';
        if (!out || !out.ok) addMessage('bot', 'Could not close ' + proc.name + ': ' + ((out && out.error) || 'unknown error'));
      } catch (err) {
        kill.textContent = 'Failed';
        addMessage('bot', 'Could not close ' + proc.name + ': ' + String((err && err.message) || err));
      }
      setTimeout(() => loadProcessList(listEl, sortBy), 1200);
    });
    row.append(check, name, meta, kill);
    listEl.appendChild(row);
  }
}

function loadRam() {
  setMascotState('working');
  return loadProcessList(ramList, 'memory').finally(() => {
    if (mascotState === 'working') restoreMascotState();
  });
}

function loadCpu() {
  if (cpuLoadPromise) return cpuLoadPromise;
  cpuScan.disabled = true;
  setMascotState('working');
  cpuLoadPromise = loadProcessList(cpuList, 'cpu-average');
  return cpuLoadPromise.finally(() => {
    cpuLoadPromise = null;
    cpuScan.disabled = false;
    if (mascotState === 'working') restoreMascotState();
  });
}

async function closeSelectedProcesses(listEl, button, sortBy) {
  noteActivity();
  const selected = Array.from(listEl.querySelectorAll('input.ram-check:checked'))
    .map((checkbox) => ({ pid: Number(checkbox.dataset.pid), name: checkbox.dataset.name }));
  if (!selected.length) {
    showThought('Select one or more processes to close.');
    return;
  }
  const names = selected.map((proc) => proc.name).join(', ');
  if (!window.confirm(`Close ${names}? Unsaved work in those apps will be lost.`)) return;

  const idleLabel = button.textContent;
  button.textContent = 'Closing...';
  button.disabled = true;
  let res;
  try {
    res = await api.cleanupProcesses(selected.map((proc) => proc.pid));
  } catch (err) {
    addMessage('bot', 'Process cleanup failed: ' + String((err && err.message) || err));
    return;
  } finally {
    button.textContent = idleLabel;
    button.disabled = false;
  }
  if (!res || !res.ok) {
    addMessage('bot', 'Process cleanup failed: ' + ((res && res.error) || 'unknown error'));
    return;
  }
  const summary = res.closed
    ? 'Closed ' + res.closed + ' process' + (res.closed === 1 ? '' : 'es') + ' (' + res.names.join(', ') + '). They were using about ' + res.freedMb + ' MB RAM and ' + res.freedCpu + '% CPU.'
    : 'No selected processes were closed.';
  showThought(summary);
  if (res.closed) bounce();
  addMessage('bot', summary);
  for (const failure of (res.errors || [])) {
    addMessage('bot', 'Could not close ' + failure.name + ': ' + failure.error);
  }
  await loadProcessList(listEl, sortBy);
}

ramClean.addEventListener('click', () => closeSelectedProcesses(ramList, ramClean, 'memory'));
cpuClean.addEventListener('click', () => closeSelectedProcesses(cpuList, cpuClean, 'cpu-average'));

ramRefresh.addEventListener('click', loadRam);

function renderDiagnostics(result, testModel) {
  const selectedModel = String(result.selectedModel || appState.model || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 100);
  const weatherStatus = !appState.weather
    ? 'unavailable'
    : appState.weather.stale ? 'cached (stale)' : 'current data available';
  const locationStatus = appState.weatherLocationEnabled ? 'device location enabled' : 'saved city fallback';
  const modelTestStatus = !testModel
    ? 'not run'
    : result.test && result.test.ok
      ? `passed in ${(result.test.durationMs / 1000).toFixed(1)}s`
      : (result.error || 'failed');
  const modelTestReportStatus = !testModel
    ? 'not run'
    : result.test && result.test.ok
      ? `passed in ${(result.test.durationMs / 1000).toFixed(1)}s`
      : 'failed';
  const rows = [
    ['Ollama', result.reachable ? 'reachable' : 'unavailable'],
    ['Installed models', result.reachable ? String(result.modelCount || 0) : 'not checked'],
    ['Selected model', selectedModel || 'not set'],
    ['Model installed', result.reachable ? (result.modelInstalled ? 'yes' : 'no') : 'not checked'],
    ['Model test', modelTestStatus],
    ['Weather', weatherStatus],
    ['Weather location', locationStatus]
  ];

  diagnosticsList.innerHTML = '';
  for (const [label, value] of rows) {
    const row = document.createElement('div');
    row.className = 'list-row';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = label;
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = value;
    meta.title = value;
    row.append(name, meta);
    diagnosticsList.appendChild(row);
  }

  const looksLikeSecret = /(?:^|[^A-Za-z0-9])(?:sk-[A-Za-z0-9_-]{12,}|AIza[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,})(?:$|[^A-Za-z0-9])/i.test(selectedModel);
  const reportModel = /^https?:\/\//i.test(selectedModel) || looksLikeSecret ? '[omitted]' : (selectedModel || 'not set');
  lastDiagnosticsReport = [
    'CyberMascot Companion diagnostics',
    `Ollama connection: ${result.reachable ? 'reachable' : 'unavailable'}`,
    `Installed models: ${result.reachable ? String(result.modelCount || 0) : 'not checked'}`,
    `Selected model: ${reportModel}`,
    `Selected model installed: ${result.reachable ? (result.modelInstalled ? 'yes' : 'no') : 'not checked'}`,
    `Model test: ${modelTestReportStatus}`,
    `Weather: ${weatherStatus}`,
    `Weather location: ${locationStatus}`
  ].join('\n');

  diagnosticsStatus.textContent = result.reachable
    ? (testModel && !(result.test && result.test.ok) ? (result.error || 'The model test did not complete.') : 'Checks completed.')
    : (result.error || 'Ollama is unavailable.');
  diagnosticsCopy.disabled = false;
}

async function runDiagnostics(testModel) {
  diagnosticsCheck.disabled = true;
  diagnosticsTestModel.disabled = true;
  diagnosticsCopy.disabled = true;
  diagnosticsStatus.textContent = testModel
    ? 'Testing the selected model. This may take up to 120 seconds...'
    : 'Checking Ollama and current weather status...';
  diagnosticsList.innerHTML = '';

  let result;
  try {
    result = await api.diagnoseOllama(Boolean(testModel));
    if (!result || typeof result !== 'object') throw new Error('Diagnostics returned no result.');
  } catch (err) {
    result = {
      ok: false,
      reachable: false,
      selectedModel: appState.model,
      modelInstalled: false,
      modelCount: 0,
      error: String((err && err.message) || err)
    };
  }

  renderDiagnostics(result, Boolean(testModel));
  diagnosticsCheck.disabled = false;
  diagnosticsTestModel.disabled = false;
}

diagnosticsCheck.addEventListener('click', () => runDiagnostics(false));
diagnosticsTestModel.addEventListener('click', () => runDiagnostics(true));
diagnosticsCopy.addEventListener('click', async () => {
  try {
    const copied = await api.clipboardCopy(lastDiagnosticsReport);
    if (!copied) throw new Error('Clipboard copy was not completed.');
    diagnosticsStatus.textContent = 'Redacted report copied.';
  } catch (err) {
    diagnosticsStatus.textContent = 'Could not copy report: ' + String((err && err.message) || err);
  }
});

async function loadClips() {
  appState.clipboard = await api.clipboardList();
  renderClips();
}

function renderClips() {
  clipList.innerHTML = '';
  if (!appState.clipboard.length) {
    const empty = document.createElement('div');
    empty.className = 'list-row';
    empty.textContent = 'No clipboard history yet.';
    clipList.appendChild(empty);
    return;
  }
  for (const item of appState.clipboard) {
    const row = document.createElement('div');
    row.className = 'list-row';
    const text = document.createElement('span');
    text.className = 'clip-text';
    text.textContent = item.text.replace(/\s+/g, ' ').slice(0, 80);
    text.title = item.text.slice(0, 400);
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'mini-btn';
    copy.textContent = 'Copy';
    copy.addEventListener('click', async () => {
      await api.clipboardCopy(item.text);
      copy.textContent = 'Copied';
      setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
    });
    row.append(text, copy);
    clipList.appendChild(row);
  }
}

let focusEnds = 0;
let focusTimer = null;
const FOCUS_MS = 25 * 60 * 1000;

function focusTick() {
  const remaining = Math.max(0, focusEnds - Date.now());
  const total = FOCUS_MS;
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  focusTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progress = remaining / total;
  ringFg.style.strokeDashoffset = String(RING_LEN * (1 - progress));
  if (remaining <= 0) {
    stopFocus(false);
    addMessage('bot', 'Focus sprint complete. Stretch, look away from the screen for twenty seconds, then pick your next task.');
    notifyEvent('Focus complete', 'Twenty-five minutes done. Stand up, stretch, and look away from the screen.');
  }
}

function startFocus() {
  focusEnds = Date.now() + FOCUS_MS;
  focusRing.classList.add('active');
  focusBtn.textContent = 'Stop';
  focusTimer = setInterval(focusTick, 500);
  focusTick();
  addMessage('bot', 'Focus sprint started. Twenty-five minutes, ring is live around me.');
}

function stopFocus(announce) {
  clearInterval(focusTimer);
  focusTimer = null;
  focusEnds = 0;
  focusRing.classList.remove('active');
  ringFg.style.strokeDashoffset = String(RING_LEN);
  focusTime.textContent = '25:00';
  focusBtn.textContent = 'Start';
  if (announce) addMessage('bot', 'Focus sprint stopped.');
}

focusBtn.addEventListener('click', () => {
  noteActivity();
  if (focusTimer) stopFocus(true);
  else startFocus();
});

function syncSettingsForm() {
  const s = appState.settings;
  document.getElementById('setIdle').value = String(s.idleMinutes);
  document.getElementById('setCity').value = appState.city || '';
  setWeatherLocation.checked = appState.weatherLocationEnabled;
  document.getElementById('setUnit').value = s.unit;
  document.getElementById('setProvider').value = appState.provider;
  document.getElementById('setModel').value = appState.model;
  document.getElementById('setBaseUrl').value = appState.baseUrl || '';
  document.getElementById('setOllamaUrl').value = appState.ollamaUrl || 'http://127.0.0.1:11434';
  updateProviderFields();
  document.getElementById('setTop').checked = s.alwaysOnTop !== false;
  document.getElementById('setLogin').checked = s.launchAtLogin !== false;
  document.getElementById('loginStartupStatus').textContent = appState.autostartError ||
    (s.launchAtLogin !== false
      ? 'Enabled: CyberMascot opens after you sign in to Windows. This does not create or manage a CyberMascot account.'
      : 'Disabled: CyberMascot will not open automatically when you sign in.');
  setNotify.checked = s.notifications !== false;
  setCpuWarningThreshold.value = String(s.cpuWarningThreshold || 90);
  setMemoryWarningThreshold.value = String(s.memoryWarningThreshold || 90);
  setClipboardHistoryPaused.checked = Boolean(s.clipboardHistoryPaused);
  setClipboardRetention.value = String(Number.isFinite(s.clipboardRetentionDays) ? s.clipboardRetentionDays : 0);
  clipboardHistoryStatus.textContent = s.clipboardHistoryPaused
    ? 'Paused: new clipboard text is not added to history.'
    : 'Clipboard history is stored locally in the app configuration.';
  setPerf.checked = Boolean(s.performance);
  setDnd.checked = Boolean(s.dnd);
  document.getElementById('setHumorLevel').value = ['low', 'medium', 'high'].includes(s.humorLevel) ? s.humorLevel : 'medium';
  document.getElementById('setUseEmojis').checked = s.useEmojis !== false;
  document.getElementById('setOpacity').value = String(Math.round((s.opacity || 0.55) * 100));
  document.getElementById('setClock').value = s.clock || '24';
  document.getElementById('setAccessory').value = s.accessory || 'classic';
  document.getElementById('setVoiceAutoPlay').checked = s.voiceAutoPlay !== false;
  document.getElementById('setVoiceRate').value = String(Number(s.voiceRate) || 1);
  document.getElementById('setVoiceVolume').value = String(Number.isFinite(s.voiceVolume) ? s.voiceVolume : 1);
  document.getElementById('voiceRateValue').textContent = (Number(s.voiceRate) || 1).toFixed(1) + '×';
  document.getElementById('voiceVolumeValue').textContent = Math.round((Number.isFinite(s.voiceVolume) ? s.voiceVolume : 1) * 100) + '%';
  populateVoiceOptions();
}

function updateProviderFields() {
  const ollama = appState.provider === 'ollama';
  document.getElementById('ollamaUrlField').style.display = ollama ? '' : 'none';
  document.getElementById('setBaseUrl').closest('.field').style.display = ollama ? 'none' : '';
  document.getElementById('setKey').closest('.field').style.display =
    appState.provider === 'gemini' || appState.provider === 'openai' ? '' : 'none';
  document.getElementById('setModel').closest('.field').style.display = '';
}

let noteTimer = null;
function flashNote(text) {
  settingsNote.textContent = text;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(() => { settingsNote.textContent = 'Settings save automatically.'; }, 1600);
}

async function saveSettings(patch) {
  let res;
  try {
    res = await api.setSettings(patch);
  } catch (error) {
    flashNote(`Could not save settings: ${String((error && error.message) || error)}`);
    return null;
  }
  if (!res) return;
  if (res.ok === false) {
    flashNote(res.error || 'Could not save settings.');
    return null;
  }
  appState.settings = res.settings;
  appState.provider = res.chat.provider;
  appState.model = res.chat.model;
  appState.baseUrl = res.chat.baseUrl || appState.baseUrl;
  appState.ollamaUrl = res.chat.ollamaUrl || appState.ollamaUrl;
  appState.weatherLocationEnabled = res.weatherLocationEnabled !== false;
  appState.city = res.weatherCity || appState.city;
  appState.weather = res.weather || appState.weather;
  appState.keyStorageError = res.keyStorageError || '';
  renderWeather();
  updateModelLabel();
  document.body.style.setProperty('--glass', String(appState.settings.opacity));
  document.body.classList.toggle('perf', Boolean(appState.settings.performance));
  applyAccessory(appState.settings.accessory);
  flashNote(appState.keyStorageError || 'Saved.');
  return res;
}

document.getElementById('setIdle').addEventListener('change', (e) => {
  saveSettings({ settings: { idleMinutes: Number(e.target.value) } });
});

document.getElementById('setCity').addEventListener('change', (e) => {
  const city = e.target.value.trim() || 'Nairobi';
  appState.city = city;
  saveSettings({ weather: { city } });
});

setWeatherLocation.addEventListener('change', async () => {
  appState.weatherLocationEnabled = setWeatherLocation.checked;
  const res = await saveSettings({ weather: { useDeviceLocation: appState.weatherLocationEnabled } });
  if (res && appState.weatherLocationEnabled) requestDeviceWeatherLocation();
});

document.getElementById('setUnit').addEventListener('change', (e) => {
  appState.settings.unit = e.target.value;
  renderWeather();
  saveSettings({ settings: { unit: e.target.value } });
});

document.getElementById('setProvider').addEventListener('change', (e) => {
  const provider = e.target.value;
  const patch = { provider };
  if (provider === 'gemini') {
    if (!appState.baseUrl || appState.baseUrl.includes('api.openai.com')) {
      patch.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/openai';
    }
    if (!appState.model || !appState.model.startsWith('gemini')) patch.model = 'gemini-2.5-flash';
  } else if (provider === 'ollama') {
    patch.url = appState.ollamaUrl || 'http://127.0.0.1:11434';
    if (!appState.model || /^gemini/i.test(appState.model)) patch.model = 'llama3.2';
  }
  appState.provider = provider;
  updateProviderFields();
  saveSettings({ chat: patch });
});

document.getElementById('setModel').addEventListener('change', (e) => {
  saveSettings({ chat: { model: e.target.value.trim() } });
});

document.getElementById('setBaseUrl').addEventListener('change', (e) => {
  const value = e.target.value.trim().replace(/\/$/, '');
  e.target.value = value;
  saveSettings({ chat: { baseUrl: value } });
});

document.getElementById('setOllamaUrl').addEventListener('change', (e) => {
  const value = e.target.value.trim().replace(/\/$/, '') || 'http://127.0.0.1:11434';
  e.target.value = value;
  appState.ollamaUrl = value;
  saveSettings({ chat: { url: value } });
});

document.getElementById('setKey').addEventListener('change', (e) => {
  const value = e.target.value.trim();
  if (!value) return;
  e.target.value = '';
  saveSettings({ chat: { apiKey: value } }).then((result) => {
    if (result) flashNote('API key saved encrypted for this Windows account.');
  });
});

document.getElementById('setTop').addEventListener('change', (e) => {
  saveSettings({ settings: { alwaysOnTop: e.target.checked } });
});

document.getElementById('setLogin').addEventListener('change', async (event) => {
  const toggle = event.target;
  const previous = !toggle.checked;
  const status = document.getElementById('loginStartupStatus');
  toggle.disabled = true;
  status.textContent = 'Updating Windows startup setting…';
  try {
    const result = await api.autostartSet(toggle.checked);
    if (!result || !result.ok) {
      toggle.checked = result ? Boolean(result.enabled) : previous;
      appState.settings.launchAtLogin = toggle.checked;
      status.textContent = (result && result.error) || 'Could not update Windows startup setting.';
      return;
    }
    toggle.checked = Boolean(result.enabled);
    appState.settings.launchAtLogin = toggle.checked;
    appState.autostartError = '';
    status.textContent = toggle.checked
      ? 'Enabled: CyberMascot opens after you sign in to Windows.'
      : 'Disabled: CyberMascot will not open automatically when you sign in.';
  } catch (err) {
    toggle.checked = previous;
    appState.settings.launchAtLogin = previous;
    status.textContent = `Could not update Windows startup setting: ${String((err && err.message) || err)}`;
  } finally {
    toggle.disabled = false;
  }
});

setNotify.addEventListener('change', (e) => {
  saveSettings({ settings: { notifications: e.target.checked } });
});

setCpuWarningThreshold.addEventListener('change', (event) => {
  saveSettings({ settings: { cpuWarningThreshold: Number(event.target.value) } });
});

setMemoryWarningThreshold.addEventListener('change', (event) => {
  saveSettings({ settings: { memoryWarningThreshold: Number(event.target.value) } });
});

setClipboardHistoryPaused.addEventListener('change', async (event) => {
  const result = await saveSettings({ settings: { clipboardHistoryPaused: event.target.checked } });
  if (!result) {
    event.target.checked = Boolean(appState.settings.clipboardHistoryPaused);
    return;
  }
  clipboardHistoryStatus.textContent = event.target.checked
    ? 'Paused: new clipboard text is not added to history.'
    : 'Active: new clipboard text will be added to history.';
});

setClipboardRetention.addEventListener('change', (event) => {
  saveSettings({ settings: { clipboardRetentionDays: Number(event.target.value) } });
});

clearClipboardHistory.addEventListener('click', async () => {
  clearClipboardHistory.disabled = true;
  clipboardHistoryStatus.textContent = 'Waiting for confirmation…';
  try {
    const result = await api.clipboardClearHistory();
    if (result && result.ok) {
      appState.clipboard = result.clipboard || [];
      renderClips();
      clipboardHistoryStatus.textContent = 'Clipboard history cleared.';
    } else if (result && result.cancelled) {
      clipboardHistoryStatus.textContent = 'Clipboard history was not changed.';
    } else {
      throw new Error((result && result.error) || 'Could not clear clipboard history.');
    }
  } catch (error) {
    clipboardHistoryStatus.textContent = `Could not clear clipboard history: ${String((error && error.message) || error)}`;
  } finally {
    clearClipboardHistory.disabled = false;
  }
});

setDnd.addEventListener('change', (e) => {
  document.body.classList.toggle('dnd', e.target.checked);
  api.setDnd(e.target.checked);
  if (e.target.checked) {
    if (sleepTimer) { clearTimeout(sleepTimer); sleepTimer = null; }
  }
});

document.getElementById('setHumorLevel').addEventListener('change', (event) => {
  saveSettings({ settings: { humorLevel: event.target.value } });
});

document.getElementById('setUseEmojis').addEventListener('change', (event) => {
  saveSettings({ settings: { useEmojis: event.target.checked } });
});
document.getElementById('setVoiceAutoPlay').addEventListener('change', (event) => saveSettings({ settings: { voiceAutoPlay: event.target.checked } }));
document.getElementById('setVoiceName').addEventListener('change', (event) => saveSettings({ settings: { voiceName: event.target.value } }));
document.getElementById('setVoiceRate').addEventListener('input', (event) => { document.getElementById('voiceRateValue').textContent = Number(event.target.value).toFixed(1) + '×'; });
document.getElementById('setVoiceRate').addEventListener('change', (event) => saveSettings({ settings: { voiceRate: Number(event.target.value) } }));
document.getElementById('setVoiceVolume').addEventListener('input', (event) => { document.getElementById('voiceVolumeValue').textContent = Math.round(Number(event.target.value) * 100) + '%'; });
document.getElementById('setVoiceVolume').addEventListener('change', (event) => saveSettings({ settings: { voiceVolume: Number(event.target.value) } }));
document.getElementById('voiceTestButton').addEventListener('click', () => speakResponse('Hello. I am CyberMascot, your personal AI companion. I am ready to help.'));
document.getElementById('voiceStopButton').addEventListener('click', () => { if (voiceController) voiceController.stop(); });

setPerf.addEventListener('change', (e) => {
  document.body.classList.toggle('perf', e.target.checked);
  saveSettings({ settings: { performance: e.target.checked } });
});

document.getElementById('setAccessory').addEventListener('change', (e) => {
  if (codingSessionActive) setCodingSession(false);
  applyAccessory(e.target.value);
  saveSettings({ settings: { accessory: e.target.value } });
});

codingSessionToggle.addEventListener('click', () => {
  noteActivity();
  setCodingSession(!codingSessionActive);
});

document.getElementById('setClock').addEventListener('change', (e) => {
  appState.settings.clock = e.target.value;
  updateClock();
  saveSettings({ settings: { clock: e.target.value } });
});

clearMemory.addEventListener('click', async () => {
  await api.clearHistory();
  chatHistory.length = 0;
  messagesEl.innerHTML = '';
  addMessage('bot', 'Conversation memory cleared. Fresh start, nothing carried over.');
  flashNote('Conversation memory cleared.');
});

document.getElementById('setOpacity').addEventListener('input', (e) => {
  const value = Number(e.target.value) / 100;
  document.body.style.setProperty('--glass', String(value));
});

document.getElementById('setOpacity').addEventListener('change', (e) => {
  saveSettings({ settings: { opacity: Number(e.target.value) / 100 } });
});

let thoughtTimer = null;

function setThinking(on) {
  thinkingActive = Boolean(on);
  mascotWrap.classList.toggle('thinking', thinkingActive);
  if (dotsEl) dotsEl.classList.toggle('thinking', thinkingActive);
  if (thinkingActive) setMascotState('thinking');
  else if (mascotState === 'thinking') restoreMascotState();
}

let mascotState = 'idle';
let mascotStateTimer = null;
const mascotStates = ['idle', 'listening', 'thinking', 'speaking', 'working'];

function setMascotState(state, duration = 0) {
  if (!mascotStates.includes(state)) return;
  clearTimeout(mascotStateTimer);
  mascotStateTimer = null;
  mascotState = state;
  mascotWrap.dataset.state = state;
  mascotEl.setAttribute('aria-label', `CyberMascot is ${state}. Press Enter or Space to interact.`);
  mascotStatus.textContent = `CyberMascot is ${state}.`;
  for (const activeState of ['listening', 'thinking', 'speaking', 'working']) {
    mascotWrap.classList.toggle(activeState, activeState === state);
  }
  if (duration > 0) {
    mascotStateTimer = setTimeout(() => {
      mascotStateTimer = null;
      restoreMascotState();
    }, duration);
  }
}

function restoreMascotState() {
  setMascotState(listening ? 'listening' : thinkingActive ? 'thinking' : 'idle');
}

function applyGlow(m) {
  const load = Math.max(m.cpu == null ? 0 : m.cpu, m.mem.pct);
  let color = 'rgba(180, 240, 255, 0.35)';
  let opacity = 0.45;
  let stressed = false;
  if (load > 85) {
    color = 'rgba(255, 85, 85, 0.65)';
    opacity = 0.9;
    stressed = true;
  } else if (load >= 65) {
    color = 'rgba(255, 190, 60, 0.5)';
    opacity = 0.7;
  } else if (mediaPlaying || manualPlaying) {
    color = 'rgba(160, 130, 255, 0.5)';
    opacity = 0.6;
  }
  mascotWrap.style.setProperty('--glow-color', color);
  mascotWrap.style.setProperty('--glow-opacity', String(opacity));
  mascotWrap.classList.toggle('stressed', stressed);
}

function showThought(text) {
  if (!text) return;
  thoughtPop.textContent = text;
  thoughtPop.classList.add('show');
  bounce();
  clearTimeout(thoughtTimer);
  thoughtTimer = setTimeout(() => thoughtPop.classList.remove('show'), 7000);
}

function notifyEvent(title, body) {
  if (appState.settings.notifications === false) return;
  if (!sleeping) showThought(body);
  api.notify({ title, body });
}

function monitorLoad(m) {
  const cpuThreshold = Number.isFinite(appState.settings.cpuWarningThreshold)
    ? appState.settings.cpuWarningThreshold
    : 90;
  const memoryThreshold = Number.isFinite(appState.settings.memoryWarningThreshold)
    ? appState.settings.memoryWarningThreshold
    : 90;
  const cpuHigh = (m.cpu || 0) >= cpuThreshold;
  const memoryHigh = m.mem.pct >= memoryThreshold;
  if (!cpuHigh && !memoryHigh) {
    highSince = 0;
    highSignature = '';
    return;
  }
  const signature = `${cpuHigh}:${memoryHigh}:${cpuThreshold}:${memoryThreshold}`;
  if (!highSince || signature !== highSignature) {
    highSince = Date.now();
    highSignature = signature;
  }
  if (Date.now() - highSince >= 30000 && Date.now() - highNotifiedAt > 5 * 60 * 1000) {
    highNotifiedAt = Date.now();
    const cpu = Math.round(m.cpu || 0);
    const ram = Math.round(m.mem.pct);
    const exceeded = [];
    if (cpuHigh) exceeded.push(`CPU ${cpu}% (threshold ${cpuThreshold}%)`);
    if (memoryHigh) exceeded.push(`RAM ${ram}% (threshold ${memoryThreshold}%)`);
    notifyEvent('System under load', `${exceeded.join(' and ')} stayed at or above its threshold for 30 seconds. Want me to close a heavy process?`);
  }
}

function taskMinutes(text) {
  let match = text.match(/\bat\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  if (!match) match = text.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const suffix = (match[3] || '').toLowerCase();
  if (suffix === 'pm' && hour < 12) hour += 12;
  if (suffix === 'am' && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

const dueNotified = new Set();

function checkTaskDue() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  for (const task of appState.tasks) {
    if (task.done || task.remindAt != null) continue;
    const at = taskMinutes(task.text);
    if (at == null) continue;
    const key = `${task.id}:${now.toDateString()}:${at}`;
    if (minutes >= at && minutes <= at + 1 && !dueNotified.has(key)) {
      dueNotified.add(key);
      notifyEvent('Task time', `It is time for: ${task.text}`);
    }
  }
}

async function restoreHistory() {
  const saved = await api.getHistory();
  if (!Array.isArray(saved) || !saved.length) return;
  for (const entry of saved) {
    if (!entry || typeof entry.content !== 'string') continue;
    const role = entry.role === 'assistant' ? 'assistant' : 'user';
    chatHistory.push({ role, content: entry.content });
    if (role === 'user') addMessage('user', entry.content);
    else renderMarkdown(entry.content);
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderAttachments() {
  attachStrip.innerHTML = '';
  if (pendingImage) {
    const chip = document.createElement('div');
    chip.className = 'attach-chip';
    const img = document.createElement('img');
    img.src = pendingImage.dataUrl;
    const name = document.createElement('span');
    name.className = 'chip-name';
    name.textContent = 'screen.png';
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = '×';
    x.setAttribute('aria-label', 'Remove screenshot');
    x.addEventListener('click', () => { pendingImage = null; renderAttachments(); });
    chip.append(img, name, x);
    attachStrip.appendChild(chip);
  }
  if (attachedFile) {
    const chip = document.createElement('div');
    chip.className = 'attach-chip';
    const name = document.createElement('span');
    name.className = 'chip-name';
    name.textContent = attachedFile.name + (attachedFile.truncated ? ' (truncated)' : '');
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = '×';
    x.setAttribute('aria-label', 'Remove file');
    x.addEventListener('click', () => { attachedFile = null; renderAttachments(); });
    chip.append(name, x);
    attachStrip.appendChild(chip);
  }
  attachStrip.classList.toggle('show', Boolean(pendingImage || attachedFile));
}

async function captureScreen() {
  screenBtn.classList.add('listening');
  const res = await api.captureScreen();
  screenBtn.classList.remove('listening');
  showView('chat');
  if (!res || !res.ok) {
    addMessage('bot', 'Screen capture failed: ' + ((res && res.error) || 'unknown error'));
    return;
  }
  pendingImage = { dataUrl: res.dataUrl, base64: res.base64 };
  renderAttachments();
  addMessage('bot', 'Screenshot attached. Ask me anything about it, then hit send.');
}

function setDropHot(on) {
  dropHot = on;
  mascotWrap.classList.toggle('drop', on);
}

async function loadDroppedFile(file) {
  if (!file) return;
  const res = await api.readDroppedFile(file);
  if (!res || !res.ok) {
    addMessage('bot', 'Could not load ' + file.name + ': ' + ((res && res.error) || 'unsupported file'));
    return;
  }
  attachedFile = { name: res.name, content: res.content, truncated: res.truncated };
  renderAttachments();
  showView('chat');
  addMessage('bot', 'Loaded ' + res.name + '. Ask me to debug, refactor, or summarize it.');
  bounce();
}

mascotEl.addEventListener('dragenter', (e) => { e.preventDefault(); setDropHot(true); });
mascotEl.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); setDropHot(true); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; });
mascotEl.addEventListener('dragleave', (e) => { if (!mascotEl.contains(e.relatedTarget)) setDropHot(false); });
mascotEl.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDropHot(false);
  const dt = e.dataTransfer;
  if (dt && dt.files && dt.files.length) loadDroppedFile(dt.files[0]);
});
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => e.preventDefault());

function applyAccessory(value) {
  const allowed = ['classic', 'visor', 'wizard', 'coffee', 'headphones'];
  const next = allowed.includes(value) ? value : 'classic';
  appState.settings.accessory = next;
  appEl.dataset.accessory = codingSessionActive ? 'visor' : next;
  syncVibe();
}

function setCodingSession(active) {
  codingSessionActive = Boolean(active);
  appEl.dataset.accessory = codingSessionActive ? 'visor' : appState.settings.accessory;
  codingSessionToggle.setAttribute('aria-pressed', String(codingSessionActive));
  codingSessionToggle.textContent = codingSessionActive ? 'End coding session' : 'Start coding session';
  codingSessionStatus.textContent = codingSessionActive
    ? 'Cyber Visor + headphones are on. Your saved accessory, Do Not Disturb, and focus timer are unchanged.'
    : 'Session is off. Your saved accessory is restored.';
  document.getElementById('setAccessory').disabled = codingSessionActive;
  syncVibe();
}

function syncVibe() {
  const vibing = mediaPlaying || manualPlaying;
  appEl.classList.toggle('vibing', vibing);
  appEl.classList.toggle('headphones-on', vibing || codingSessionActive || appState.settings.accessory === 'headphones');
  if (mediaState) mediaState.textContent = vibing ? 'playing' : 'idle';
  if (mediaPlay) mediaPlay.textContent = vibing ? 'Pause' : 'Play';
}

async function mediaAction(action) {
  if (action === 'playpause') {
    manualPlaying = !manualPlaying;
    mediaPlaying = false;
    await api.mediaKey('playpause');
    syncVibe();
    return;
  }
  await api.mediaKey(action);
}

document.querySelectorAll('[data-media]').forEach((btn) => {
  btn.addEventListener('click', () => {
    noteActivity();
    mediaAction(btn.dataset.media);
  });
});

api.onMedia((state) => {
  if (!state) return;
  mediaPlaying = Boolean(state.playing);
  if (!mediaPlaying) manualPlaying = false;
  syncVibe();
});

screenBtn.addEventListener('click', () => { noteActivity(); captureScreen(); });
screenCaptureSkill.addEventListener('click', () => { noteActivity(); captureScreen(); });

window.addEventListener('beforeunload', () => { if (voiceController) voiceController.stop(); });

window.__mascot = {
  showView,
  startFocus,
  stopFocus,
  isSleeping: () => sleeping,
  sendChat,
  runSkill,
  showThought,
  notifyEvent,
  setThinking,
  renderMetrics,
  captureScreen,
  applyAccessory,
  setMedia: (on) => { manualPlaying = Boolean(on); mediaPlaying = false; syncVibe(); }
};

(async () => {
  requestAnimationFrame(frame);

  const state = await api.getState();
  appState.name = state.name || 'Dellon';
  appState.tasks = state.tasks || [];
  appState.provider = state.provider || 'ollama';
  appState.model = state.model || '';
  appState.baseUrl = state.baseUrl || '';
  appState.ollamaUrl = state.ollamaUrl || 'http://127.0.0.1:11434';
  appState.settings = { ...appState.settings, ...(state.settings || {}) };
  populateVoiceOptions();
  if (window.speechSynthesis) window.speechSynthesis.addEventListener('voiceschanged', populateVoiceOptions);
  appState.autostartError = state.autostartError || '';
  appState.keyStorageError = state.keyStorageError || '';
  if (appState.keyStorageError) flashNote(appState.keyStorageError);
  appState.clipboard = state.clipboard || [];
  appState.workspacePath = state.workspacePath || '';
  appState.weather = state.weather || null;
  appState.city = state.city || appState.weather && appState.weather.place || 'Nairobi';
  appState.weatherLocationEnabled = state.weatherLocationEnabled !== false;
  applySide(state.side);
  renderGreeting();
  updateClock();
  renderTasks();
  renderWeather();
  requestDeviceWeatherLocation();
  updateModelLabel();
  document.body.style.setProperty('--glass', String(appState.settings.opacity));
  applyAccessory(appState.settings.accessory);
  syncVibe();

  await restoreHistory();
  const briefing = buildDailyBriefing(appState.tasks);
  addDailyBriefingCard(briefing);
  showThought(briefing.toast);

  renderMetrics(await api.getMetrics());
  setInterval(renderGreeting, 60000);
  setInterval(updateClock, 1000);
  setInterval(checkTaskDue, 20000);
  setInterval(async () => {
    const w = await api.getWeather();
    if (w) renderWeather(w);
  }, 15 * 60 * 1000);
})();
