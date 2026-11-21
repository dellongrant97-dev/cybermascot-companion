'use strict';
const CDP = require('chrome-remote-interface');
(async () => {
  const t = await CDP.List({ port: 9222 });
  const p = t.find(x => x.type === 'page' && x.url.includes('renderer.html'));
  const c = await CDP({ target: p, port: 9222 });
  const { Runtime } = c;
  await Runtime.enable();
  const r = await Runtime.evaluate({ expression: 'document.readyState', returnByValue: true });
  console.log('ready:', r.result.value);
  const ex = await Runtime.evaluate({ expression: 'document.getElementById("setPerf") ? "found" : "MISSING"', returnByValue: true });
  console.log('setPerf:', ex.result.value);
  const err = await Runtime.evaluate({ expression: 'window.__mascot ? Object.keys(window.__mascot).join(",") : "UNDEFINED"', returnByValue: true });
  console.log('mascot:', err.result.value);
  const html = await Runtime.evaluate({ expression: 'document.getElementById("setDnd") ? "found" : "MISSING"', returnByValue: true });
  console.log('setDnd:', html.result.value);
  process.exit(0);
})();