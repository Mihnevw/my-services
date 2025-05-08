class Speakit {
  private static voices: SpeechSynthesisVoice[] = [];
  private static currentVoice: SpeechSynthesisVoice | null = null;
  private static isInitialized = false;

  static async getVoices(): Promise<void> {
    if (typeof window === 'undefined') return;

    if (this.isInitialized) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        this.voices = voices;
        this.currentVoice = voices.find(voice => 
          voice.lang.includes('en-GB') && voice.name.includes('Google')
        ) || voices[0];
        this.isInitialized = true;
        resolve();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          this.currentVoice = this.voices.find(voice => 
            voice.lang.includes('en-GB') && voice.name.includes('Google')
          ) || this.voices[0];
          this.isInitialized = true;
          resolve();
        };
      }
    });
  }

  static async readText(text: string, lang: string = 'en-GB', voiceName?: string): Promise<void> {
    if (typeof window === 'undefined') return;

    if (!this.isInitialized) {
      await this.getVoices();
    }

    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        if (voiceName) {
          const voice = this.voices.find(v => v.name === voiceName);
          if (voice) {
            utterance.voice = voice;
          }
        } else if (this.currentVoice) {
          utterance.voice = this.currentVoice;
        }

        utterance.onend = () => resolve();
        utterance.onerror = (error) => reject(error);

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  static stopSpeaking(): void {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
  }

  static pauseSpeaking(): void {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.pause();
  }

  static resumeSpeaking(): void {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.resume();
  }

  static setLanguage(lang: string): void {
    if (typeof window === 'undefined') return;
    // Implementation for language setting if needed
  }

  static setVoice(voiceName: string): void {
    if (typeof window === 'undefined') return;
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
    }
  }
}

export default Speakit; 