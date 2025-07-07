"use client"
import { useEffect, useState } from "react"
import FloatingCodeElements from "../achivements/FloatingCode"

const MainContent = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const dynamicWords = ["Frontend Developer", "Backend Developer", "Figma Designer", "Innovator"]
  const skills = ["React", "JavaScript", "Node.js", "Python", "UI/UX", "MongoDB"]

  useEffect(() => {
    // Ensure scroll is always enabled
    document.body.style.overflow = "auto"
    document.documentElement.style.overflow = "auto"

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Set loaded immediately to prevent scroll blocking
    setIsLoaded(true)

    // Dynamic word rotation
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length)
    }, 3000)

    // Mouse tracking for parallax effect (disabled on mobile for performance)
    let handleMouseMove
    if (!isMobile) {
      handleMouseMove = (e) => {
        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          })
        })
      }
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    return () => {
      clearInterval(wordInterval)
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="portfolio-main">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        {/* Animated Background */}
        <div className="background-container">
          {/* Floating Geometric Shapes - Reduced on mobile */}
          {!isMobile && <FloatingCodeElements />}
        </div>

        {/* Main Content */}
        <div className="hero-content">
          <div className="content-wrapper">
            {/* Left Side - Text Content */}
            <div className="text-content">
              {/* Greeting */}
              <div className={`greeting ${isLoaded ? "animate-in" : ""}`}>
                <span className="greeting-text">Hello, I'm</span>
                <div className="greeting-line" />
              </div>

              {/* Section Header */}
              <div className="section-header">
                <div className="header-foreground">
                  <h3 className="foreground-text">
                    <span className="highlight-text josefin-sans-title">Moh'd Firoz</span>
                  </h3>
                </div>
              </div>

              {/* Dynamic Role */}
              <div className={`role-container ${isLoaded ? "animate-in" : ""}`}>
                <span className="role-prefix text-white">A Creative</span>
                <span className="dynamic-word text-[#64ffda]">{dynamicWords[currentWordIndex]}</span>
              </div>

              {/* Description */}
              <p className={`description ${isLoaded ? "animate-in" : ""}`}>
                Motivated and detail-oriented Full Stack Developer with a strong foundation in MERN stack development
                (MongoDB, Express.js, React.js, Node.js). Currently gaining hands-on experience through an intensive
                internship at a reputable IT company in Kochi
              </p>
            </div>

            {/* Right Side - Visual Element */}
            <div className="visual-content">
              <div className={`profile-container ${isLoaded ? "animate-in" : ""}`}>
                {/* Profile Image Placeholder */}
                <div className="profile-image">
                  <div className="image-placeholder overflow-hidden rounded-full w-32 h-32">
                    <img
                      src="/assets/linkedin.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Rotating Border - Reduced animation on mobile */}
                  <div className={`rotating-border ${isMobile ? "mobile-optimized" : ""}`} />

                  {/* Floating Icons - Simplified on mobile */}
                  <div className="floating-icons">
                    <div className="icon-item icon-1">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                      </svg>
                    </div>
                    <div className="icon-item icon-2">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                      </svg>
                    </div>
                    <div className="icon-item icon-3">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`scroll-indicator ${isLoaded ? "animate-in" : ""}`}>
            <div className="scroll-text">Scroll to explore</div>
            <div className="scroll-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* CRITICAL: Ensure scroll is never blocked */
        html, body {
          overflow: auto !important;
          scroll-behavior: smooth;
          height: auto !important;
        }

        .portfolio-main {
          min-height: 100vh;
          background: #000;
          color: white;
          /* REMOVED: overflow-x: hidden - this was blocking scroll */
          position: relative;
          /* Ensure scrolling is always possible */
          overflow: visible;
          height: auto;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 2rem 1rem;
          /* Ensure this doesn't block scroll */
          overflow: visible;
        }

        .background-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          /* Don't let this affect scroll */
          z-index: 0;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Simplified animations that don't block scroll */
        .greeting {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .greeting.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .greeting-text {
          font-size: 1.1rem;
          color: #64ffda;
          font-weight: 500;
        }

        .greeting-line {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #64ffda, transparent);
        }

        .section-header {
          margin: 1rem 0;
        }

        .header-foreground {
          position: relative;
          z-index: 10;
        }

        .foreground-text {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
        }

        .highlight-text {
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out 0.2s;
        }

        .role-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .role-prefix {
          color: #a0a0a0;
        }

        .dynamic-word {
          color: #64ffda;
          position: relative;
          animation: wordChange 3s infinite;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #b0b0b0;
          max-width: 500px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out 0.4s;
        }

        .description.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .visual-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-container {
          position: relative;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s ease-out 0.3s;
        }

        .profile-container.animate-in {
          opacity: 1;
          transform: scale(1);
        }

        .profile-image {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          font-weight: bold;
          color: #0f0f23;
          position: relative;
          z-index: 2;
        }

        .rotating-border {
          position: absolute;
          inset: -10px;
          border: 3px solid transparent;
          border-top: 3px solid #ff6b6b;
          border-right: 3px solid #64ffda;
          border-radius: 50%;
          animation: rotate 4s linear infinite;
        }

        /* Slower rotation on mobile */
        .rotating-border.mobile-optimized {
          animation: rotate 8s linear infinite;
        }

        .floating-icons {
          position: absolute;
          inset: 0;
        }

        .icon-item {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64ffda;
          animation: floatIcon 6s infinite ease-in-out;
        }

        .icon-item svg {
          width: 24px;
          height: 24px;
        }

        .icon-1 {
          top: 20%;
          right: -20px;
          animation-delay: 0s;
        }

        .icon-2 {
          bottom: 30%;
          left: -20px;
          animation-delay: 2s;
        }

        .icon-3 {
          top: 60%;
          right: -30px;
          animation-delay: 4s;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.6s ease-out 1s;
        }

        .scroll-indicator.animate-in {
          opacity: 1;
        }

        .scroll-text {
          font-size: 0.9rem;
          color: #a0a0a0;
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          color: #64ffda;
          animation: bounce 2s infinite;
        }

        /* Simplified, non-blocking animations */
        @keyframes wordChange {
          0%, 100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          50% { 
            opacity: 0.7; 
            transform: translateY(-3px); 
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-section {
            padding: 1rem;
            /* Ensure scroll works on mobile */
            overflow: visible;
            min-height: 100vh;
          }

          .profile-image {
            width: 250px;
            height: 250px;
          }

          /* Disable complex animations on mobile */
          .icon-item {
            animation: none;
            position: static;
            display: none; /* Hide floating icons on mobile */
          }

          .rotating-border {
            animation-duration: 10s;
          }

          /* Faster transitions on mobile */
          .greeting,
          .role-container,
          .description,
          .profile-container {
            transition-duration: 0.4s;
          }
        }

        /* Ensure scroll works for users with reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          html, body {
            scroll-behavior: auto !important;
          }
        }

        /* Force scroll capability */
        @media (max-height: 600px) {
          .hero-section {
            min-height: auto;
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  )
}

export default MainContent
