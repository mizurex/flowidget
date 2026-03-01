
"use client";
import React from 'react';
interface LinesHeader2Props {
    side: 'left' | 'right';
}
export function LinesHeader2({ side }: LinesHeader2Props) {
    const isLeft = side === 'left';
    return (<div className="relative hidden h-px flex-1 border-t border-solid border-white/20 lg:block">
      
      <div className={`absolute z-30 -top-1 ${isLeft ? '-right-px' : '-left-px'}`}>
    
      </div>
    </div>);
}
