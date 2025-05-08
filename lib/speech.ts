// // lib/speech.ts
// export class SpeechManager {
//   private utterance: SpeechSynthesisUtterance | null = null

//   speak(text: string) {
//     if (!window.speechSynthesis) return

//     this.cancel() // Stop any ongoing speech first
//     this.utterance = new SpeechSynthesisUtterance(text)
//     this.utterance.lang = "en-US"
//     this.utterance.rate = 1
//     window.speechSynthesis.speak(this.utterance)
//   }

//   cancel() {
//     if (window.speechSynthesis && window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel()
//     }
//     this.utterance = null
//   }
// }
