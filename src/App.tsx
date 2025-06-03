"use client"

import { useEffect, useRef, useState } from "react"
import EyeGrid from "./components/EyeGrid"
import CustomCursor from "./components/CustomCursor"
import TextMorphSection from "./components/TexMorphSection"
import CreativeShowcaseSection from "./components/CreativeShowcaseSection"
import Footer from "./components/Footer"
import "./App.css"
import "./eye-animation.css"
import "./sections.css"

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={appRef} className="app">
      <CustomCursor />

      <main className="main-content">
        <section className="hero-section" style={{ height: "100vh", zIndex: 10, position: "relative" }}>
          <EyeGrid mousePosition={mousePosition} />
        </section>

        <TextMorphSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
