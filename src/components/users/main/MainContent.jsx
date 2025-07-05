"use client"

import { useEffect, useState } from "react"
import FloatingCodeElements from "../achivements/FloatingCode"

const MainContent = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    const dynamicWords = ["Developer", "Designer", "Creator", "Innovator"]
    const skills = ["React", "JavaScript", "Node.js", "Python", "UI/UX", "MongoDB"]

    useEffect(() => {
        setIsLoaded(true)

        // Dynamic word rotation
        const wordInterval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length)
        }, 3000)

        // Mouse tracking for parallax effect
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            clearInterval(wordInterval)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

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
                    {/* Floating Geometric Shapes */}
                    <FloatingCodeElements />

                    {/* Gradient Orbs */}
                    {/* <div
            className="gradient-orb orb-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <div
            className="gradient-orb orb-2"
            style={{
              transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            }}
          />
          <div
            className="gradient-orb orb-3"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          /> */}
                </div>

                {/* Main Content */}
                <div className="hero-content">
                    <div className="content-wrapper">
                        {/* Left Side - Text Content */}
                        <div className="text-content">
                            {/* Greeting */}
                            <div className={`greeting ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "0.2s" }}>
                                <span className="greeting-text">Hello, I'm</span>
                                <div className="greeting-line" />
                            </div>

                            {/* Section Header */}
                            <div className="section-header">
                                {/* <div className="header-background">
          <h2 className="background-text">SKILLS</h2>
        </div> */}
                                <div className="header-foreground">
                                    <h3 className="foreground-text">
                                        <span className="highlight-text josefin-sans-title">Moh'd Firoz</span>
                                    </h3>
                                    {/* <p className="subtitle">Technologies I work with</p> */}
                                </div>
                            </div>

                            {/* Dynamic Role */}
                            <div className={`role-container ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "0.6s" }}>
                                <span className="role-prefi text-white">A Creative</span>
                                <span className="dynamic-wor text-[#64ffda]">{dynamicWords[currentWordIndex]}</span>
                            </div>

                            {/* Description */}
                            <p className={`description ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "0.8s" }}>
                                Motivated and detail-oriented Full Stack Developer with a strong foundation in MERN stack
                                development (MongoDB, Express.js, React.js, Node.js). Currently gaining hands-on experience
                                through an intensive internship at a reputable IT company in Kochi
                            </p>

                            {/* Skills Tags */}
                            {/* <div className={`skills-container ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "1.0s" }}>
                {skills.map((skill, index) => (
                  <span key={skill} className="skill-tag" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                    {skill}
                  </span>
                ))}
              </div> */}

                            {/* Action Buttons */}
                            {/* <div className={`action-buttons ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "1.4s" }}>
                <button className="primary-button" onClick={handleProjectsClick}>
                  <span>View My Work</span>
                  <div className="button-glow" />
                </button>
                <button className="secondary-button" onClick={handleContactClick}>
                  <span>Get In Touch</span>
                </button>
              </div> */}
                        </div>

                        {/* Right Side - Visual Element */}
                        <div className="visual-content">
                            <div className={`profile-container ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "0.6s" }}>
                                {/* Profile Image Placeholder */}
                                <div className="profile-image">
                                    <div className="image-placeholder overflow-hidden rounded-full w-32 h-32">
                                        <img
                                            src="/public/assets/linkedin.jpg" // Replace with your image URL
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Rotating Border */}
                                    <div className="rotating-border" />

                                    {/* Floating Icons */}
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

                                {/* Stats Cards */}
                                {/* <div className="stats-cards">
                                    <div className="stat-card card-1">
                                        <div className="stat-number">50+</div>
                                        <div className="stat-label">Projects</div>
                                    </div>
                                    <div className="stat-card card-2">
                                        <div className="stat-number">3+</div>
                                        <div className="stat-label">Years Exp</div>
                                    </div>
                                    <div className="stat-card card-3">
                                        <div className="stat-number">100%</div>
                                        <div className="stat-label">Satisfaction</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className={`scroll-indicator ${isLoaded ? "animate-in" : ""}`} style={{ animationDelay: "2s" }}>
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
        .portfolio-main {
          min-height: 100vh;
          background: #000;
          color: white;
          overflow-x: hidden;
          position: relative;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 2rem 1rem;
        }

        .background-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 10s infinite ease-in-out;
        }

        .shape-0 {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #64ffda, #00bcd4);
          border-radius: 50%;
        }

        .shape-1 {
          width: 15px;
          height: 15px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          transform: rotate(45deg);
        }

        .shape-2 {
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #a8e6cf, #4ecdc4);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .shape-3 {
          width: 18px;
          height: 18px;
          background: linear-gradient(45deg, #ffd93d, #ff6b35);
          border-radius: 3px;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: pulse 4s infinite ease-in-out;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #64ffda, #00bcd4);
          top: 10%;
          left: 10%;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          bottom: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #a8e6cf, #4ecdc4);
          top: 60%;
          left: 60%;
          animation-delay: 1s;
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

        .greeting {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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

        .main-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-title.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .name-text {
          background: linear-gradient(135deg, #ffffff, #64ffda);
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
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .role-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .role-prefix {
          color: #a0a0a0;
        }

        .dynamic-word {
          color: #ff6b6b;
          position: relative;
          animation: wordChange 3s infinite;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #b0b0b0;
          max-width: 500px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .description.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skills-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(100, 255, 218, 0.1);
          border: 1px solid rgba(100, 255, 218, 0.3);
          border-radius: 20px;
          font-size: 0.9rem;
          color: #64ffda;
          opacity: 0;
          transform: translateY(20px);
          animation: skillTagIn 0.6s ease-out forwards;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-buttons.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .primary-button, .secondary-button {
          position: relative;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .primary-button {
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          color: #0f0f23;
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
        }

        .button-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .primary-button:hover .button-glow {
          opacity: 1;
        }

        .secondary-button {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #64ffda;
          color: #64ffda;
        }

        .visual-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-container {
          position: relative;
          opacity: 0;
          transform: scale(0.8);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
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
          animation: rotate 3s linear infinite;
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
          backdrop-filter: blur(10px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64ffda;
          animation: floatIcon 4s infinite ease-in-out;
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
          animation-delay: 1.5s;
        }

        .icon-3 {
          top: 60%;
          right: -30px;
          animation-delay: 3s;
        }

        .stats-cards {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          min-width: 80px;
          animation: statCardIn 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .card-1 { animation-delay: 1.8s; }
        .card-2 { animation-delay: 2s; }
        .card-3 { animation-delay: 2.2s; }

        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #64ffda;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #a0a0a0;
          margin-top: 0.25rem;
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
          animation: fadeInUp 0.8s ease-out forwards;
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

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        @keyframes wordChange {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-5px); }
        }

        @keyframes skillTagIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes statCardIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            padding: 1rem;
          }

          .profile-image {
            width: 250px;
            height: 250px;
          }

          .stats-cards {
            flex-wrap: wrap;
          }

          .action-buttons {
            flex-direction: column;
            align-items: flex-start;
          }

          .primary-button, .secondary-button {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
        </main>
    )
}

export default MainContent
