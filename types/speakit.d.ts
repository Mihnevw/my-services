declare class Speakit {
  static utteranceRate: number;
  static utterancePitch: number;
  static totalAvailableVoices: number;
  static totalVoices: SpeechSynthesisVoice[];
  
  static getVoices(): Promise<SpeechSynthesisVoice[]>;
  static readText(text: string, lang?: string, nameOfVoice?: string): Promise<void>;
  static isSpeaking(): boolean;
  static isPaused(): boolean;
  static pauseSpeaking(): void;
  static resumeSpeaking(): void;
  static stopSpeaking(): void;
  static TTStest(): string;
  static about(): string;
}

declare global {
  const Speakit: Speakit;
}

declare module 'speakit-js' {
  interface SpeakitStatic {
    init(): Promise<void>;
    readText(text: string, lang?: string): Promise<void>;
    cancel(): void;
    pause(): void;
    resume(): void;
    isSpeaking(): boolean;
    isPaused(): boolean;
  }

  const Speakit: SpeakitStatic;
  export default Speakit;
} 