'use client'

import Lines2 from "../hero/hero-lines"

interface DiagonalPatternProps {
  side: 'left' | 'right'
  className?: string
}

export default function DiagonalPattern({ side, className = '' }: DiagonalPatternProps) {
  return (
    <div className={`absolute ${side}-0 top-0 w-[130px] h-full overflow-hidden hidden lg:block ${className}`}>
      <Lines2 />
      <div 
        className="absolute inset-0 w-[130px] h-full border border-white/10 text-white/10"
        style={{
          backgroundImage: 'repeating-linear-gradient(-35deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 4px)'
        }}
      />
    </div>
  )
}