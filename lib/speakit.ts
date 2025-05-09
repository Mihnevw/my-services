class Speakit {
  private static voices: SpeechSynthesisVoice[] = [];
  private static currentVoice: SpeechSynthesisVoice | null = null;
  private static isInitialized = false;
  private static manualVoiceMap: Record<string, string> = {};

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
        
        // Debug available voices
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        
        // Initialize manual voice mapping for languages that might not have native support
        this.setupVoiceMappings();
        
        this.isInitialized = true;
        resolve();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          console.log('Voices loaded:', this.voices.map(v => `${v.name} (${v.lang})`));
          
          this.currentVoice = this.voices.find(voice => 
            voice.lang.includes('en-GB') && voice.name.includes('Google')
          ) || this.voices[0];
          
          // Initialize manual voice mapping
          this.setupVoiceMappings();
          
          this.isInitialized = true;
          resolve();
        };
      }
    });
  }

  // Transliterate Bulgarian text to Latin characters for better pronunciation with non-Bulgarian voices
  private static transliterateBulgarian(text: string): string {
    const transliterationMap: Record<string, string> = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
      'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
      'ь': '', 'ю': 'yu', 'я': 'ya',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh',
      'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
      'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
      'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sht', 'Ъ': 'A',
      'Ь': '', 'Ю': 'Yu', 'Я': 'Ya'
    };

    // Replace each character according to the map
    let transliterated = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      transliterated += transliterationMap[char] || char;
    }

    return transliterated;
  }

  // Set up manual voice mappings for languages with limited support
  private static setupVoiceMappings() {
    // Check if we have a Bulgarian voice
    const hasBulgarianVoice = this.voices.some(v => v.lang.includes('bg'));
    
    if (!hasBulgarianVoice) {
      console.log('No Bulgarian voice found, setting up fallbacks');
      
      // Try to find voices that might work well for Bulgarian
      // In order of preference:
      
      // 1. Try to find a Slavic language voice (Russian, Serbian, Croatian, etc.)
      const slavicVoice = this.voices.find(v => 
        v.lang.startsWith('ru') || v.lang.startsWith('sr') || 
        v.lang.startsWith('hr') || v.lang.startsWith('sl') ||
        v.lang.startsWith('cs') || v.lang.startsWith('pl')
      );
      
      if (slavicVoice) {
        this.manualVoiceMap['bg'] = slavicVoice.name;
        this.manualVoiceMap['bg-BG'] = slavicVoice.name;
        console.log(`Using ${slavicVoice.name} (${slavicVoice.lang}) as Bulgarian fallback`);
        return;
      }
      
      // 2. Try to find a Microsoft voice (they usually have better support for non-English)
      const microsoftVoice = this.voices.find(v => v.name.includes('Microsoft'));
      
      if (microsoftVoice) {
        this.manualVoiceMap['bg'] = microsoftVoice.name;
        this.manualVoiceMap['bg-BG'] = microsoftVoice.name;
        console.log(`Using ${microsoftVoice.name} (${microsoftVoice.lang}) as Bulgarian fallback`);
        return;
      }
      
      // 3. Last resort, just use the default voice
      if (this.currentVoice) {
        this.manualVoiceMap['bg'] = this.currentVoice.name;
        this.manualVoiceMap['bg-BG'] = this.currentVoice.name;
        console.log(`Using default voice ${this.currentVoice.name} as Bulgarian fallback`);
      }
    }
  }

  static async readText(text: string, lang: string = 'en-GB', voiceName?: string): Promise<void> {
    if (typeof window === 'undefined') return;

    if (!this.isInitialized) {
      await this.getVoices();
    }

    return new Promise((resolve, reject) => {
      try {
        // Create a copy of the original text
        let finalText = text;
        
        // Check if we need to transliterate Bulgarian text
        const isBulgarian = lang.startsWith('bg');
        const hasBulgarianVoice = this.voices.some(v => v.lang.includes('bg'));
        
        // If it's Bulgarian text but we don't have a Bulgarian voice, transliterate the text
        if (isBulgarian && !hasBulgarianVoice) {
          console.log('No Bulgarian voice available, transliterating text');
          const originalText = finalText;
          finalText = this.transliterateBulgarian(finalText);
          console.log(`Transliterated Bulgarian text: "${originalText}" → "${finalText}"`);
        }
        
        const utterance = new SpeechSynthesisUtterance(finalText);
        utterance.lang = lang;
        console.log(`Setting speech lang to: ${lang}`);

        // Debug: Log all available voices for this language
        const availableVoicesForLang = this.voices.filter(v => 
          v.lang.startsWith(lang.split('-')[0]) || 
          v.lang.includes(lang.split('-')[0])
        );
        console.log(`Available voices for ${lang}:`, 
          availableVoicesForLang.map(v => `${v.name} (${v.lang})`)
        );

        // Check if we have a manual mapping for this language
        if (lang.startsWith('bg') && this.manualVoiceMap[lang]) {
          const mappedVoiceName = this.manualVoiceMap[lang];
          const mappedVoice = this.voices.find(v => v.name === mappedVoiceName);
          
          if (mappedVoice) {
            utterance.voice = mappedVoice;
            console.log(`Using mapped voice for Bulgarian: ${mappedVoice.name} (${mappedVoice.lang})`);
            
            // If using a non-Bulgarian voice, adjust lang to match the voice for better pronunciation
            if (!mappedVoice.lang.includes('bg')) {
              utterance.lang = mappedVoice.lang;
              console.log(`Adjusting language to match voice: ${mappedVoice.lang}`);
            }
          }
        } else {
          // Try to find a matching voice for the language
          let matchedVoice = null;
          
          if (lang.startsWith('bg')) {
            // Special handling for Bulgarian
            matchedVoice = this.voices.find(v => v.lang.includes('bg'));
            
            // If no Bulgarian voice found, try a more generic approach
            if (!matchedVoice) {
              // Try Microsoft voices which sometimes work better for Eastern European languages
              matchedVoice = this.voices.find(v => v.name.includes('Microsoft') && (
                v.lang.includes('bg') || v.lang.includes('ru') || v.lang.includes('sl')
              ));
            }
          } else {
            // Standard approach for other languages
            matchedVoice = this.voices.find(v => 
              v.lang.startsWith(lang.split('-')[0]) && v.name.includes('Google')
            );
          }
          
          // Fallback to any voice matching the language
          if (!matchedVoice) {
            matchedVoice = this.voices.find(v => v.lang.startsWith(lang.split('-')[0]));
          }
          
          if (matchedVoice) {
            utterance.voice = matchedVoice;
            console.log(`Using voice: ${matchedVoice.name} (${matchedVoice.lang}) for language: ${lang}`);
          } else {
            console.warn(`No matching voice found for language: ${lang}, using default voice`);
          }
        }

        // Use specified voice if provided
        if (voiceName) {
          const voice = this.voices.find(v => v.name === voiceName);
          if (voice) {
            utterance.voice = voice;
            console.log(`Using specified voice: ${voice.name} (${voice.lang})`);
          }
        } else if (this.currentVoice && !utterance.voice) {
          utterance.voice = this.currentVoice;
          console.log(`Using default voice: ${this.currentVoice.name} (${this.currentVoice.lang})`);
        }

        // Force the rate to be slightly slower for Bulgarian to improve comprehension
        if (lang.startsWith('bg')) {
          utterance.rate = 0.85; // Even slower for better pronunciation
          utterance.pitch = 1.0; // Normal pitch
        }

        utterance.onend = () => resolve();
        utterance.onerror = (error) => {
          console.error('Speech synthesis error:', error);
          reject(error);
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Failed to speak text:', error);
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
    
    // Check if we have a manual mapping for this language
    if (lang.startsWith('bg') && this.manualVoiceMap[lang]) {
      const mappedVoiceName = this.manualVoiceMap[lang];
      const mappedVoice = this.voices.find(v => v.name === mappedVoiceName);
      
      if (mappedVoice) {
        this.currentVoice = mappedVoice;
        console.log(`Using mapped voice for language ${lang}: ${mappedVoice.name} (${mappedVoice.lang})`);
        return;
      }
    }
    
    // Find a matching voice for this language
    let voice = null;
    
    // Special handling for Bulgarian
    if (lang.startsWith('bg')) {
      voice = this.voices.find(v => v.lang.includes('bg'));
      
      if (!voice) {
        // Try Microsoft voices
        voice = this.voices.find(v => v.name.includes('Microsoft') && (
          v.lang.includes('bg') || v.lang.includes('ru') || v.lang.includes('sl')
        ));
      }
    } else {
      voice = this.voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }
    
    if (voice) {
      this.currentVoice = voice;
      console.log(`Language set to ${lang} with voice ${voice.name} (${voice.lang})`);
    } else {
      console.warn(`No voice found for language: ${lang}`);
    }
  }

  static setVoice(voiceName: string): void {
    if (typeof window === 'undefined') return;
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
      console.log(`Voice set to: ${voice.name} (${voice.lang})`);
    }
  }
}

export default Speakit; 