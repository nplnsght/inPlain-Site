"use client"

import { useEffect, useRef } from "react"

const Clock = () => {
  const secondRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setTime = (left: number, hand: string) => {
      const element = hand === "second" ? secondRef.current : hand === "minute" ? minuteRef.current : hourRef.current
      if (element) {
        element.style.animationDelay = `${left * -1}s`
      }
    }

    const getSecondsToday = () => {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const diff = now.getTime() - today.getTime()
      return Math.round(diff / 1000)
    }

    const currentSec = getSecondsToday()

    const seconds = (currentSec / 60) % 1
    const minutes = (currentSec / 3600) % 1
    const hours = (currentSec / 43200) % 1

    setTime(60 * seconds, "second")
    setTime(3600 * minutes, "minute")
    setTime(43200 * hours, "hour")
  }, [])

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="clock__second" ref={secondRef}></div>
        <div className="clock__minute" ref={minuteRef}></div>
        <div className="clock__hour" ref={hourRef}></div>
        <div className="clock__axis"></div>
      </div>
    </div>
  )
}

export default Clock
