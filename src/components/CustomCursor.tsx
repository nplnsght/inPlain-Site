"use client"

import { useEffect, useState } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.classList.contains("clickable-word") ||
        target.closest(".clickable-word") ||
        target.classList.contains("video-thumbnail") ||
        target.closest(".video-thumbnail")
      ) {
        setIsHovering(true)
      }

      // Check for text section hover
      if (
        target.classList.contains("centered-text") ||
        target.closest(".centered-text") ||
        target.classList.contains("main-paragraph") ||
        target.closest(".main-paragraph")
      ) {
        setIsHoveringText(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsHoveringText(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Regular hover elements
      if (
        target.classList.contains("clickable-word") ||
        target.closest(".clickable-word") ||
        target.classList.contains("video-thumbnail") ||
        target.closest(".video-thumbnail")
      ) {
        setIsHovering(true)
        setIsHoveringText(false)
      }
      // Text section hover
      else if (
        target.classList.contains("centered-text") ||
        target.closest(".centered-text") ||
        target.classList.contains("main-paragraph") ||
        target.closest(".main-paragraph")
      ) {
        setIsHoveringText(true)
        setIsHovering(false)
      } else {
        setIsHovering(false)
        setIsHoveringText(false)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)

    // Add event listeners to all clickable elements
    const addHoverListeners = () => {
      const clickableElements = document.querySelectorAll(
        ".clickable-word, .video-thumbnail, .centered-text, .main-paragraph",
      )
      clickableElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter)
        element.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    // Initial setup and also run when DOM might change
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      observer.disconnect()

      const clickableElements = document.querySelectorAll(
        ".clickable-word, .video-thumbnail, .centered-text, .main-paragraph",
      )
      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [isVisible])

  return (
    <div
      className={`custom-cursor ${isHovering ? "hovering" : ""} ${isHoveringText ? "hovering-text" : ""} ${isClicking ? "clicking" : ""} ${
        isVisible ? "visible" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  )
}

export default CustomCursor
