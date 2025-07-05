"use client"

import { useState, useEffect, useRef } from "react"
import "./Achievements.css"
import FloatingCodeElements from "./FloatingCode"
import { skills } from "../../../constants/skillsApi.jsx"


const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sliderRef = useRef(null)


  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills]

  useEffect(() => {
    setIsVisible(true)

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length)    
    }, 1500)

    return () => clearInterval(interval)
  }, [skills.length])

  return (  
    <div className="skills-slider-container">
      <FloatingCodeElements/>
      {/* Section Header */}
      <div className="section-header">
        {/* <div className="header-background">
          <h2 className="background-text">SKILLS</h2>
        </div> */}
        <div className="header-foreground">
          <h3 className="foreground-text">
             <span className="highlight-text josefin-sans-title">MySkills</span>
          </h3>
          {/* <p className="subtitle">Technologies I work with</p> */}
        </div>
      </div>

      {/* Skills Slider */}
      <div className="slider-wrapper">
        <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 360}px)` }}>
          {duplicatedSkills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className={`skill-card ${skill.bgColor} ${skill.borderColor}`}>
              {/* Card Glow Effect */}
              <div className={`card-glow bg-gradient-to-r ${skill.color}`} />

              {/* Skill Icon */}
              <div className={`skill-icon bg-gradient-to-r ${skill.color}`}>
                <div className="icon-wrapper">{skill.icon}</div>
              </div>

              {/* Skill Info */}
              <div className="skill-info">
                <h4 className="skill-name">{skill.name}</h4>
                {/* <div className="skill-details">
                  <span className="skill-level">{skill.level}</span>
                  <span className="skill-experience">{skill.experience}</span>
                </div> */}
              </div>

              {/* Progress Bar */}
              {/* <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className={`progress-fill bg-gradient-to-r ${skill.color}`}
                    style={{
                      width: skill.level === "Expert" ? "90%" : skill.level === "Advanced" ? "75%" : "60%",
                    }}
                  />
                </div>
              </div> */}

              {/* Floating Particles */}
              {/* <div className="floating-particles">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`particle bg-gradient-to-r ${skill.color}`}
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Skill Indicators */}
      {/* <div className="skill-indicators">
        {skills.map((_, index) => (
          <div key={index} className={`indicator ${index === currentIndex ? "active" : ""}`} />
        ))}
      </div> */}

   
    </div>
  )
}

export default Achievements
