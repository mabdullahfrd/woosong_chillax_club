import React from 'react';

export const CHILLAX_LOGO_SRC = '/assets/aistudio/Screenshot_2026-10-23_215420-removebg-preview_7c1792fc.png';

interface ChillaxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact';
  className?: string;
  showSparkles?: boolean;
}

export const ChillaxLogo: React.FC<ChillaxLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  // Height sizing
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-16 sm:h-20 md:h-24',
    xl: 'h-24 sm:h-32 md:h-36',
  }[size];

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center justify-center font-display font-black select-none ${className}`}>
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[#C6FF00] border-2 border-black rounded-lg flex items-center justify-center brutal-shadow-sm transform -rotate-2 hover:rotate-0 transition-transform">
          <span className="text-2xl font-black text-black tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            C
          </span>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border border-black rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src={CHILLAX_LOGO_SRC}
        alt="Woosong Chillax Club Official Logo"
        className={`${heightClass} w-auto object-contain pointer-events-none drop-shadow-md`}
        loading="eager"
      />
    </div>
  );
};

