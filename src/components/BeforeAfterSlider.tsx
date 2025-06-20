import React, { useState, useEffect, useRef } from 'react';

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ height: '400px' }}
    >
      {/* After image (full width) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      >
        <span className="absolute top-4 right-4 bg-black bg-opacity-70 text-amber-500 px-3 py-1 text-xs font-semibold rounded">
          {afterLabel}
        </span>
      </div>
      
      {/* Before image (dynamic width) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${beforeImage})`, 
          width: `${sliderPosition}%`,
          height: '100%',
        }}
      >
        <span className="absolute top-4 left-4 bg-black bg-opacity-70 text-amber-500 px-3 py-1 text-xs font-semibold rounded">
          {beforeLabel}
        </span>
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute inset-y-0" 
        style={{ left: `calc(${sliderPosition}% - 1px)` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-amber-500"></div>
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
            <path d="M13 5L19 12L13 19"></path>
            <path d="M11 5L5 12L11 19"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;