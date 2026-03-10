import { useMemo, useEffect } from 'react'
import 'animate.css'

function BubbleBackground() {
  const particles = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 10,
  })), [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); opacity: 0.2; }
        25% { transform: translateY(-40px) translateX(20px) rotate(90deg) scale(1.2); opacity: 0.8; }
        50% { transform: translateY(-80px) translateX(-20px) rotate(180deg) scale(0.8); opacity: 0.5; }
        75% { transform: translateY(-40px) translateX(15px) rotate(270deg) scale(1.1); opacity: 0.9; }
      }
      .particle {
        animation: float 20s ease-in-out infinite;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(173,216,230,0.6) 50%, rgba(138,43,226,0.4) 100%);
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(173,216,230,0.3), 0 0 30px rgba(138,43,226,0.2);
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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