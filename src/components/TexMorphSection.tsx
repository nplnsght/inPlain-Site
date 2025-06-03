"use client"

import { useEffect, useRef, useState } from "react"
import Clock from "./Clock"

const TextMorphSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleTextClick = () => {
    window.open("https://www.youtube.com/@nplnsght", "_blank", "noopener,noreferrer")
  }

  return (
    <section ref={sectionRef} className={`simple-text-section ${isVisible ? "visible" : ""}`}>
      <div className="text-content-wrapper">
        <div className="text-and-clock-container">
          <div className="centered-text" onClick={handleTextClick}>
            <p className="main-paragraph">
              The first lie you believed came from truth disguised as intention. What we see isn't always what exists,
              and what exists isn't always what we're meant to understand. In the space between perception and reality,
              stories unfold that challenge everything we thought we knew.
            </p>
          </div>
          <Clock />
        </div>
      </div>
    </section>
  )
}

export default TextMorphSection
