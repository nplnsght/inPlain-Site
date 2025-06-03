"use client"

import { useEffect, useRef, useState } from "react"

interface EyeLogoProps {
  mousePosition: { x: number; y: number }
  onBlink?: () => void
  shouldBlink?: boolean
  isClosed?: boolean
  size?: number
}

const EyeLogo = ({ mousePosition, onBlink, shouldBlink = false, isClosed = false, size = 120 }: EyeLogoProps) => {
  const eyeRef = useRef<HTMLDivElement>(null)
  const irisRef = useRef<SVGGElement>(null)
  const [isBlinking, setIsBlinking] = useState(false)
  const eyeId = `eye-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    if (shouldBlink && !isClosed) {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 500)
    }
  }, [shouldBlink, isClosed])

  useEffect(() => {
    const updateEyePosition = () => {
      if (!eyeRef.current || !irisRef.current) return

      const eye = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = eye.left + eye.width / 2
      const eyeCenterY = eye.top + eye.height / 2

      const angle = Math.atan2(mousePosition.y - (eyeCenterY - window.scrollY), mousePosition.x - eyeCenterX)

      const maxDistance = size * 0.4

      const distance = Math.min(
        Math.sqrt(
          Math.pow(mousePosition.x - eyeCenterX, 2) + Math.pow(mousePosition.y - (eyeCenterY - window.scrollY), 2),
        ) * 0.15,
        maxDistance,
      )

      const irisX = Math.cos(angle) * distance
      const irisY = Math.sin(angle) * distance

      irisRef.current.style.transform = `translate(${irisX}px, ${irisY}px)`
    }

    if (!isClosed) {
      updateEyePosition()
    }
  }, [mousePosition, size, isClosed])

  return (
    <div
      className={`eye-logo ${isBlinking ? "blinking" : ""} ${isClosed ? "closed" : ""}`}
      ref={eyeRef}
      style={{ width: size, height: size * 0.5 }}
      onClick={onBlink}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 100" className="eye-svg">
        <defs>
          <clipPath id={`eyeClip-${eyeId}`}>
            <path
              d="M 0 50 Q 50 0 100 0 Q 150 0 200 50 Q 150 100 100 100 Q 50 100 0 50 Z"
              className={`eye-clip-path ${isBlinking ? "blinking" : ""} ${isClosed ? "closed" : ""}`}
            />
          </clipPath>
        </defs>

        <path
          d="M 0 50 Q 50 0 100 0 Q 150 0 200 50 Q 150 100 100 100 Q 50 100 0 50 Z"
          fill="white"
          className={`eye-shape ${isBlinking ? "blinking" : ""} ${isClosed ? "closed" : ""}`}
        />

        <g clipPath={`url(#eyeClip-${eyeId})`}>
          <g ref={irisRef} style={{ transformOrigin: "100px 50px" }}>
            <circle cx="100" cy="50" r="48" fill="var(--color-accent)" />
            <circle cx="100" cy="50" r="26" fill="#202124" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default EyeLogo
