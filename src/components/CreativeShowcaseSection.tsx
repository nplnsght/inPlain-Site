"use client"

import { useEffect, useRef, useState } from "react"

const CreativeShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const videoItems = [
    {
      id: 1,
      title: "Motion Studies",
      thumbnail: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Visual Narratives",
      thumbnail: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Design Process",
      thumbnail: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Creative Direction",
      thumbnail: "/placeholder.svg?height=300&width=400",
    },
  ]

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

  return (
    <section ref={sectionRef} className={`creative-showcase-section ${isVisible ? "visible" : ""}`}>
      <div className="showcase-content">
        {/* Left Text Content */}
        <div className="text-content">
          <h1 className="main-title">CREATIVE EXCELLENCE</h1>

          <div className="content-block">
            <h2 className="section-title">MOTION STUDIES</h2>
            <p className="section-description">
              Exploring movement through digital space. We create experiences that challenge perception and redefine
              visual boundaries.
            </p>
          </div>

          <div className="content-block">
            <h2 className="section-title">BOLD STATEMENTS</h2>
            <p className="section-description">Typography that demands attention</p>
          </div>

          <div className="content-block">
            <h2 className="section-title">VISUAL NARRATIVES</h2>
            <p className="section-description">
              Stories told through motion. Every project begins with a question: How can we make the impossible feel
              inevitable?
            </p>
          </div>

          <div className="content-block">
            <h2 className="section-title">DESIGN PHILOSOPHY</h2>
            <p className="section-description">Our approach to creative excellence</p>
          </div>
        </div>

        {/* Right Video Grid */}
        <div className="video-grid">
          {videoItems.map((item, index) => (
            <div
              key={item.id}
              className="video-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="video-thumbnail">
                <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} />
                <div className="video-overlay">
                  <div className="play-button">▶</div>
                </div>
                <div className="video-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreativeShowcaseSection
