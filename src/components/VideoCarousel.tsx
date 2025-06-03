import { useState, useRef, useEffect } from "react"

const videos = [
  {
    id: "1",
    title: "Bold Design Showcase",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoId: "video1",
  },
  {
    id: "2",
    title: "Typography in Motion",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoId: "video2",
  },
  {
    id: "3",
    title: "Visual Identity",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoId: "video3",
  },
  {
    id: "4",
    title: "Experimental Design",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoId: "video4",
  },
]

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <div className="video-carousel-container">
      <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous video">
        ←
      </button>

      <div className="video-carousel" ref={carouselRef}>
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {videos.map((video) => (
            <div key={video.id} className="carousel-item">
              <div className="video-card">
                <div className="thumbnail-container">
                  <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="video-thumbnail" />
                  <div className="play-overlay">
                    <div className="play-button"></div>
                  </div>
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-button next" onClick={nextSlide} aria-label="Next video">
        →
      </button>

      <div className="carousel-indicators">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarousel