'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { cleanSpeechText, choosePreferredVoice, createVoiceController } = require('../voice');

test('cleanSpeechText removes hidden reasoning, code blocks, URLs, and markdown', () => {
  const result = cleanSpeechText('## Hello **there**\nA [useful link](https://example.com)\n\n<think>private reasoning</think>\n\n```js\nsecretCode()\n```\nVisit https://example.com');
  assert.match(result, /Hello there/);
  assert.match(result, /useful link/);
  assert.doesNotMatch(result, /private reasoning|secretCode|https:\/\//);
});

test('choosePreferredVoice prefers an explicitly selected voice, then a female-named voice', () => {
  const voices = [{ name: 'Microsoft David', lang: 'en-US' }, { name: 'Microsoft Zira', lang: 'en-US' }];
  assert.equal(choosePreferredVoice(voices).name, 'Microsoft Zira');
  assert.equal(choosePreferredVoice(voices, 'Microsoft David').name, 'Microsoft David');
});

test('voice controller supports speech, pause, resume, replay, and stop', () => {
  const calls = [];
  class FakeUtterance { constructor(text) { this.text = text; } }
  const synthesis = {
    speaking: true, paused: false,
    getVoices: () => [{ name: 'Microsoft Zira', lang: 'en-US' }],
    speak: (utterance) => calls.push(['speak', utterance]),
    cancel: () => calls.push(['cancel']),
    pause() { this.paused = true; },
    resume() { this.paused = false; }
  };
  const states = [];
  const controller = createVoiceController({ synthesis, Utterance: FakeUtterance, onState: (state) => states.push(state) });
  assert.equal(controller.speak('Hello **world**').ok, true);
  assert.equal(calls.at(-1)[1].text, 'Hello world');
  controller.pause();
  assert.equal(synthesis.paused, true);
  controller.resume();
  assert.equal(synthesis.paused, false);
  controller.replay();
  assert.equal(calls.filter((call) => call[0] === 'speak').length, 2);
  controller.stop();
  assert.ok(states.includes('idle'));
});
