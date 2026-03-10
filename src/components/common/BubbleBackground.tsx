import { useEffect, useState } from 'react'
import 'animate.css'

function BubbleBackground() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Add custom CSS for bubble animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(15px) rotate(90deg); opacity: 0.7; }
        50% { transform: translateY(-60px) translateX(-15px) rotate(180deg); opacity: 0.5; }
        75% { transform: translateY(-30px) translateX(10px) rotate(270deg); opacity: 0.8; }
      }
      .particle {
        animation: float 15s ease-in-out infinite;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        position: absolute;
      }
    `
    document.head.appendChild(style)

  }, [])

  const particles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default BubbleBackground