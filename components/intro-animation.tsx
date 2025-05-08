"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useThemeColor } from "@/contexts/theme-color-context"
import Image from "next/image"
import Speakit from "@/lib/speakit"

// Define subtitle type
type Subtitle = {
  start: number // in seconds
  end: number // in seconds
  text: string
}

export default function IntroAnimation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [progress, setProgress] = useState(0)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(-1)
  const videoRef = useRef<HTMLDivElement>(null)
  const { currentColor } = useThemeColor()
  const lastSpokenTimeRef = useRef<number>(0)
  const COOLDOWN_MS = 100 // Reduced cooldown to ensure smoother transitions

  const totalDuration = 30 // seconds

  // Initialize Speakit
  useEffect(() => {
    if (typeof window !== "undefined") {
      Speakit.getVoices().catch(error => {
        console.error("Failed to initialize Speakit:", error)
      })
    }
  }, [])

  // Load and parse VTT file
  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const response = await fetch("/subtitles.vtt")
        const text = await response.text()
        const parsedSubtitles = parseVTT(text)
        setSubtitles(parsedSubtitles)
      } catch (error) {
        console.error("Failed to load subtitles:", error)
        // Fallback to hardcoded subtitles if VTT file can't be loaded
        setSubtitles([
          { start: 0, end: 10, text: "I create beautiful, functional websites that help businesses grow." },
          { start: 10, end: 20, text: "From concept to launch, I handle every aspect of your digital presence." },
          { start: 20, end: 30, text: "Let's work together to bring your vision to life and reach your audience." },
        ])
      }
    }

    fetchSubtitles()
  }, [])

  // Animation and subtitle display logic
  useEffect(() => {
    let animationFrame: number
    let startTime: number
    let lastSubtitleIndex = -1

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const elapsedTotal = timestamp - startTime
      const progressPercent = Math.min((elapsedTotal / (totalDuration * 1000)) * 100, 100)
      const currentTimeInSeconds = elapsedTotal / 1000

      setProgress(progressPercent)

      // Find the current subtitle based on elapsed time
      const subtitleIndex = subtitles.findIndex(
        (sub) => currentTimeInSeconds >= sub.start && currentTimeInSeconds < sub.end
      )

      // If we found a subtitle and it's different from the current one
      if (subtitleIndex !== -1 && subtitleIndex !== lastSubtitleIndex) {
        lastSubtitleIndex = subtitleIndex
        setCurrentSubtitleIndex(subtitleIndex)
        setDisplayText(subtitles[subtitleIndex].text)

        // Speak the subtitle if speech is enabled
        if (isSpeechEnabled) {
          const now = Date.now()
          if (now - lastSpokenTimeRef.current >= COOLDOWN_MS) {
            Speakit.readText(subtitles[subtitleIndex].text).catch(error => {
              console.error("Failed to speak text:", error)
            })
            lastSpokenTimeRef.current = now
          }
        }
      } else if (subtitleIndex === -1 && lastSubtitleIndex !== -1) {
        // No subtitle for current time
        lastSubtitleIndex = -1
        setCurrentSubtitleIndex(-1)
        setDisplayText("")
      }

      // Continue animation if not complete
      if (progressPercent < 100 && isPlaying) {
        animationFrame = requestAnimationFrame(animate)
      } else if (progressPercent >= 100) {
        setIsPlaying(false)
        Speakit.stopSpeaking()
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, subtitles, isSpeechEnabled, totalDuration])

  const togglePlay = () => {
    if (progress >= 100) {
      // Reset if completed
      setProgress(0)
      setCurrentSubtitleIndex(-1)
      setDisplayText("")
      lastSpokenTimeRef.current = 0
    }

    if (!isPlaying && isSpeechEnabled && currentSubtitleIndex !== -1) {
      // If we're starting playback and speech is enabled, speak the current subtitle
      Speakit.readText(subtitles[currentSubtitleIndex].text).catch(error => {
        console.error("Failed to speak text:", error)
      })
    } else if (isPlaying) {
      // If we're pausing, cancel any ongoing speech
      Speakit.stopSpeaking()
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleSpeech = () => {
    if (isSpeechEnabled) {
      // Cancel speech when disabling
      Speakit.stopSpeaking()
    } else if (!isSpeechEnabled && isPlaying && currentSubtitleIndex !== -1) {
      // Start speaking current subtitle when enabling during playback
      Speakit.readText(subtitles[currentSubtitleIndex].text).catch(error => {
        console.error("Failed to speak text:", error)
      })
    }

    setIsSpeechEnabled(!isSpeechEnabled)
  }

  // Parse VTT file content
  const parseVTT = (vttContent: string): Subtitle[] => {
    const lines = vttContent.trim().split("\n")
    const parsedSubtitles: Subtitle[] = []

    // Skip the WEBVTT header
    let i = 1
    while (i < lines.length) {
      // Skip empty lines
      if (!lines[i].trim()) {
        i++
        continue
      }

      // Parse timestamp line (e.g., "00:00:01.000 --> 00:00:05.000")
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

        // Get the subtitle text (may span multiple lines)
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

    return parsedSubtitles
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Introduction
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
              What I Do & How I Can Help
            </h2>
            <div className="h-1 w-20 bg-gradient-1 mx-auto rounded-full mb-6"></div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div ref={videoRef} className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            {/* Video simulation container */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
              {/* Background image (visible when not playing) */}
              {!isPlaying && (
                <div className="absolute inset-0 z-10">
                  <div className="relative w-full h-full">
                    <Image
                      src="/placeholder.svg?height=720&width=1280"
                      alt="Web development workspace"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/70"></div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full p-8 transition-all duration-300 transform hover:scale-110 group"
                        aria-label="Play video"
                      >
                        <Play size={40} className="group-hover:text-blue-400 transition-colors" />
                      </button>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <h3 className="text-white text-2xl md:text-3xl font-bold px-4">
                        Discover How I Can Transform Your Online Presence
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Animated background elements (visible when playing) */}
              <div className={`absolute inset-0 overflow-hidden opacity-20 ${!isPlaying && "hidden"}`}>
                <div
                  className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse-slow"
                  style={{ background: currentColor.primary }}
                ></div>
                <div
                  className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
                  style={{ background: currentColor.secondary, animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse-slow"
                  style={{ background: currentColor.accent, animationDelay: "2s" }}
                ></div>
              </div>

              {/* Text content (visible when playing) */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                  <div className="text-center">
                    <h3 className="text-white text-2xl md:text-4xl font-bold mb-6 min-h-[120px] flex items-center justify-center">
                      {displayText}
                      <span
                        className={`ml-1 inline-block w-2 h-8 bg-white ${isPlaying ? "animate-pulse" : "opacity-0"}`}
                      ></span>
                    </h3>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 z-30">
                <div
                  className="h-full transition-all duration-300 ease-linear"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, ${currentColor.secondary}, ${currentColor.primary})`,
                  }}
                ></div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
                {isPlaying && (
                  <>
                    <button
                      onClick={togglePlay}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <div className="text-white/80 text-sm">
                      {Math.floor((progress / 100) * totalDuration)}s / {totalDuration}s
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={toggleMute}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>

                      <button
                        onClick={toggleSpeech}
                        className={`${
                          isSpeechEnabled ? "bg-blue-600/70" : "bg-white/20"
                        } hover:bg-white/30 text-white rounded-full p-2 transition-colors`}
                        aria-label={isSpeechEnabled ? "Disable speech" : "Enable speech"}
                      >
                        {isSpeechEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Speech status indicator */}
        {isSpeechEnabled && (
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
            <Mic className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Text-to-speech is enabled. Subtitles will be spoken aloud.
          </div>
        )}
      </div>
    </section>
  )
}
