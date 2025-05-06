"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Subtitles } from "lucide-react"
import AnimatedSection from "./animated-section"
import { useThemeColor } from "@/contexts/theme-color-context"
import i18n from "@/lib/i18n"
import useTextToSpeech from "@/hooks/useTextToSpeech"

export default function IntroAnimation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [pendingSpeech, setPendingSpeech] = useState<string | null>(null)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showBackground, setShowBackground] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { currentColor } = useThemeColor()
  const speak = useTextToSpeech()

  const introTexts = [
    "I create beautiful, functional websites that help businesses grow.",
    "From concept to launch, I handle every aspect of your digital presence.",
    "Let's work together to bring your vision to life and reach your audience.",
  ]

  // Initialize speech synthesis and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const setupVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        const roboticVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') || 
          voice.name.includes('Samantha')
        )
        if (roboticVoice) {
          const speechRef = new SpeechSynthesisUtterance()
          speechRef.voice = roboticVoice
          setVoicesLoaded(true)
        }
      }

      if (window.speechSynthesis.getVoices().length > 0) {
        setupVoices()
      } else {
        window.speechSynthesis.onvoiceschanged = setupVoices
      }
    }
  }, [])

  // Handle video loading and initialization
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedMetadata = () => {
        setVideoDuration(Math.floor(video.duration))
        setIsVideoReady(true)
        setPlaybackRate(video.playbackRate)
      }

      const handleCanPlay = () => {
        setIsVideoReady(true)
      }

      // Handle playback rate changes
      const handleRateChange = () => {
        setPlaybackRate(video.playbackRate)
      }

      // Handle subtitle cue changes
      const handleCueChange = (event: Event) => {
        const track = event.target as TextTrack
        if (track.activeCues && track.activeCues.length > 0) {
          const cue = track.activeCues[0] as VTTCue
          console.log('[CueChange] Cue:', cue.text, {
            showSubtitles,
            hasUserInteracted,
            documentHidden: document.hidden,
            voicesLoaded,
            windowSpeech: !!window.speechSynthesis
          })
          if (cue && showSubtitles && hasUserInteracted && !document.hidden) {
            speak(cue.text)
          } else {
            console.log('[CueChange] Conditions not met for speech')
          }
        }
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('ratechange', handleRateChange)

      // Always (re)attach cuechange handler and set track mode on mount and when showSubtitles changes
      const textTrack = video.textTracks[0]
      if (textTrack) {
        textTrack.mode = showSubtitles ? 'showing' : 'hidden'
        textTrack.removeEventListener('cuechange', handleCueChange)
        textTrack.addEventListener('cuechange', handleCueChange)
      }

      if (video.readyState >= 2) {
        handleLoadedMetadata()
      }

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('ratechange', handleRateChange)
        if (textTrack) {
          textTrack.removeEventListener('cuechange', handleCueChange)
        }
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel()
        }
      }
    }
  }, [isMuted, showSubtitles, voicesLoaded, hasUserInteracted])

  // If voices load after a cue was missed, speak it
  useEffect(() => {
    if (voicesLoaded && pendingSpeech && hasUserInteracted && !document.hidden) {
      console.log('[Effect] Speaking pending speech:', pendingSpeech)
      speak(pendingSpeech)
      setPendingSpeech(null)
    } else if (pendingSpeech) {
      console.log('[Effect] Pending speech not spoken, conditions not met:', {
        voicesLoaded,
        pendingSpeech,
        windowSpeech: !!window.speechSynthesis,
        hasUserInteracted,
        documentHidden: document.hidden
      })
    }
  }, [voicesLoaded, pendingSpeech, hasUserInteracted])

  useEffect(() => {
    if (!isVideoReady) return

    let animationFrame: number
    let startTime: number
    let textStartTime: number
    let currentIndex = 0
    const typingSpeed = 50 // ms per character

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (!textStartTime) textStartTime = timestamp

      // Update current time based on video's actual time
      if (videoRef.current) {
        const currentVideoTime = videoRef.current.currentTime
        setCurrentTime(Math.floor(currentVideoTime))
        const progressPercent = (currentVideoTime / videoDuration) * 100
        setProgress(progressPercent)
      }

      const elapsedText = timestamp - textStartTime
      const textIndex = Math.min(Math.floor((currentTime / videoDuration) * introTexts.length), introTexts.length - 1)

      if (textIndex !== currentIndex) {
        currentIndex = textIndex
        setCurrentTextIndex(currentIndex)
        textStartTime = timestamp
        setDisplayText("")
      }

      if (currentIndex >= 0 && currentIndex < introTexts.length) {
        const currentFullText = introTexts[currentIndex]
        if (currentFullText) {
          const charactersToShow = Math.min(Math.floor(elapsedText / typingSpeed), currentFullText.length)
          const newDisplayText = currentFullText.substring(0, charactersToShow)
          if (newDisplayText !== displayText) {
            setDisplayText(newDisplayText)
          }
        }
      }

      if (currentTime < videoDuration && isPlaying) {
        animationFrame = requestAnimationFrame(animate)
      } else if (currentTime >= videoDuration) {
        // Pause the video at the end so UI and speech sync correctly
        videoRef.current?.pause()
        setIsPlaying(false)
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel()
        }
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isPlaying, introTexts, videoDuration, isMuted, showSubtitles, isVideoReady])

  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
      // Unmute the video for audio playback
      setIsMuted(false)
      // Resume speech synthesis context
      window.speechSynthesis?.resume()
    }
  }

  // Speak the current active subtitle cue via speechSynthesis
  const speakCurrentCue = () => {
    const track = videoRef.current?.textTracks[0]
    const cue = track?.activeCues?.[0] as VTTCue | undefined
    if (cue) {
      speak(cue.text)
    }
  }

  // When i18n finishes initializing, speak the current cue (e.g. on first load)
  useEffect(() => {
    const initHandler = () => speakCurrentCue()
    i18n.on('initialized', initHandler)
    return () => {
      i18n.off('initialized', initHandler)
    }
  }, [])

  const togglePlay = () => {
    window.speechSynthesis?.resume()
    handleUserInteraction()
    if (!isVideoReady || !videoRef.current) return

    // If video ended, reset to start on next play
    if (!isPlaying && currentTime >= videoDuration) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
      setProgress(0)
      setCurrentTextIndex(0)
      setDisplayText("")
      setShowBackground(true)
    }

    const newPlaying = !isPlaying
    setIsPlaying(newPlaying)
    if (newPlaying) {
      // Initialize and resume audio context
      const audioCtx = new AudioContext()
      audioCtx.resume()
      videoRef.current.play()
      setShowBackground(false)
      speakCurrentCue()
    } else {
      videoRef.current.pause()
      window.speechSynthesis?.cancel()
    }
  }

  const toggleMute = () => {
    handleUserInteraction()
    setIsMuted(!isMuted)
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const toggleSubtitles = () => {
    handleUserInteraction()
    setShowSubtitles((prev) => {
      const newShow = !prev
      // Hide or show the native subtitle track
      const video = videoRef.current
      if (video && video.textTracks && video.textTracks[0]) {
        video.textTracks[0].mode = newShow ? 'showing' : 'hidden'
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      return newShow
    })
  }

  // Cancel speech if tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Keyboard controls for rewind/forward
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVideoReady || !videoRef.current) return
      if (e.key === 'ArrowLeft') {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
      } else if (e.key === 'ArrowRight') {
        videoRef.current.currentTime = Math.min(videoDuration, videoRef.current.currentTime + 5)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVideoReady, videoDuration])

  // Clickable progress bar
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isVideoReady || !videoRef.current) return
    const rect = (e.target as HTMLDivElement).getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = clickX / rect.width
    const newTime = percent * videoDuration
    videoRef.current.currentTime = newTime
    setCurrentTime(Math.floor(newTime))
    setProgress(percent * 100)
  }

  // Sync speech with subtitles after seeking or time changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleSyncSpeech = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      speakCurrentCue()
    }
    video.addEventListener('seeked', handleSyncSpeech)
    return () => {
      video.removeEventListener('seeked', handleSyncSpeech)
    }
  }, [isMuted, showSubtitles, hasUserInteracted, voicesLoaded])

  // Speak typed text segments on each segment change while playing
  useEffect(() => {
    if (isPlaying && voicesLoaded && hasUserInteracted && !document.hidden) {
      speak(introTexts[currentTextIndex])
    }
  }, [currentTextIndex, isPlaying, voicesLoaded, hasUserInteracted])

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
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl aspect-video">
            {/* Background image */}
            <div 
              className={`absolute inset-0 transition-opacity duration-1000 ${
                showBackground ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: 'url("/background.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors transform hover:scale-110"
                  aria-label="Play video"
                >
                  <Play size={40} />
                </button>
              </div>
            </div>

            {/* Real video */}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                showBackground ? 'opacity-0' : 'opacity-100'
              }`}
              muted={isMuted}
              playsInline
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
              <track
                default
                kind="subtitles"
                srcLang="en"
                label="English"
                src="/subtitles.vtt"
              />
            </video>

            {/* Animated colored background blurs */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
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

            {/* Typing text */}
            {showSubtitles && (
              <div className="absolute inset-0 flex items-center justify-center p-8 z-10 bg-black/30">
                <h3 className="text-white text-2xl md:text-4xl font-bold mb-6 min-h-[120px] flex items-center justify-center">
                  {displayText}
                  <span className={`ml-1 inline-block w-2 h-8 bg-white ${isPlaying ? "animate-pulse" : "opacity-0"}`}></span>
                </h3>
              </div>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 z-20">
              <div
                className="h-full transition-all duration-300 ease-linear"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${currentColor.secondary}, ${currentColor.primary})`,
                }}
                onClick={handleProgressBarClick}
              ></div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <div className="text-white/80 text-sm">
                {currentTime}s / {videoDuration}s
              </div>

              <div className="flex gap-2">
                <button
                  onClick={toggleSubtitles}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                  aria-label={showSubtitles ? "Hide subtitles" : "Show subtitles"}
                >
                  <Subtitles size={20} className={showSubtitles ? "text-blue-400" : ""} />
                </button>

                <button
                  onClick={toggleMute}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
