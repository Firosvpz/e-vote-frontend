"use client"

import { useEffect, useState } from "react"
import { codeElements } from "../../../constants/codeElements"
const FloatingCodeElements = () => {
  const [elements, setElements] = useState([])

 

  useEffect(() => {
    // Generate random elements with programming content
    const generatedElements = [...Array(25)].map((_, i) => {
      const element = codeElements[i % codeElements.length]
      return {
        id: i,
        ...element,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 8 + Math.random() * 6,
        rotationSpeed: 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
      }
    })
    setElements(generatedElements)
  }, [])

  return (
    <div className="floating-code-elements">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element  ${element.type} ${element.color} ${element.size}`}
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            animationDelay: `${element.animationDelay}s`,
            animationDuration: `${element.animationDuration}s`,
            opacity: 0.15 ,
            "--rotation-speed": `${element.rotationSpeed}s`,
          }}
        >
          {element.content}
        </div>
      ))}

      <style jsx>{`
        .floating-code-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
          font-weight: 600;
          animation: floatCode 10s infinite ease-in-out;
          user-select: none;
          will-change: transform;
        }

        .floating-element.symbol {
          font-weight: 700;
          text-shadow: 0 0 10px currentColor;
        }

        .floating-element.snippet {
          font-weight: 500;
          font-style: italic;
          text-shadow: 0 0 8px currentColor;
        }

        .floating-element.tech {
          filter: drop-shadow(0 0 8px currentColor);
          animation: floatTech 12s infinite ease-in-out;
        }

        .floating-element.binary {
          font-family: 'Courier New', monospace;
          font-weight: 400;
          opacity: 0.4;
          animation: floatBinary 15s infinite linear;
        }

        /* Different floating animations */
        @keyframes floatCode {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-30px) translateX(20px) rotate(5deg) scale(1.1);
          }
          50% {
            transform: translateY(-60px) translateX(-10px) rotate(-3deg) scale(0.9);
          }
          75% {
            transform: translateY(-30px) translateX(-25px) rotate(8deg) scale(1.05);
          }
        }

        @keyframes floatTech {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-40px) translateX(30px) rotate(10deg) scale(1.2);
          }
          66% {
            transform: translateY(-20px) translateX(-20px) rotate(-5deg) scale(0.8);
          }
        }

        @keyframes floatBinary {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200px) translateX(-30px) rotate(360deg);
            opacity: 0.1;
          }
        }

        /* Hover effects for interactivity */
        .floating-element:hover {
          animation-play-state: paused;
          transform: scale(1.5) !important;
          z-index: 10;
          text-shadow: 0 0 20px currentColor !important;
          filter: brightness(1.5) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .floating-element {
            font-size: 0.8em;
          }
          
          .floating-element.tech {
            font-size: 0.9em;
          }
        }

        @media (max-width: 480px) {
          .floating-element {
            font-size: 0.7em;
          }
        }

        /* Performance optimizations */
        .floating-element {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default FloatingCodeElements
