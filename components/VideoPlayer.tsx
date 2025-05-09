'use client'

import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'
import { useLanguage } from '@/contexts/language-context'

interface Subtitle {
  start: number
  end: number
  text: string
}

export default function VideoPlayerWithTTS({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const lastSubtitleIndex = useRef(-1)
  const lastSpokenTimeRef = useRef<number>(0)
  const COOLDOWN_MS = 100 // Reduced cooldown to ensure smoother transitions
  const { speak, cancel, isLoaded } = useTextToSpeech()
  const { language, t } = useLanguage()

  // Load and parse subtitles based on current language
  useEffect(() => {
    const subtitleFile = language.code === 'bg' ? '/subtitles_bg.vtt' : '/subtitles.vtt'
    
    fetch(subtitleFile)
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n')
        const parsedSubtitles: Subtitle[] = []
        let i = 0

        while (i < lines.length) {
          // Skip WEBVTT header
          if (lines[i].trim() === 'WEBVTT') {
            i++
            continue
          }

          // Parse timestamp line
          const timestampMatch = lines[i].match(/(\d+):(\d+):(\d+)\.(\d+)\s+-->\s+(\d+):(\d+):(\d+)\.(\d+)/)
          if (timestampMatch) {
            const startHours = Number.parseInt(timestampMatch[1])
            const startMinutes = Number.parseInt(timestampMatch[2])
            const startSeconds = Number.parseInt(timestampMatch[3])
            const startMilliseconds = Number.parseInt(timestampMatch[4])

            const endHours = Number.parseInt(timestampMatch[5])
            const endMinutes = Number.parseInt(timestampMatch[6])
            const endSeconds = Number.parseInt(timestampMatch[7])
            const endMilliseconds = Number.parseInt(timestampMatch[8])

            const startTime = startHours * 3600 + startMinutes * 60 + startSeconds + startMilliseconds / 1000
            const endTime = endHours * 3600 + endMinutes * 60 + endSeconds + endMilliseconds / 1000

            // Get the subtitle text
            i++
            let subtitleText = ""
            while (i < lines.length && lines[i].trim() && !lines[i].includes("-->")) {
              subtitleText += (subtitleText ? " " : "") + lines[i].trim()
              i++
            }

            parsedSubtitles.push({
              start: startTime,
              end: endTime,
              text: subtitleText,
            })
          } else {
            i++
          }
        }
        setSubtitles(parsedSubtitles)
      })
      .catch(error => console.error('Error loading subtitles:', error))
  }, [language])

  // Initialize video.js
  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      console.log('✅ videoRef is ready:', videoRef.current)
      const options = {
        sources: [{ src: '/intro.mp4', type: 'video/mp4' }],
        controls: true,
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          playbackRateMenuButton: true,
        },
        html5: {
          vhs: {
            overrideNative: true
          }
        }
      }
      playerRef.current = videojs(videoRef.current, options)
      console.log('🎬 video.js player initialized')
    }

    // Clean up on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [src])

  // Update subtitles when language changes
  useEffect(() => {
    if (videoRef.current && playerRef.current) {
      // Remove existing tracks
      const tracks = videoRef.current.getElementsByTagName('track')
      while (tracks.length > 0) {
        videoRef.current.removeChild(tracks[0])
      }

      // Add subtitle track for current language
      const track = document.createElement('track')
      track.kind = 'subtitles'
      track.label = language.code === 'bg' ? 'Български' : 'English'
      track.srclang = language.code
      track.src = language.code === 'bg' ? '/subtitles_bg.vtt' : '/subtitles.vtt'
      track.default = true
      videoRef.current.appendChild(track)
    }
  }, [language, subtitles])

  // Handle subtitle reading
  useEffect(() => {
    if (!playerRef.current || subtitles.length === 0 || !isLoaded) return

    const player = playerRef.current

    const handleTimeUpdate = () => {
      const currentTime = player.currentTime()
      const currentSubtitle = subtitles.find((subtitle, index) => {
        if (currentTime >= subtitle.start && currentTime <= subtitle.end && lastSubtitleIndex.current !== index) {
          lastSubtitleIndex.current = index
          return true
        }
        return false
      })

      if (currentSubtitle) {
        const now = Date.now()
        if (now - lastSpokenTimeRef.current >= COOLDOWN_MS) {
          cancel() // Cancel any ongoing speech
          speak(currentSubtitle.text, language.speechCode)
          lastSpokenTimeRef.current = now
        }
      }
    }

    const handlePlay = () => {
      lastSubtitleIndex.current = -1
      lastSpokenTimeRef.current = 0
    }

    const handlePause = () => {
      cancel()
    }

    const handleEnded = () => {
      cancel()
      lastSubtitleIndex.current = -1
      lastSpokenTimeRef.current = 0
    }

    player.on('timeupdate', handleTimeUpdate)
    player.on('play', handlePlay)
    player.on('pause', handlePause)
    player.on('ended', handleEnded)

    return () => {
      player.off('timeupdate', handleTimeUpdate)
      player.off('play', handlePlay)
      player.off('pause', handlePause)
      player.off('ended', handleEnded)
      cancel()
    }
  }, [subtitles, speak, cancel, isLoaded])

  return (
    <div data-vjs-player className="w-full max-w-4xl mx-auto my-8">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-theme-fantasy"
        playsInline
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white">{t('speechEnabled')}</p>
        </div>
      )}
    </div>
  )
}
