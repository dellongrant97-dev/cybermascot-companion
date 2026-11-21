'use strict';
const CDP = require('chrome-remote-interface');
(async () => {
  const t = await CDP.List({ port: 9222 });
  const p = t.find(x => x.type === 'page' && x.url.includes('renderer.html'));
  const c = await CDP({ target: p, port: 9222 });
  const { Runtime } = c;
  await Runtime.enable();
  const r = await Runtime.evaluate({ expression: 'window.__mascot ? Object.keys(window.__mascot).join(",") : "UNDEFINED"', returnByValue: true });
  console.log('KEYS:', r.result.value);
  const ex = await Runtime.evaluate({ expression: 'typeof showThought', returnByValue: true });
  console.log('showThought:', ex.result.value);
  process.exit(0);
})();