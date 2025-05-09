/**
 * SpeechManager class to handle text-to-speech functionality
 * using the Web Speech API with proper handling of browser quirks
 */
export class SpeechManager {
    private synth: SpeechSynthesis | null = null
    private utterance: SpeechSynthesisUtterance | null = null
    private messageQueue: string[] = []
    private speaking = false
    private paused = false
    private voiceIndex = 0
    private language = "en-US" // Default language
  
    constructor(language = "en-US") {
      if (typeof window !== "undefined") {
        this.synth = window.speechSynthesis
        this.language = language
  
        // Initialize with default voice
        this.loadVoices()
  
        // Handle the case where voices aren't loaded immediately
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = this.loadVoices.bind(this)
        }
      }
    }
  
    private loadVoices(): void {
      if (!this.synth) return
  
      // Get available voices
      const voices = this.synth.getVoices()
  
      // Try to find a voice for the current language
      const languageVoice = voices.findIndex((voice) => voice.lang.includes(this.language.substring(0, 2)))
  
      // Set voice index (use language-specific if available, otherwise first voice)
      this.voiceIndex = languageVoice !== -1 ? languageVoice : 0
    }
  
    /**
     * Set the language for speech synthesis
     */
    public setLanguage(language: string): void {
      this.language = language
      this.loadVoices()
    }
  
    /**
     * Get available voices for the current language
     */
    public getVoices(): SpeechSynthesisVoice[] {
      if (!this.synth) return []
  
      const voices = this.synth.getVoices()
      const langCode = this.language.substring(0, 2).toLowerCase()
  
      // Filter voices by language
      const langVoices = voices.filter((voice) => voice.lang.toLowerCase().includes(langCode))
  
      // Return language-specific voices or all voices if none found
      return langVoices.length > 0 ? langVoices : voices
    }
  
    /**
     * Speak the provided text
     */
    public speak(text: string): void {
      if (!this.synth) return
  
      // Cancel any current speech
      this.cancel()
  
      // Create a new utterance
      this.utterance = new SpeechSynthesisUtterance(text)
  
      // Set language
      this.utterance.lang = this.language
  
      // Set voice if available
      const voices = this.synth.getVoices()
      if (voices.length > 0) {
        this.utterance.voice = voices[this.voiceIndex]
      }
  
      // Set properties
      this.utterance.rate = 1.0
      this.utterance.pitch = 1.0
      this.utterance.volume = 1.0
  
      // Handle events
      this.utterance.onstart = () => {
        this.speaking = true
  
        // Chrome bug workaround: speech can stop after ~15 seconds
        // Keep the speech synthesis active with a periodic restart
        this.startKeepAlive()
      }
  
      this.utterance.onend = () => {
        this.speaking = false
        this.stopKeepAlive()
  
        // Process next item in queue if any
        if (this.messageQueue.length > 0) {
          const nextText = this.messageQueue.shift()
          if (nextText) this.speak(nextText)
        }
      }
  
      this.utterance.onerror = (event) => {
        console.error("SpeechSynthesis error:", event)
        this.speaking = false
        this.stopKeepAlive()
      }
  
      // Start speaking
      this.synth.speak(this.utterance)
  
      // Firefox sometimes doesn't start speaking unless we do this
      if (this.synth.paused) {
        this.synth.resume()
      }
    }
  
    /**
     * Cancel current speech
     */
    public cancel(): void {
      if (!this.synth) return
  
      this.messageQueue = []
      this.stopKeepAlive()
  
      this.synth.cancel()
      this.speaking = false
      this.paused = false
    }
  
    /**
     * Pause speech
     */
    public pause(): void {
      if (!this.synth || !this.speaking) return
  
      this.synth.pause()
      this.paused = true
    }
  
    /**
     * Resume speech
     */
    public resume(): void {
      if (!this.synth || !this.paused) return
  
      this.synth.resume()
      this.paused = false
    }
  
    /**
     * Queue text to be spoken after current speech finishes
     */
    public queue(text: string): void {
      this.messageQueue.push(text)
  
      // If not currently speaking, start with this text
      if (!this.speaking) {
        const nextText = this.messageQueue.shift()
        if (nextText) this.speak(nextText)
      }
    }
  
    /**
     * Chrome has a bug where speech synthesis stops after about 15 seconds
     * This is a workaround to keep it active
     */
    private keepAliveInterval: number | null = null
  
    private startKeepAlive(): void {
      this.stopKeepAlive()
  
      // Every 10 seconds, pause and resume speech synthesis to keep it active
      this.keepAliveInterval = window.setInterval(() => {
        if (this.synth && this.speaking && !this.paused) {
          this.synth.pause()
          this.synth.resume()
        }
      }, 10000)
    }
  
    private stopKeepAlive(): void {
      if (this.keepAliveInterval !== null) {
        clearInterval(this.keepAliveInterval)
        this.keepAliveInterval = null
      }
    }
  }
  