/**
 * SpeakSmart Kids - Web Speech & Speech Recognition Engine
 * Provides Text-To-Speech (TTS) for character voices and Speech-To-Text (STT) for interactive speaking practice.
 */

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.selectedVoice = null;
    this.recognition = null;
    this.isListening = false;

    this.initTTS();
    this.initSTT();
  }

  initTTS() {
    if (!this.synth) return;
    const updateVoices = () => {
      this.voices = this.synth.getVoices();
      // Prefer friendly English voices (e.g. Google US English, Samantha, Natural)
      this.selectedVoice = this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')))
        || this.voices.find(v => v.lang.startsWith('en'))
        || this.voices[0];
    };

    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  // Speak text with child-friendly pitch & rate
  speak(text, pitch = 1.2, rate = 0.9, onEndCallback = null) {
    if (!this.synth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      if (onEndCallback) onEndCallback();
    };

    this.synth.speak(utterance);
  }

  initSTT() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  // Start listening to child's speech input
  listen(onResultCallback, onErrorCallback, onEndCallback) {
    if (!this.recognition) {
      console.warn("Web SpeechRecognition API not supported on this browser.");
      if (onErrorCallback) onErrorCallback("not_supported");
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      const isFinal = event.results[event.results.length - 1].isFinal;
      if (onResultCallback) {
        onResultCallback(transcript.trim().toLowerCase(), isFinal);
      }
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      this.isListening = false;
      if (onErrorCallback) onErrorCallback(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEndCallback) onEndCallback();
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      console.warn("Could not start speech recognition:", e);
      if (onErrorCallback) onErrorCallback(e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

export const speech = new SpeechEngine();
