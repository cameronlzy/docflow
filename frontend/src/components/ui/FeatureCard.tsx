import React, { memo, useRef, useState, useCallback } from "react"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export const FeatureCard = memo<FeatureCardProps>(
  ({ icon: Icon, title, description, delay = 0 }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setMousePosition({ x, y })
      },
      []
    )

    const handleMouseEnter = useCallback(() => {
      setIsHovering(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
      setIsHovering(false)
    }, [])

    return (
      <div
        ref={cardRef}
        className="relative bg-gray-950 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all duration-300 group overflow-hidden cursor-pointer"
        style={{ animationDelay: `${delay}ms` }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor tracking illumination overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)`
              : "transparent",
          }}
        />

        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
              : "transparent",
            maskImage:
              "linear-gradient(black, black) padding-box, linear-gradient(black, black)",
            maskClip: "padding-box, border-box",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
          }}
        />

        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 relative">
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: isHovering
                  ? `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`
                  : "transparent",
              }}
            />
            <Icon className="w-8 h-8 text-black relative z-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
            {description}
          </p>
        </div>

        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0px,_transparent_1px)] bg-[length:20px_20px]" />
        </div>
      </div>
    )
  }
)

FeatureCard.displayName = "FeatureCard"
