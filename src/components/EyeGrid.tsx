"use client"

import { useState, useEffect, useRef } from "react"
import EyeLogo from "./EyeLogo"

interface EyeGridProps {
  mousePosition: { x: number; y: number }
}

const EyeGrid = ({ mousePosition }: EyeGridProps) => {
  const [blinkingEyes, setBlinkingEyes] = useState<Set<number>>(new Set())
  const [closedEyes, setClosedEyes] = useState<Set<number>>(new Set())
  const [scrollY, setScrollY] = useState(0)
  const [heroTextOpacity, setHeroTextOpacity] = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasTriggeredClose = useRef(false)
  const activeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  // Define eye positions in a staggered pattern
  const eyePositions = [
    // Row -2 (extending upward beyond viewport)
    { row: -2, col: -2 },
    { row: -2, col: -1 },
    { row: -2, col: 0 },
    { row: -2, col: 1 },
    { row: -2, col: 2 },
    { row: -2, col: 3 },
    { row: -2, col: 4 },

    // Row -1 (extending upward beyond viewport)
    { row: -1, col: -3 },
    { row: -1, col: -2 },
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: -1, col: 2 },
    { row: -1, col: 3 },

    // Row 0 (top visible row)
    { row: 0, col: -2 },
    { row: 0, col: -1 },
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },

    // Row 1
    { row: 1, col: -3 },
    { row: 1, col: -2 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },

    // Row 2
    { row: 2, col: -2 },
    { row: 2, col: -1 },
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },

    // Row 3
    { row: 3, col: -3 },
    { row: 3, col: -2 },
    { row: 3, col: -1 },
    { row: 3, col: 0 },
    { row: 3, col: 1 },

    // Row 4

    { row: 4, col: -1 },
    { row: 4, col: 0 },
    { row: 4, col: 1 },

    // Row 5
    { row: 5, col: -1 },
    { row: 5, col: 0 },

    // Row 6 (single eye at bottom)
    { row: 6, col: 0 },
  ]

  // Function to clear all pending timeouts
  const clearAllTimeouts = () => {
    activeTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    activeTimeouts.current = []
  }

  // Function to close eyes in a staggered pattern
  const closeEyesStaggered = () => {
    // Clear any existing timeouts first
    clearAllTimeouts()

    // Create a shuffled array of eye indices for random closing order
    const eyeIndices = Array.from({ length: eyePositions.length }, (_, i) => i)
    const shuffledEyes = eyeIndices.sort(() => Math.random() - 0.5)

    // Close eyes with faster staggered delays
    shuffledEyes.forEach((eyeIndex, i) => {
      const timeout = setTimeout(() => {
        setClosedEyes((prev) => {
          const newSet = new Set(prev)
          newSet.add(eyeIndex)
          return newSet
        })
      }, i * 30) // 30ms delay between each eye closing

      activeTimeouts.current.push(timeout)
    })
  }

  // Function to open all eyes
  const openAllEyes = () => {
    // Clear any pending close timeouts first
    clearAllTimeouts()

    // Force all eyes to be open immediately
    setClosedEyes(new Set())
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Calculate hero text opacity based on scroll
      const viewportHeight = window.innerHeight
      const fadeStartPoint = viewportHeight * 0.2 // Start fading at 20% scroll
      const fadeEndPoint = viewportHeight * 0.6 // Fully faded at 60% scroll

      let opacity = 1
      if (currentScrollY > fadeStartPoint) {
        const fadeProgress = Math.min((currentScrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint), 1)
        opacity = 1 - fadeProgress
      }
      setHeroTextOpacity(opacity)

      // More reliable scroll-based triggers for eye closing
      const triggerScrollDown = viewportHeight * 0.4 // Close eyes when scrolled 40% down
      const triggerScrollUp = viewportHeight * 0.1 // Open eyes when scrolled back up to 10%

      // If we're very close to the top (less than 10% of viewport), always open eyes
      if (currentScrollY < triggerScrollUp) {
        if (hasTriggeredClose.current || closedEyes.size > 0) {
          openAllEyes()
          hasTriggeredClose.current = false
        }
      }
      // If we've scrolled down enough and haven't triggered close yet, close eyes
      else if (currentScrollY > triggerScrollDown && !hasTriggeredClose.current) {
        closeEyesStaggered()
        hasTriggeredClose.current = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [closedEyes])

  useEffect(() => {
    const randomBlink = () => {
      // Don't do random blinks if eyes are being closed by scrolling
      if (closedEyes.size > 0) return

      const numEyesToBlink = Math.floor(Math.random() * 3) + 1
      const eyesToBlink = new Set<number>()

      while (eyesToBlink.size < numEyesToBlink) {
        eyesToBlink.add(Math.floor(Math.random() * eyePositions.length))
      }

      setBlinkingEyes(eyesToBlink)
      setTimeout(() => setBlinkingEyes(new Set()), 500)
    }

    const interval = setInterval(randomBlink, Math.random() * 8000 + 12000)
    return () => clearInterval(interval)
  }, [closedEyes.size])

  const handleEyeClick = (index: number) => {
    // Don't allow manual blinking if the eye is closed from scrolling
    if (closedEyes.has(index)) return

    setBlinkingEyes(new Set([index]))
    setTimeout(() => setBlinkingEyes(new Set()), 500)
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts()
    }
  }, [])

  return (
    <div className="eye-grid-container" ref={sectionRef}>
      <div
        className="eye-grid"
        style={{
          gridTemplateColumns: "repeat(7, 120px)",
          gridTemplateRows: "repeat(9, 60px)",
          marginLeft: "-240px",
          marginTop: "-180px",
          position: "relative",
        }}
      >
        {eyePositions.map((pos, index) => (
          <div
            key={index}
            className="eye-position"
            style={{
              gridRow: pos.row + 3,
              gridColumn: pos.col + 4,
              transform: pos.row % 2 !== 0 ? "translateX(60px)" : "",
            }}
          >
            <EyeLogo
              mousePosition={mousePosition}
              shouldBlink={blinkingEyes.has(index)}
              isClosed={closedEyes.has(index)}
              onBlink={() => handleEyeClick(index)}
              size={120}
            />
          </div>
        ))}
      </div>

      <div
        className="hero-text-container"
        style={{
          position: "absolute",
          bottom: "4rem",
          right: "4rem",
          height: "auto",
          justifyContent: "flex-end",
          opacity: heroTextOpacity,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <h1
          className="hero-title"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          IN
          <br />
          PLAIN
          <br />
          SIGHT
        </h1>
      </div>
    </div>
  )
}

export default EyeGrid
