'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import Speakit from '@/lib/speakit'

export default function LanguageSpeechTest() {
  const { language } = useLanguage()
  const [status, setStatus] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<string[]>([])

  // Test Bulgarian text
  const bulgarianText = "Здравейте! Това е тест на българския глас."
  
  // Bulgarian subtitle phrases from the app
  const bgPhrases = [
    "Създавам красиви, функционални уебсайтове, които помагат на бизнеса да расте.",
    "От концепцията до стартирането, се занимавам с всеки аспект на вашето дигитално присъствие.",
    "Нека работим заедно, за да осъществим вашата визия и да достигнем до вашата аудитория."
  ]
  
  // Test English text
  const englishText = "Hello! This is a test of the English voice."

  const loadVoices = async () => {
    try {
      setStatus('Loading voices...')
      await Speakit.getVoices()
      
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices()
        setAvailableVoices(voices.map(v => `${v.name} (${v.lang})`))
        
        // Check if there's a Bulgarian voice
        const hasBulgarianVoice = voices.some(v => v.lang.includes('bg'))
        setStatus(`Voices loaded successfully! ${hasBulgarianVoice ? '✅ Bulgarian voice found' : '❌ No Bulgarian voice found'}`)
      } else {
        setStatus('Speech synthesis not available')
      }
      
      setIsLoaded(true)
    } catch (error) {
      setStatus(`Error loading voices: ${error}`)
    }
  }

  const speakBulgarian = async () => {
    try {
      setStatus('Speaking Bulgarian...')
      await Speakit.readText(bulgarianText, 'bg-BG')
      setStatus('Bulgarian speech completed')
    } catch (error) {
      setStatus(`Error speaking Bulgarian: ${error}`)
    }
  }
  
  const speakBulgarianPhrase = async (index: number) => {
    try {
      const phrase = bgPhrases[index]
      setStatus(`Speaking Bulgarian phrase ${index + 1}...`)
      await Speakit.readText(phrase, 'bg-BG')
      setStatus(`Bulgarian phrase ${index + 1} completed`)
    } catch (error) {
      setStatus(`Error speaking Bulgarian phrase: ${error}`)
    }
  }

  const speakEnglish = async () => {
    try {
      setStatus('Speaking English...')
      await Speakit.readText(englishText, 'en-US')
      setStatus('English speech completed')
    } catch (error) {
      setStatus(`Error speaking English: ${error}`)
    }
  }

  const speakCurrentLanguage = async () => {
    try {
      const text = language.code === 'bg' ? bulgarianText : englishText
      setStatus(`Speaking in ${language.name}...`)
      await Speakit.readText(text, language.speechCode)
      setStatus(`${language.name} speech completed`)
    } catch (error) {
      setStatus(`Error speaking ${language.name}: ${error}`)
    }
  }

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto my-8 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Speech Synthesis Test</h2>
      
      <div className="mb-4">
        <p>Current language: <strong>{language.name}</strong> ({language.speechCode})</p>
      </div>
      
      <div className="flex flex-col space-y-2 mb-4">
        <button 
          onClick={loadVoices}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load Available Voices
        </button>
        
        <button 
          onClick={speakBulgarian}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!isLoaded}
        >
          Speak Bulgarian
        </button>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <h3 className="font-medium mb-2">Bulgarian Subtitles:</h3>
          <div className="space-y-2">
            {bgPhrases.map((phrase, index) => (
              <button 
                key={index}
                onClick={() => speakBulgarianPhrase(index)}
                className="w-full px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-left text-sm"
                disabled={!isLoaded}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={speakEnglish}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-2"
          disabled={!isLoaded}
        >
          Speak English
        </button>
        
        <button 
          onClick={speakCurrentLanguage}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          disabled={!isLoaded}
        >
          Speak Current Language
        </button>
      </div>
      
      <div className="p-2 bg-gray-100 rounded">
        <p className="font-medium">Status: {status}</p>
      </div>
      
      {availableVoices.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Available Voices ({availableVoices.length}):</h3>
          <div className="max-h-40 overflow-y-auto p-2 bg-gray-50 rounded text-sm">
            <ul className="list-disc pl-5">
              {availableVoices.map((voice, index) => (
                <li key={index}>{voice}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 