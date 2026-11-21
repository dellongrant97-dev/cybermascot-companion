'use strict';

const CDP = require('chrome-remote-interface');

(async () => {
  const targets = await CDP.List({ port: 9222 });
  const page = targets.find((t) => t.type === 'page' && t.url.includes('renderer.html'));
  if (!page) throw new Error('renderer page not found');

  const client = await CDP({ target: page, port: 9222 });
  const { Runtime, Input } = client;
  await Runtime.enable();

  const errors = [];
  Runtime.exceptionThrown((e) => {
    errors.push(`${e.exceptionDetails.text} ${(e.exceptionDetails.exception && e.exceptionDetails.exception.description) || ''}`.trim());
  });

  const evaluate = async (expression) => {
    const r = await Runtime.evaluate({ expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const poll = async (expression, test, timeout = 9000) => {
    const started = Date.now();
    let value = null;
    while (Date.now() - started < timeout) {
      value = await evaluate(expression);
      if (test(value)) return value;
      await wait(250);
    }
    return value;
  };
  const results = [];
  const check = (name, ok, detail) => results.push({ name, ok, detail });

  await wait(1400);
  const savedIdle = await evaluate("(async () => { const r = await window.companion.getSettings(); await window.companion.setSettings({ settings: { idleMinutes: 0 } }); return r.settings.idleMinutes; })()");
  await evaluate('window.companion.wake()');
  await poll('[innerWidth, innerHeight]', (v) => Array.isArray(v) && v[0] > 800, 6000);
  await evaluate("document.getElementById('app').classList.remove('collapsed')");
  await wait(400);

  check('greeting rendered', await evaluate("document.getElementById('greeting').textContent.length > 3"), await evaluate("document.getElementById('greeting').textContent"));
  check('date rendered', await evaluate("document.getElementById('dateLine').textContent.length > 3"), await evaluate("document.getElementById('dateLine').textContent"));

  const layout = await evaluate(`(() => {
    const bubble = document.querySelector('.bubble').getBoundingClientRect();
    const side = document.querySelector('.side').getBoundingClientRect();
    const mascot = document.querySelector('.mascot').getBoundingClientRect();
    return { w: innerWidth, h: innerHeight, bubble: { x: Math.round(bubble.x), w: Math.round(bubble.width) }, chat: { x: Math.round(side.x), w: Math.round(side.width) }, mascot: { x: Math.round(mascot.x), w: Math.round(mascot.width) } };
  })()`);
  const ordered = (layout.chat.x < layout.bubble.x && layout.bubble.x < layout.mascot.x) || (layout.mascot.x < layout.chat.x && layout.chat.x < layout.bubble.x);
  check('layout order chat<bubble<mascot', ordered, JSON.stringify(layout));

  const metricsCount = await evaluate("document.getElementById('metrics').children.length");
  check('metrics cells', metricsCount === 4, `count=${metricsCount}`);

  const menuOpenExpr = `(() => ({ open: document.getElementById('modelMenu').classList.contains('open'), text: document.getElementById('modelList').textContent.trim() }))()`;
  await evaluate("document.getElementById('modelBtn').click()");
  let menuState = await poll(menuOpenExpr, (v) => v && v.open === true && v.text && !v.text.includes('looking for local models'), 12000);
  if (!menuState || !menuState.open || menuState.text.includes('looking for local models')) {
    await evaluate("document.getElementById('modelBtn').click()");
    await wait(200);
    await evaluate("document.getElementById('modelBtn').click()");
    menuState = await poll(menuOpenExpr, (v) => v && v.open === true && v.text && !v.text.includes('looking for local models'), 12000);
  }
  check('model menu opens', Boolean(menuState && menuState.open), menuState && menuState.text);
  check('model menu graceful when ollama down', Boolean(menuState && menuState.text.length > 20 && !menuState.text.includes('looking for local models')), menuState && menuState.text);
  await evaluate("document.getElementById('modelBtn').click()");

  await evaluate(`(() => {
    const input = document.getElementById('taskInput');
    input.value = 'Review UI mockups';
    document.getElementById('taskForm').dispatchEvent(new Event('submit', { cancelable: true }));
  })()`);
  await wait(700);
  const taskText = await evaluate("document.getElementById('taskList').textContent");
  check('task added via quick add', taskText.includes('Review UI mockups'), taskText.replace(/\s+/g, ' ').slice(0, 120));

  await evaluate(`(() => {
    const input = document.getElementById('chatInput');
    input.value = 'hello there';
    document.getElementById('chatForm').dispatchEvent(new Event('submit', { cancelable: true }));
  })()`);
  const chatState = await poll(
    `(() => ({ text: document.getElementById('messages').textContent, bots: document.querySelectorAll('#messages .msg.bot:not(.typing)').length }))()`,
    (v) => v && v.text.includes('hello there') && (v.text.includes('Request failed') || v.text.includes('cannot reach') || v.text.includes('Start Ollama') || v.bots >= 2),
    60000
  );
  const chatText = chatState ? chatState.text : '';
  check('chat user message shown', chatText.includes('hello there'), '');
  check('chat reply or fallback shown', Boolean(chatState && (chatState.bots >= 2 || chatText.includes('Request failed') || chatText.includes('cannot reach') || chatText.includes('Start Ollama'))), chatText.slice(-180).replace(/\s+/g, ' '));

  const historyRows = await evaluate('window.companion.getHistory()');
  check('chat history persisted to disk', Array.isArray(historyRows) && historyRows.some((h) => h.content && h.content.includes('hello there')), `messages=${historyRows.length}`);

  const tabs = await evaluate(`(() => {
    document.querySelector('.tab[data-view="skills"]').click();
    const skills = document.getElementById('viewSkills');
    const cards = skills.querySelectorAll('.skill-card').length;
    const visible = skills.classList.contains('active');
    document.querySelector('.tab[data-view="chat"]').click();
    return { visible, cards };
  })()`);
  check('skills tab shows cards', tabs.visible && tabs.cards >= 6, JSON.stringify(tabs));

  const settingsState = await evaluate(`(() => {
    document.getElementById('settingsBtn').click();
    const open = document.getElementById('viewSettings').classList.contains('active');
    const fields = ['setIdle', 'setCity', 'setUnit', 'setProvider', 'setModel', 'setTop', 'setLogin', 'setOpacity', 'setNotify', 'setClock', 'setAccessory', 'setBaseUrl', 'setPerf', 'clearMemory'].every((id) => document.getElementById(id));
    return { open, fields };
  })()`);
  const providerState = await evaluate(`(() => ({
    gemini: Array.from(document.getElementById('setProvider').options).some((o) => o.value === 'gemini'),
    baseUrl: document.getElementById('setBaseUrl').value
  }))()`);
  check('gemini provider and base url available', Boolean(providerState && providerState.gemini && providerState.baseUrl.length > 10), JSON.stringify(providerState));
  check('settings tab renders controls', settingsState.open && settingsState.fields, JSON.stringify(settingsState));

  const opacityApplied = await evaluate(`(() => {
    const el = document.getElementById('setOpacity');
    el.value = '65';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return getComputedStyle(document.body).getPropertyValue('--glass').trim();
  })()`);
  check('opacity slider applies live', opacityApplied === '0.65', opacityApplied);

  await evaluate(`(() => { document.getElementById('setOpacity').value = '55'; document.querySelector('.tab[data-view="chat"]').click(); })()`);

  const notifyState = await evaluate(`(async () => {
    const el = document.getElementById('setNotify');
    el.checked = true;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    window.__mascot.showThought('Test notification bubble');
    await new Promise((r) => setTimeout(r, 350));
    const shown = document.getElementById('thoughtPop').classList.contains('show');
    const text = document.getElementById('thoughtPop').textContent;
    const st = await window.companion.getSettings();
    document.getElementById('thoughtPop').classList.remove('show');
    return { shown, text, enabled: st.settings.notifications };
  })()`);
  const perfState = await evaluate(`(() => {
    const el = document.getElementById('setPerf');
    el.checked = true;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    const on = document.body.classList.contains('perf');
    el.checked = false;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return { on, off: !document.body.classList.contains('perf') };
  })()`);
  check('performance mode toggles glass', Boolean(perfState && perfState.on && perfState.off), JSON.stringify(perfState));

  check('notification bubble works', Boolean(notifyState && notifyState.shown && notifyState.enabled !== false), JSON.stringify(notifyState));

  const clockState = await evaluate(`(async () => {
    const el = document.getElementById('setClock');
    el.value = '24';
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 500));
    const clock = document.getElementById('clock');
    const visible24 = !clock.classList.contains('hidden') && /^\\d{2}:\\d{2}$/.test(clock.textContent);
    el.value = 'off';
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 250));
    const hidden = clock.classList.contains('hidden');
    el.value = '24';
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return { visible24, hidden };
  })()`);
  check('local time toggle drives clock', Boolean(clockState && clockState.visible24 && clockState.hidden), JSON.stringify(clockState));

  const ring = await evaluate(`(() => {
    window.__mascot.startFocus();
    const active = document.getElementById('focusRing').classList.contains('active');
    const label = document.getElementById('focusBtn').textContent;
    window.__mascot.stopFocus(false);
    return { active, label };
  })()`);
  check('focus timer starts with ring', ring.active && ring.label === 'Stop', JSON.stringify(ring));

  const thinkState = await evaluate(`(async () => {
    window.__mascot.setThinking(true);
    await new Promise((r) => setTimeout(r, 700));
    const active = document.querySelector('.mascot-wrap').classList.contains('thinking');
    const dots = document.querySelector('.thought-dots').classList.contains('thinking');
    const tf = document.getElementById('eyesGroup').style.transform;
    window.__mascot.setThinking(false);
    await new Promise((r) => setTimeout(r, 300));
    return { active, dots, tf };
  })()`);
  check('thinking state tilts eyes and dots', Boolean(thinkState && thinkState.active && thinkState.dots && thinkState.tf.includes('rotate')), JSON.stringify(thinkState));

  const glowState = await evaluate(`(() => {
    const wrap = document.querySelector('.mascot-wrap');
    const read = () => getComputedStyle(wrap).getPropertyValue('--glow-color').trim();
    window.__mascot.renderMetrics({ cpu: 12, mem: { usedGb: 4, totalGb: 16, pct: 25 }, battery: null, disk: null, at: Date.now() });
    const calm = read();
    window.__mascot.renderMetrics({ cpu: 75, mem: { usedGb: 8, totalGb: 16, pct: 50 }, battery: null, disk: null, at: Date.now() });
    const busy = read();
    window.__mascot.renderMetrics({ cpu: 95, mem: { usedGb: 15, totalGb: 16, pct: 95 }, battery: null, disk: null, at: Date.now() });
    const stressed = read();
    const strained = wrap.classList.contains('stressed');
    window.__mascot.renderMetrics({ cpu: 10, mem: { usedGb: 3, totalGb: 16, pct: 20 }, battery: null, disk: null, at: Date.now() });
    return { calm, busy, stressed, strained };
  })()`);
  const procs = await evaluate('window.companion.topProcesses()');
  const procNames = procs && procs.list ? procs.list.map((p) => p.name).join(', ') : '';
  const procSafe = Boolean(procs && procs.ok && procs.list.length <= 8 && !procs.list.some((p) => /^(svchost|system|dwm|explorer|csrss|wininit|lsass)$/i.test(String(p.name).replace(/\.exe$/i, '')) || /electron/i.test(String(p.name))));
  check('process list is safe and capped', procSafe, procNames);

  const guard = await evaluate('window.companion.cleanupProcesses([4])');
  check('cleanup refuses protected pids', Boolean(guard && guard.ok && guard.closed === 0), JSON.stringify(guard));

  const shot = await evaluate('window.companion.captureScreen()');
  check('screen capture returns compressed jpeg', Boolean(shot && shot.ok && /^data:image\/jpeg;base64,/.test(shot.dataUrl) && shot.width <= 1280 && shot.base64.length < 900000), shot && shot.ok ? shot.width + 'x' + shot.height + ' ' + Math.round(shot.base64.length / 1024) + 'KB' : (shot && shot.error));

  const fileRead = await evaluate(`(async () => {
    const arbitraryPathReader = typeof window.companion.readFile === 'function';
    const syntheticFile = new File(['not from disk'], 'package.json', { type: 'text/plain' });
    const result = await window.companion.readDroppedFile(syntheticFile);
    return { arbitraryPathReader, acceptedSyntheticFile: Boolean(result && result.ok) };
  })()`);
  check('file reader requires a native dropped file', !fileRead.arbitraryPathReader && !fileRead.acceptedSyntheticFile, JSON.stringify(fileRead));

  const access = await evaluate(`(async () => {
    window.__mascot.applyAccessory('wizard');
    await new Promise((r) => setTimeout(r, 500));
    const wizard = getComputedStyle(document.getElementById('accHat')).opacity;
    window.__mascot.applyAccessory('headphones');
    const locked = document.getElementById('app').classList.contains('headphones-on');
    window.__mascot.applyAccessory('classic');
    return { wizard, locked };
  })()`);
  check('accessory skins apply', Boolean(access && Number(access.wizard) > 0.9 && access.locked), JSON.stringify(access));

  const vibe = await evaluate(`(async () => {
    window.__mascot.setMedia(true);
    await new Promise((r) => setTimeout(r, 700));
    const app = document.getElementById('app');
    const vibing = app.classList.contains('vibing');
    const phones = app.classList.contains('headphones-on');
    const notes = getComputedStyle(document.querySelector('.notes')).opacity;
    window.__mascot.setMedia(false);
    await new Promise((r) => setTimeout(r, 300));
    return { vibing, phones, notes };
  })()`);
  check('media vibe drives headphones and notes', Boolean(vibe && vibe.vibing && vibe.phones && Number(vibe.notes) > 0.2), JSON.stringify(vibe));

  check('ambient glow tracks load', Boolean(glowState && glowState.calm.includes('180, 240, 255') && glowState.busy.includes('255, 190, 60') && glowState.stressed.includes('255, 85, 85') && glowState.strained), JSON.stringify(glowState));

  await evaluate('window.companion.wake()');
  await wait(700);
  await evaluate("document.getElementById('app').classList.remove('collapsed')");
  await wait(400);

  const mascotBox = await evaluate(`(() => { const r = document.getElementById('mascot').getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) }; })()`);
  await Input.dispatchMouseEvent({ type: 'mouseMoved', x: mascotBox.x, y: mascotBox.y });
  await wait(120);
  const clickMascot = async () => {
    await Input.dispatchMouseEvent({ type: 'mousePressed', x: mascotBox.x, y: mascotBox.y, button: 'left', clickCount: 1 });
    await wait(70);
    await Input.dispatchMouseEvent({ type: 'mouseReleased', x: mascotBox.x, y: mascotBox.y, button: 'left', clickCount: 1 });
    await wait(450);
  };

  const collapsedExpr = "document.getElementById('app').classList.contains('collapsed')";
  const clickUntil = async (want) => {
    for (let i = 0; i < 3; i += 1) {
      const cls = await evaluate(collapsedExpr);
      if (cls === want) return true;
      await clickMascot();
      await poll(collapsedExpr, (v) => v === want, 3000);
    }
    return (await evaluate(collapsedExpr)) === want;
  };

  check('click mascot collapses panels', await clickUntil(true), '');
  check('click mascot expands panels', await clickUntil(false), '');

  await evaluate('window.companion.sleep()');
  const asleep = await poll("document.getElementById('app').classList.contains('sleeping')", (v) => v === true, 3000);
  check('sleep mode engages', asleep === true, '');
  await wait(900);
  await evaluate('window.companion.wake()');
  const awake = await poll("document.getElementById('app').classList.contains('sleeping')", (v) => v === false, 3000);
  check('wake restores panels', awake === false, '');
  await wait(700);

  const expression = await evaluate("document.getElementById('eyesGroup').style.transform || 'none'");
  check('eye transform active', expression.includes('scale'), expression);

  await evaluate(`(async () => {
    const state = await window.companion.getState();
    for (const t of (state.tasks || []).filter((x) => x.text === 'Review UI mockups')) await window.companion.removeTask(t.id);
  })()`);

  const memoryState = await evaluate(`(async () => {
    const before = (await window.companion.getHistory()).length;
    const hasTest = (await window.companion.getHistory()).some((h) => typeof h.content === 'string' && h.content.includes('hello there'));
    if (hasTest) {
      document.getElementById('clearMemory').click();
      await new Promise((r) => setTimeout(r, 400));
    }
    const after = (await window.companion.getHistory()).length;
    return { before, after, hasTest };
  })()`);
  check('clear memory resets history', !memoryState.hasTest || memoryState.after === 0, JSON.stringify(memoryState));

  await evaluate(`window.companion.setSettings({ settings: { idleMinutes: ${savedIdle} } })`);

  check('no renderer exceptions', errors.length === 0, errors.join(' | '));

  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  [${r.detail}]` : ''}`);
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  await client.close();
  process.exit(failed ? 1 : 0);
})().catch((err) => {
  console.error('VERIFY_ERROR', err);
  process.exit(2);
});
