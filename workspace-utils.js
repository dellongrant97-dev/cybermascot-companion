'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function getWorkspaceRoot(workspacePath) {
  if (!workspacePath) throw new Error('Choose a workspace folder first.');
  const root = fs.realpathSync(workspacePath);
  if (!fs.statSync(root).isDirectory()) throw new Error('The selected workspace is not a folder.');
  return root;
}

function resolveWorkspaceFile(relativePath, root) {
  const value = String(relativePath || '');
  if (!root) throw new Error('Choose a workspace folder first.');
  if (!value || path.isAbsolute(value)) throw new Error('Choose a file inside the selected workspace.');
  const absolute = path.resolve(root, value);
  const relative = path.relative(root, absolute);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error('File path is outside the selected workspace.');
  }
  const realPath = fs.realpathSync(absolute);
  const realRelative = path.relative(root, realPath);
  if (realRelative === '..' || realRelative.startsWith(`..${path.sep}`) || path.isAbsolute(realRelative)) {
    throw new Error('File resolves outside the selected workspace.');
  }
  if (!fs.statSync(realPath).isFile()) throw new Error('Selected path is not a file.');
  return { absolute: realPath, relative: realRelative.split(path.sep).join('/') };
}

function isSensitiveWorkspaceFile(relativePath) {
  const base = path.basename(relativePath).toLowerCase();
  return base === '.env' || base.startsWith('.env.') ||
    /^(?:credentials?|secrets?|private-key|id_rsa|id_ed25519)(?:[._-]|$)/i.test(base) ||
    /\.(pem|p12|pfx|key|keystore|secret)$/i.test(base);
}

function workspaceTextFile(relativePath) {
  if (isSensitiveWorkspaceFile(relativePath)) return false;
  return /\.(txt|md|markdown|json|jsonc|csv|tsv|log|js|mjs|cjs|ts|tsx|jsx|py|rb|go|rs|java|c|h|cpp|hpp|cs|css|scss|sass|less|html|htm|xml|svg|yml|yaml|toml|ini|cfg|conf|sh|bash|ps1|sql|gitignore|editorconfig)$/i.test(relativePath);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

module.exports = {
  getWorkspaceRoot,
  resolveWorkspaceFile,
  isSensitiveWorkspaceFile,
  workspaceTextFile,
  sha256
};
