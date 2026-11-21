const CDP = require('chrome-remote-interface');
CDP.List({ port: 9222 }).then(list => console.log(list.map(t => t.type + ' | ' + t.url).join('\n'))).catch(e => console.error('CDP_ERROR', e.message));
