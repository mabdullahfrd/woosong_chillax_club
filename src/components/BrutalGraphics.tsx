import React from 'react';

interface StickerProps {
  text: string;
  color?: 'lime' | 'purple' | 'blue' | 'white' | 'black';
  rotate?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Sticker: React.FC<StickerProps> = ({
  text,
  color = 'lime',
  rotate = '-rotate-2',
  size = 'md',
  className = '',
  icon
}) => {
  const bgStyles = {
    lime: 'bg-[#C6FF00] text-black border-black',
    purple: 'bg-[#9B5CFF] text-white border-black',
    blue: 'bg-[#4388FF] text-white border-black',
    white: 'bg-white text-black border-black',
    black: 'bg-black text-[#C6FF00] border-[#C6FF00]',
  }[color];

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-bold',
    md: 'text-xs px-3.5 py-1 font-bold',
    lg: 'text-sm px-4 py-1.5 font-black',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider border-[2.5px] brutal-shadow-sm select-none transition-transform hover:scale-105 ${bgStyles} ${sizeStyles} ${rotate} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{text}</span>
    </div>
  );
};

// Reference 1 Starburst Badge with Squiggle Center
export const StarburstBadge: React.FC<{
  size?: number;
  color?: 'lime' | 'purple' | 'white';
  squiggleColor?: string;
  rotate?: string;
  className?: string;
  label?: string;
}> = ({
  size = 72,
  color = 'lime',
  squiggleColor = '#9B5CFF',
  rotate = 'rotate-6',
  className = '',
  label
}) => {
  const fillColor = color === 'lime' ? '#C6FF00' : color === 'purple' ? '#9B5CFF' : '#FFFFFF';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${rotate} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[4px_4px_0px_#000000]"
      >
        {/* 20-point pointed starburst */}
        <polygon
          points="50,0 60,18 79,9 79,30 98,31 88,48 100,62 82,68 83,89 64,83 55,100 42,86 26,95 24,75 4,73 11,54 0,39 19,34 16,13 36,19"
          fill={fillColor}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Playful squiggle line in center (like Reference 1) */}
        <path
          d="M32 45 Q42 28 50 48 T68 45"
          fill="none"
          stroke={squiggleColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span className="absolute font-mono text-[9px] font-black uppercase tracking-tight text-black text-center max-w-[50px] leading-tight">
          {label}
        </span>
      )}
    </div>
  );
};

// Reference 1 Barcode Element
export const BarcodeStrip: React.FC<{ serial?: string; className?: string }> = ({
  serial = "WSU-CHILLAX-042",
  className = ""
}) => {
  return (
    <div className={`p-2 bg-[#0B0B0F] border-2 border-black inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Visual Barcode Lines */}
      <div className="flex items-center gap-[2px] h-7 w-full justify-center px-1">
        <span className="w-1 h-full bg-[#C6FF00]" />
        <span className="w-0.5 h-full bg-[#C6FF00]" />
        <span className="w-1.5 h-full bg-[#C6FF00]" />
        <span className="w-0.5 h-full bg-[#C6FF00]" />
        <span className="w-2 h-full bg-[#C6FF00]" />
        <span className="w-1 h-full bg-[#C6FF00]" />
        <span className="w-0.5 h-full bg-[#C6FF00]" />
        <span className="w-1.5 h-full bg-[#C6FF00]" />
        <span className="w-2.5 h-full bg-[#C6FF00]" />
        <span className="w-0.5 h-full bg-[#C6FF00]" />
        <span className="w-1 h-full bg-[#C6FF00]" />
        <span className="w-2 h-full bg-[#C6FF00]" />
        <span className="w-0.5 h-full bg-[#C6FF00]" />
        <span className="w-1.5 h-full bg-[#C6FF00]" />
        <span className="w-1 h-full bg-[#C6FF00]" />
      </div>
      <span className="font-mono text-[9px] font-bold tracking-widest text-[#C6FF00] mt-1">
        *{serial}*
      </span>
    </div>
  );
};

// Reference 3 Streetwear Cross-Arrows
export const StreetwearCross: React.FC<{ size?: number; className?: string }> = ({
  size = 120,
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 4-way diagonal arrows crossing in Electric Lime */}
      <g stroke="#000000" strokeWidth="2.5" fill="#C6FF00">
        {/* Top-left arrow */}
        <polygon points="10,10 32,10 24,18 42,36 36,42 18,24 10,32" />
        {/* Top-right arrow */}
        <polygon points="90,10 90,32 82,24 64,42 58,36 76,18 68,10" />
        {/* Bottom-left arrow */}
        <polygon points="10,90 32,90 24,82 42,64 36,58 18,76 10,68" />
        {/* Bottom-right arrow */}
        <polygon points="90,90 68,90 76,82 58,64 64,58 82,76 90,68" />
      </g>
    </svg>
  );
};

// Continuous Neo-Brutalist Marquee Ticker Band
export const MarqueeTicker: React.FC<{
  text?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}> = ({
  text = "WOOSONG CHILLAX CLUB · CHILL TOGETHER · CONNECT ACROSS CULTURES · DAEJEON KOREA · NO AWKWARD VIBES · PLAY & CREATE ·",
  bgColor = "bg-[#C6FF00]",
  textColor = "text-black",
  className = ""
}) => {
  return (
    <div className={`overflow-hidden border-y-[3px] border-black ${bgColor} ${textColor} py-2 select-none ${className}`}>
      <div className="animate-marquee font-display font-black text-sm sm:text-base uppercase tracking-wider flex items-center gap-6 whitespace-nowrap">
        <span>★ {text}</span>
        <span>★ {text}</span>
        <span>★ {text}</span>
        <span>★ {text}</span>
      </div>
    </div>
  );
};

export const StarSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 24,
  color = '#C6FF00',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
      fill={color}
      stroke="#000000"
      strokeWidth="2"
    />
  </svg>
);

export const TapeStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`h-4.5 w-20 bg-white/50 border-y-2 border-black backdrop-blur-xs transform -rotate-6 select-none pointer-events-none ${className}`}
    style={{
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.12) 4px, rgba(0,0,0,0.12) 8px)'
    }}
  />
);

// Large Background Graffiti Spray Doodle (Reference 1 & 2)
export const BackgroundGraffitiDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none absolute select-none ${className}`}
  >
    <path
      d="M50 80 Q180 20 280 120 T420 300 Q550 480 720 220 T650 520 Q480 580 320 460 T120 380 Q40 320 80 200"
      stroke="#C6FF00"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.14"
    />
  </svg>
);

