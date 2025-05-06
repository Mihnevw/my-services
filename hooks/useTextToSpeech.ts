import { useEffect, useRef, useState } from 'react'

export default function useTextToSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [voicesLoaded, setVoicesLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance()
    utterance.rate = 1
    utterance.pitch = 1

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return // Гарантира, че гласове реално има

      let selectedVoice = voices.find(v =>
        /Google|Microsoft|Samantha/i.test(v.name)
      )
      if (!selectedVoice) selectedVoice = voices[0]
      if (selectedVoice) {
        utterance.voice = selectedVoice
        utterance.lang = selectedVoice.lang
      }
      utteranceRef.current = utterance
      setVoicesLoaded(true)
    }

    // Ако гласовете не са заредени още — ще се извикат когато са готови
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    } else {
      loadVoices()
    }
  }, [])

  const speak = (text: string) => {
    if (!utteranceRef.current || !voicesLoaded) return
    if (!text?.trim()) {
      console.warn(' Няма текст за четене')
      return
    }

    console.log(' Говори се:', text)
    window.speechSynthesis.cancel()
    // Create a fresh utterance so it can be spoken multiple times
    const utter = new SpeechSynthesisUtterance(text)
    utter.voice = utteranceRef.current.voice
    utter.rate = utteranceRef.current.rate
    utter.pitch = utteranceRef.current.pitch
    utter.lang = utteranceRef.current.lang
    window.speechSynthesis.speak(utter)
  }

  return speak
}
