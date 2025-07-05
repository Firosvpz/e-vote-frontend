"use client"

import { useState, useEffect } from "react"
import { projects } from "../../../constants/projects"
import FloatingCodeElements from "../achivements/FloatingCode"

const MyProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)

 

  const categories = ["All", "Full Stack", "Frontend", "Backend"]

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-400/10 border-green-400/30"
      case "In Progress":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30"
      case "Ongoing":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30"
    }
  }

  return (
    <div className="projects-showcase">
        <FloatingCodeElements/>
      {/* Section Header */}
       <div className="section-header">
        {/* <div className="header-background">
          <h2 className="background-text">SKILLS</h2>
        </div> */}
        <div className="header-foreground">
          <h3 className="foreground-text">
             <span className="highlight-text josefin-sans-title">MyProjects</span>
          </h3>
          {/* <p className="subtitle">Technologies I work with</p> */}
        </div>
      </div>

      {/* Category Filter */}
      {/* <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
            <div className="filter-glow" />
          </button>
        ))}
      </div> */}

      {/* Projects Grid */}
      <div className="projects-grid ">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card  ${project.featured ? "featured" : ""} ${isVisible ? "animate-in" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Featured Badge */}
            {/* {project.featured && (
              <div className="featured-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Featured
              </div>
            )} */}

            {/* Status Badge */}
            {/* <div className={`status-badge ${getStatusColor(project.status)}`}>{project.status}</div> */}

            {/* Project Image */}
            <div className="project-image ">
              <img src={project.image || "/placeholder.svg"} alt={project.title} />
              <div className="image-overlay">
                <div className="overlay-content">
                  <div className="project-links">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="project-content">
              <div className="project-header">
                <h4 className="project-title">{project.title}</h4>
                {/* <div className="project-duration">{project.duration}</div> */}
              </div>

              <p className="project-description">{project.description}</p>

              {/* Technologies */}
              <div className="technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Effect */}
            <div className={`card-glow ${hoveredProject === project.id ? "active" : ""}`} />
          </div>
        ))}
      </div>

      {/* Projects Stats */}
      {/* <div className="projects-stats">
        <div className="stat-item">
          <div className="stat-number">{projects.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{projects.filter((p) => p.status === "Completed").length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{projects.filter((p) => p.featured).length}</div>
          <div className="stat-label">Featured</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{new Set(projects.flatMap((p) => p.technologies)).size}</div>
          <div className="stat-label">Technologies</div>
        </div>
      </div> */}

      <style jsx>{`
        .projects-showcase {
          min-height: 100vh;
        //   background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
          padding: 4rem 1rem;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .header-background {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .background-text {
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          user-select: none;
        }

        .header-foreground {
          position: relative;
          z-index: 10;
          padding-top: 2rem;
        }

        .foreground-text {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .highlight-text {
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #a0a0a0;
          margin-bottom: 0;
        }

        .filter-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-button {
          position: relative;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          color: #a0a0a0;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .filter-button:hover {
          color: #64ffda;
          border-color: rgba(100, 255, 218, 0.3);
          transform: translateY(-2px);
        }

        .filter-button.active {
          color: #64ffda;
          border-color: rgba(100, 255, 218, 0.5);
          background: rgba(100, 255, 218, 0.1);
        }

        .filter-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(0, 188, 212, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .filter-button:hover .filter-glow,
        .filter-button.active .filter-glow {
          opacity: 1;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto 4rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          // border: 1px solid rgba(0, 0, 0, 0.1);
          // boxshadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .project-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(100, 255, 218, 0.3);
        }

        .project-card.featured {
          border-color: rgba(255, 215, 0, 0.3);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #0f0f23;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          z-index: 10;
        }

        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid;
          z-index: 10;
        }

        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          transform: translateY(20px);
          animation: slideUp 0.3s ease forwards;
        }

        .project-link.live {
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          color: #0f0f23;
        }

        .project-link.github {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .project-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .project-duration {
          font-size: 0.875rem;
          color: #64ffda;
          font-weight: 500;
        }

        .project-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.25rem 0.75rem;
          background: rgba(100, 255, 218, 0.1);
          border: 1px solid rgba(100, 255, 218, 0.3);
          border-radius: 1rem;
          font-size: 0.75rem;
          color: #64ffda;
          font-weight: 500;
        }

        .card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(100, 255, 218, 0.2), rgba(0, 188, 212, 0.2));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: blur(8px);
          z-index: -1;
        }

        .card-glow.active {
          opacity: 1;
        }

        .projects-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
          padding: 2rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-4px);
          border-color: rgba(100, 255, 218, 0.3);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #64ffda;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #a0a0a0;
          font-weight: 500;
        }

        /* Animations */
        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .projects-showcase {
            padding: 2rem 0.5rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-card {
            margin: 0 0.5rem;
          }

          .filter-container {
            gap: 0.5rem;
          }

          .filter-button {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .project-links {
            flex-direction: column;
            gap: 0.5rem;
          }

          .projects-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .projects-stats {
            grid-template-columns: 1fr;
          }

          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default MyProjects
