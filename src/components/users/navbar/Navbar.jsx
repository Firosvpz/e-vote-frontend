"use client"

import { useState, useEffect } from "react"
import './Navbar.css'
export default function PortfolioNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const navItems = [
    // { name: "Home", href: "#home", id: "home" },
    // { name: "About", href: "#about", id: "about" },
    // { name: "Skills", href: "#skills", id: "skills" },
    // { name: "Projects", href: "#projects", id: "projects" },
    // { name: "Experience", href: "#experience", id: "experience" },
    // { name: "Contact", href: "#contact", id: "contact" },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Firosvpz",
      icon: (
        <svg className="w-5 h-5" fill="#64ffda" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/firosmuhammed/",
      icon: (
        <svg className="w-5 h-5" fill="#64ffda" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:vpzfiroz@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#64ffda" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling
  const handleNavClick = (href, id) => {
    setActiveSection(id)
    setIsMobileMenuOpen(false)

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Handle resume download
  const handleResumeDownload = () => {
    const resumeUrl = "/assets/firoz_resume.pdf"
    const link = document.createElement("a")
    link.href = resumeUrl
    link.download = "Firos_resume.pdf"
    link.click()
  }

  return (
    <>
      <nav className={` navbar ${isScrolled ? "navbar-scrolled" : ""} ${isDarkMode ? "dark" : ""}`}>
        <div className="navbar-container  ">
          <div className="navbar-content">
            {/* Logo */}
            <div className="logo-section">
              <button onClick={() => handleNavClick("#home", "home")} className="logo-button">
                <div className="logo-avatar">
                  {/* <div className="logo-circle ">F</div> */}
                  {/* <span className="logo-text">Muhammed Firos</span> */}
                </div>
                <div className="logo-hover-effect" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="nav-link-text">{item.name}</span>
                  <div className="nav-link-bg" />
                  {activeSection === item.id && <div className="nav-link-indicator" />}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="desktop-actions">
              {/* Social Links */}
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Theme Toggle */}
              {/* <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isDarkMode ? (
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button> */}

              {/* Resume Download */}
              <button onClick={handleResumeDownload} className="resume-button">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-controls">
           
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="">
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="#64ffda" stroke="#64ffda" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="#64ffda" stroke="#64ffda" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu-conten">
            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`mobile-nav-link ${activeSection === item.id ? "mobile-nav-link-active" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Social Links */}
            <div className="mobile-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Mobile Resume Button */}
            <button onClick={handleResumeDownload} className="bg-[#64ffda] text-dark-500 hover:bg-[#64ffda]/90 text-sm mx-auto font-semibold px-4 py-2 rounded-md flex items-center justify-center w-[50%]">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </button>
          </div>
        </div>
      </nav>

    

    
    </>
  )
}
