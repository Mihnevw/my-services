'use client'

import React, { useRef, useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  options?: any
  className?: string
}

export default function VideoPlayer({ src, options = {}, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const defaultOptions: any = {
        sources: [{ src, type: 'video/mp4' }],
        controls: true,
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          playbackRateMenuButton: true,
        },
      }
      playerRef.current = videojs(videoRef.current, { ...defaultOptions, ...options })
    } else if (playerRef.current) {
      playerRef.current.src({ src, type: 'video/mp4' })
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [src, options])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className={`${className || ''} video-js vjs-big-play-centered vjs-theme-fantasy`} playsInline />
    </div>
  )
} 