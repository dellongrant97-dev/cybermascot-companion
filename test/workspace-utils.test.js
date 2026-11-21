'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const {
  getWorkspaceRoot,
  resolveWorkspaceFile,
  isSensitiveWorkspaceFile,
  workspaceTextFile,
  sha256
} = require('../workspace-utils');

test('workspace root validation canonicalizes directories and rejects invalid roots', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-root-'));
  const workspace = path.join(tempRoot, 'workspace');
  const file = path.join(tempRoot, 'not-a-folder.txt');
  fs.mkdirSync(workspace);
  fs.writeFileSync(file, 'file');
  try {
    assert.equal(getWorkspaceRoot(workspace), fs.realpathSync(workspace));
    assert.throws(() => getWorkspaceRoot(''), /Choose a workspace folder/);
    assert.throws(() => getWorkspaceRoot(file), /not a folder/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('workspace file resolution accepts local files and rejects traversal and symlink escapes', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cybermascot-paths-'));
  const workspace = path.join(tempRoot, 'workspace');
  const outside = path.join(tempRoot, 'outside');
  fs.mkdirSync(workspace);
  fs.mkdirSync(outside);
  const localFile = path.join(workspace, 'notes.txt');
  const outsideFile = path.join(outside, 'secret.txt');
  fs.writeFileSync(localFile, 'local');
  fs.writeFileSync(outsideFile, 'private');
  fs.symlinkSync(outside, path.join(workspace, 'linked'), 'junction');
  try {
    const root = getWorkspaceRoot(workspace);
    const resolved = resolveWorkspaceFile('notes.txt', root);
    assert.equal(resolved.absolute, fs.realpathSync(localFile));
    assert.equal(resolved.relative, 'notes.txt');
    assert.throws(() => resolveWorkspaceFile('../outside/secret.txt', root), /outside the selected workspace/);
    assert.throws(() => resolveWorkspaceFile(outsideFile, root), /Choose a file inside/);
    assert.throws(() => resolveWorkspaceFile('linked/secret.txt', root), /resolves outside/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('workspace text policy excludes sensitive paths and SHA-256 hashes UTF-8 content', () => {
  for (const name of ['.env', '.env.production', 'credentials.json', 'secret.txt', 'private-key.pem', 'id_rsa', 'token.key']) {
    assert.equal(isSensitiveWorkspaceFile(name), true, `${name} should be sensitive`);
    assert.equal(workspaceTextFile(name), false, `${name} should not be coding context`);
  }
  assert.equal(workspaceTextFile('src/app.ts'), true);
  assert.equal(workspaceTextFile('image.png'), false);
  assert.equal(sha256('hello'), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
});
