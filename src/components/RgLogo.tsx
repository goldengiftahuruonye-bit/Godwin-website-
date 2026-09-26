import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface RgLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  glow?: boolean;
}

export const RgLogo: React.FC<RgLogoProps> = ({
  className = '',
  size = 'md',
  glow = false,
}) => {
  const getSizeClass = () => {
    if (typeof size === 'number') {
      return '';
    }
    switch (size) {
      case 'xs':
        return 'w-6 h-6';
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-9 h-9 sm:w-10 sm:h-10';
      case 'lg':
        return 'w-12 h-12 sm:w-14 sm:h-14';
      case 'xl':
        return 'w-16 h-16 sm:w-20 sm:h-20';
      default:
        return 'w-9 h-9 sm:w-10 sm:h-10';
    }
  };

  const style = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div
      style={style}
      className={`relative rounded-full overflow-hidden shrink-0 border border-[#c8a265]/60 bg-[#0c0d0f] shadow-md transition-all duration-300 ${getSizeClass()} ${
        glow ? 'shadow-[0_0_20px_rgba(200,162,101,0.35)]' : ''
      } ${className}`}
    >
      <img
        src={ARCHITECT_INFO.logo}
        alt="Richard Godwin Architecture Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center select-none"
      />
    </div>
  );
};
