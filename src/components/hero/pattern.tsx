'use client'

import EditorialLines2 from "./lines"

interface DiagonalPatternProps {
  side: 'left' | 'right'
  className?: string
}

export default function DiagonalPattern({ side, className = '' }: DiagonalPatternProps) {
  return (
    <div className={`absolute ${side}-0 top-0 w-[130px] h-full  overflow-hidden sm:block hidden ${className}`}>
      <EditorialLines2 />
      <div 
        className="absolute dark:opacity-[0.1] opacity-[0.07] inset-0 w-[130px] h-full border dark:border-[#333333] border-border"
        style={{
          backgroundImage: 'repeating-linear-gradient(-35deg, transparent, transparent 2px, currentcolor 2px, currentcolor 3px, transparent 3px, transparent 4px)'
        }}
      />
    </div>
  )
}