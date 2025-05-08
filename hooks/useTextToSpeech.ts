import { useEffect, useState, useRef, useCallback } from 'react'
import Speakit from '@/lib/speakit'

// TypeScript declarations for Speakit.js
declare global {
  interface Window {
    Speakit: {
      getVoices: () => string[]
      readText: (text: string, voice?: string) => Promise<void>
      stopSpeaking: () => void
      pauseSpeaking: () => void
      resumeSpeaking: () => void
      setLanguage: (lang: string) => void
      setVoice: (voice: string) => void
    }
  }
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void
  cancel: () => void
  pause: () => void
  resume: () => void
  isSpeaking: boolean
  isPaused: boolean
  setLanguage: (lang: string) => void
  setVoice: (voice: string) => void
  availableVoices: string[]
  currentVoice: string | null
  isLoaded: boolean
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  // State
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentVoice, setCurrentVoice] = useState<string | null>(null)
  const [availableVoices, setAvailableVoices] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Refs
  const speechQueueRef = useRef<string[]>([])
  const isProcessingRef = useRef(false)
  const lastSpokenRef = useRef<string>("")
  const lastSpokenTimeRef = useRef<number>(0)
  const COOLDOWN_MS = 500 // 500ms cooldown between speeches

  // Initialize Speakit
  useEffect(() => {
    if (typeof window === 'undefined') return

    Speakit.getVoices()
      .then(() => {
        console.log('[useTextToSpeech] Speakit initialized successfully')
        setIsLoaded(true)
      })
      .catch(error => {
        console.error('[useTextToSpeech] Failed to initialize Speakit:', error)
        setIsLoaded(false)
      })
  }, [])

  // Process queue
  const processQueue = useCallback(() => {
    if (!isLoaded || isProcessingRef.current || speechQueueRef.current.length === 0) return

    isProcessingRef.current = true
    const text = speechQueueRef.current[0]

    // Check if this text was recently spoken
    const now = Date.now()
    if (text === lastSpokenRef.current && now - lastSpokenTimeRef.current < COOLDOWN_MS) {
      console.log('[useTextToSpeech] Skipping recently spoken text:', text)
      speechQueueRef.current.shift()
      isProcessingRef.current = false
      processQueue() // Process next item
      return
    }

    console.log('[useTextToSpeech] Processing queue item:', text)
    Speakit.readText(text)
      .then(() => {
        console.log('[useTextToSpeech] Speech completed successfully')
        lastSpokenRef.current = text
        lastSpokenTimeRef.current = Date.now()
        speechQueueRef.current.shift()
        isProcessingRef.current = false
        setIsSpeaking(false)
        processQueue() // Process next item
      })
      .catch((err) => {
        console.error('[useTextToSpeech] Speech error:', err)
        speechQueueRef.current.shift()
        isProcessingRef.current = false
        setIsSpeaking(false)
        processQueue() // Process next item
      })

    setIsSpeaking(true)
    setIsPaused(false)
  }, [isLoaded])

  // Speak function
  const speak = useCallback((text: string) => {
    console.log('[useTextToSpeech] Speaking text:', text)
    if (!text?.trim()) {
      console.warn('[useTextToSpeech] Empty text provided')
      return
    }

    // Check if text is already in queue
    if (speechQueueRef.current.includes(text)) {
      console.log('[useTextToSpeech] Text already in queue, skipping:', text)
      return
    }

    // Check if text was recently spoken
    const now = Date.now()
    if (text === lastSpokenRef.current && now - lastSpokenTimeRef.current < COOLDOWN_MS) {
      console.log('[useTextToSpeech] Text recently spoken, skipping:', text)
      return
    }

    // Add to queue
    speechQueueRef.current.push(text)
    console.log('[useTextToSpeech] Added to queue, current queue:', speechQueueRef.current)

    // If nothing is currently speaking, start processing
    if (!isSpeaking) {
      processQueue()
    }
  }, [isSpeaking, processQueue])

  // Cancel function
  const cancel = useCallback(() => {
    console.log('[useTextToSpeech] Canceling speech')
    Speakit.stopSpeaking()
    speechQueueRef.current = [] // Clear queue
    isProcessingRef.current = false
    setIsSpeaking(false)
    setIsPaused(false)
    lastSpokenRef.current = ""
    lastSpokenTimeRef.current = 0
  }, [])

  // Pause function
  const pause = useCallback(() => {
    console.log('[useTextToSpeech] Pausing speech')
    setIsPaused(true)
  }, [])

  // Resume function
  const resume = useCallback(() => {
    console.log('[useTextToSpeech] Resuming speech')
    setIsPaused(false)
  }, [])

  // Set language function
  const setLanguage = useCallback((lang: string) => {
    console.log('[useTextToSpeech] Setting language:', lang)
  }, [])

  // Set voice function
  const setVoice = useCallback((voice: string) => {
    console.log('[useTextToSpeech] Setting voice:', voice)
    setCurrentVoice(voice)
  }, [])

  return {
    speak,
    cancel,
    pause,
    resume,
    isSpeaking,
    isPaused,
    setLanguage,
    setVoice,
    availableVoices,
    currentVoice,
    isLoaded
  }
}
