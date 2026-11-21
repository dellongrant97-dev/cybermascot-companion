'use strict';

(function attachVoiceApi(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CyberMascotVoice = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createVoiceApi() {
  const FEMALE_VOICE_HINTS = /\b(aria|ava|jenny|zira|sara|susan|michelle|sonia|natasha|hazel|heera|libby|maisie|sophie|female|woman)\b/i;

  function cleanSpeechText(input) {
    return String(input || '')
      .replace(/<think>[\s\S]*?<\/think>/gi, ' ')
      .replace(/<\|(?:im_start|im_sep|im_end|fim_prefix|fim_middle|fim_suffix)\|>/gi, ' ')
      .replace(/\`\`\`[\s\S]*?\`\`\`/g, ' ')
      .replace(/~~~[\s\S]*?~~~/g, ' ')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\((?:[^()]|\([^()]*\))*\)/g, '$1')
      .replace(/https?:\/\/\S+/gi, ' ')
      .replace(/www\.\S+/gi, ' ')
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^\s{0,3}>\s?/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+[.)]\s+/gm, '')
      .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, ' ')
      .replace(/\|/g, ' ')
      .replace(/\`[^\`]*\`/g, ' ')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/<[^>]*>/g, ' ')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ' ')
      .replace(/[^\p{L}\p{N}\p{P}\p{Zs}\n]/gu, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{2,}/g, '. ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .replace(/([,.!?;:])(?=\S)/g, '$1 ')
      .trim();
  }

  function choosePreferredVoice(voices, preferredName = '') {
    const list = Array.isArray(voices) ? voices : [];
    if (preferredName) {
      const exact = list.find((voice) => voice && voice.name === preferredName);
      if (exact) return exact;
    }
    return list.find((voice) => voice && FEMALE_VOICE_HINTS.test(voice.name || '')) ||
      list.find((voice) => voice && /^en/i.test(voice.lang || '')) ||
      list[0] || null;
  }

  function createVoiceController(options = {}) {
    const synthesis = options.synthesis;
    const Utterance = options.Utterance;
    const onState = typeof options.onState === 'function' ? options.onState : () => {};
    let lastText = '';
    let activeUtterance = null;

    function state(value) {
      try { onState(value); } catch (_) {}
    }

    function getVoices() {
      try { return synthesis && typeof synthesis.getVoices === 'function' ? synthesis.getVoices() : []; }
      catch (_) { return []; }
    }

    function speak(text, settings = {}) {
      const cleaned = cleanSpeechText(text);
      if (!cleaned || !synthesis || typeof synthesis.speak !== 'function' || typeof Utterance !== 'function') {
        return { ok: false, error: 'Speech synthesis is unavailable or there is no speakable text.' };
      }
      try {
        synthesis.cancel();
        const utterance = new Utterance(cleaned);
        const voice = choosePreferredVoice(getVoices(), settings.voiceName || '');
        if (voice) utterance.voice = voice;
        utterance.rate = Number.isFinite(settings.rate) ? Math.min(1.3, Math.max(0.7, settings.rate)) : 1;
        utterance.volume = Number.isFinite(settings.volume) ? Math.min(1, Math.max(0, settings.volume)) : 1;
        utterance.onstart = () => state('speaking');
        utterance.onpause = () => state('paused');
        utterance.onresume = () => state('speaking');
        utterance.onend = () => { if (activeUtterance === utterance) activeUtterance = null; state('idle'); };
        utterance.onerror = () => { if (activeUtterance === utterance) activeUtterance = null; state('idle'); };
        activeUtterance = utterance;
        lastText = cleaned;
        synthesis.speak(utterance);
        return { ok: true };
      } catch (error) {
        activeUtterance = null;
        state('idle');
        return { ok: false, error: String((error && error.message) || error) };
      }
    }

    return {
      getVoices,
      speak,
      replay(settings) { return lastText ? speak(lastText, settings) : { ok: false, error: 'There is no previous speech to replay.' }; },
      pause() { if (synthesis && synthesis.speaking && !synthesis.paused) { synthesis.pause(); return true; } return false; },
      resume() { if (synthesis && synthesis.paused) { synthesis.resume(); return true; } return false; },
      stop() { if (synthesis) synthesis.cancel(); activeUtterance = null; state('idle'); },
      isSupported() { return Boolean(synthesis && typeof synthesis.speak === 'function' && typeof Utterance === 'function'); }
    };
  }

  return { cleanSpeechText, choosePreferredVoice, createVoiceController };
});
