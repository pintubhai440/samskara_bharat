import React from 'react';
import { Language } from '../types';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  currentLang?: Language;
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  currentLang = 'en',
  showSubtitle = false,
  className = '',
}) => {
  // Dimensions calibrated so the symbol is prominent, recognizable, and balanced
  const symbolDimensions = {
    sm: { width: 44, height: 44 },
    md: { width: 62, height: 62 },
    lg: { width: 84, height: 84 },
    hero: { width: 116, height: 116 },
  }[size];

  const titleSizes = {
    sm: 'text-sm sm:text-base font-bold tracking-tight',
    md: 'text-lg sm:text-xl font-bold tracking-tight',
    lg: 'text-xl sm:text-2xl font-extrabold tracking-tight',
    hero: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight',
  }[size];

  const getLocalizedName = () => {
    switch (currentLang) {
      case 'te':
        return 'సంస్కార భారత్';
      case 'hi':
        return 'संस्कार भारत';
      default:
        return 'Samskara Bharat';
    }
  };

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      {/* 
        Premium Modern Vector Logo:
        - Pure SVG with 100% transparent background
        - Clean, graceful silhouettes of an elder and a child
        - Child visibly bending forward in respectful Namaskara with joined hands (Anjali Mudra) and bowed head
        - Clean-shaven elder with raised blessing hand
        - Elegant soft Indian-inspired arch with saffron (#FF9933), fresh green (#22A06B), and subtle gold (#FFD166)
        - Distinct and unmistakable at all sizes
      */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-103 duration-200"
        style={{ width: symbolDimensions.width, height: symbolDimensions.height }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xs"
          aria-label="Samskara Bharat Emblem: Child respectfully performing Namaskara before elder"
        >
          <defs>
            {/* Saffron to Green Subtle Gradient for the Arch Frame */}
            <linearGradient id="sbArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="65%" stopColor="#FFB347" />
              <stop offset="100%" stopColor="#22A06B" />
            </linearGradient>

            {/* Warm Sunlight Glow between elder and child */}
            <radialGradient id="sbCenterGlow" cx="50%" cy="46%" r="38%">
              <stop offset="0%" stopColor="#FFD166" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#FF9933" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="elderVestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#E67E22" />
            </linearGradient>

            <linearGradient id="childShirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22A06B" />
              <stop offset="100%" stopColor="#1B8256" />
            </linearGradient>
          </defs>

          {/* 1. Subtle, Elegant Arch Outline (Indian Torana Inspired, Minimalist) */}
          <path
            d="M 18 90 
               L 18 46 
               C 18 24, 34 10, 50 10 
               C 66 10, 82 24, 82 46 
               L 82 90"
            stroke="url(#sbArchGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Subtle Golden Inner Arc */}
          <path
            d="M 24 88 
               L 24 48 
               C 24 30, 36 18, 50 18 
               C 64 18, 76 30, 76 48 
               L 76 88"
            stroke="#FFD166"
            strokeWidth="1"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Clean Fresh Green Grounding Base Arc */}
          <path
            d="M 14 90 C 34 94, 66 94, 86 90"
            stroke="#22A06B"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Soft Warm Sun of Wisdom in Background */}
          <circle cx="50" cy="46" r="15" fill="url(#sbCenterGlow)" />

          {/* ========================================================
              2. THE ELDER (Left Side)
              - Clean-shaven, dignified, approachable
              - Standing tall with gentle forward warmth
              - Saffron Nehru vest and cream attire
              - Raised right hand gently extended in blessing
             ======================================================== */}
          <g id="vector-elder">
            {/* Neat contemporary salt-and-pepper / dark hair */}
            <path
              d="M 31 28 
                 C 27 28, 24 31, 24 35 
                 C 24 38, 26 41, 28 41 
                 C 28 38, 30 34, 35 33 
                 C 37 30, 35 28, 31 28 Z"
              fill="#17324D"
            />

            {/* Clean-shaven, dignified head */}
            <circle cx="33" cy="36" r="6.8" fill="#FFB347" />

            {/* Gentle smile and eye expression */}
            <path
              d="M 36 36.5 C 38 38, 37 40, 34 41"
              stroke="#E67E22"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="35.5" cy="35" r="0.8" fill="#17324D" />

            {/* Saffron Nehru Vest over Kurta */}
            <path
              d="M 23 48 
                 C 27 45, 38 45, 42 49 
                 L 44 72 
                 L 22 72 
                 C 22 64, 22 55, 23 48 Z"
              fill="url(#elderVestGrad)"
            />

            {/* Neat Nehru Collar */}
            <path
              d="M 29 45 C 33 43, 37 43, 40 46 L 39 49 C 36 47, 33 47, 31 49 Z"
              fill="#17324D"
            />

            {/* Blessing Right Arm & Raised Open Hand */}
            <path
              d="M 38 51 
                 C 44 51, 49 48, 54 44 
                 C 55 42, 57 43, 57 46 
                 C 52 53, 46 56, 40 57 Z"
              fill="url(#elderVestGrad)"
            />
            {/* Open gentle blessing palm */}
            <ellipse 
              cx="56.5" 
              cy="43.5" 
              rx="3" 
              ry="4.2" 
              fill="#FFB347" 
              transform="rotate(22 56.5 43.5)" 
            />

            {/* Lower attire in clean white/cream */}
            <rect x="23" y="72" width="20" height="16" fill="#FFFFFF" rx="1.5" stroke="#17324D" strokeWidth="1" />
          </g>

          {/* ========================================================
              3. THE CHILD (Right Side)
              - Unmistakable Namaskara / Pranama posture:
                Upper body visibly bending forward from the waist
              - Head lowered reverently
              - Hands joined together in Anjali Mudra (folded palms)
              - Contemporary student attire in Fresh Green & White
             ======================================================== */}
          <g id="vector-child">
            {/* Child's Head: Bowed reverently forward */}
            <circle cx="68" cy="45" r="5.6" fill="#FFB347" />

            {/* Neat student hair */}
            <path
              d="M 64 42 
                 C 66 38, 72 38, 75 42 
                 C 75 47, 73 48, 71 47 
                 C 70 44, 66 44, 64 42 Z"
              fill="#17324D"
            />

            {/* Peaceful reverent facial expression */}
            <path
              d="M 66 46 C 65 48, 64 48, 63 47"
              stroke="#E67E22"
              strokeWidth="0.75"
              strokeLinecap="round"
              fill="none"
            />

            {/* Child Torso: Visibly bending forward from the waist at ~35 degrees */}
            <path
              d="M 70 52 
                 C 64 53, 58 58, 56 64 
                 L 64 80 
                 L 75 75 
                 C 76 66, 75 57, 70 52 Z"
              fill="url(#childShirtGrad)"
            />

            {/* White student collar */}
            <path d="M 68 52 L 65 57 L 71 56 Z" fill="#FFFFFF" />

            {/* Arms extending forward gracefully with hands joined in Namaskara */}
            <path
              d="M 60 60 
                 C 56 58, 53 56, 51 53 
                 L 53 51 
                 C 56 54, 60 56, 63 57 Z"
              fill="url(#childShirtGrad)"
            />

            {/* Joined Hands / Palms in Anjali Mudra (Folded Palms) */}
            <ellipse 
              cx="50.5" 
              cy="51" 
              rx="2.4" 
              ry="4" 
              fill="#FFD166" 
              stroke="#FF9933" 
              strokeWidth="0.8" 
              transform="rotate(-30 50.5 51)" 
            />

            {/* Neat Student Trousers */}
            <path
              d="M 64 80 
                 L 60 88 
                 L 73 88 
                 L 75 75 Z"
              fill="#17324D"
            />
          </g>

          {/* ========================================================
              4. SUBTLE SPROUT OF VALUES (Center Base)
             ======================================================== */}
          <g id="sprout" transform="translate(46, 76)">
            <circle cx="4" cy="11" r="1.5" fill="#FFD166" />
            <path d="M 4 10 C 1 7, 1 4, 4 2 C 5 5, 5 8, 4 10 Z" fill="#22A06B" />
            <path d="M 4 10 C 7 8, 8 5, 6 3 C 5 6, 4 8, 4 10 Z" fill="#FF9933" />
          </g>
        </svg>
      </div>

      {/* Brand Name: Samskara Bharat (Clean, modern, readable typography) */}
      <div className="flex flex-col justify-center">
        <span className={`${titleSizes} font-heading text-[#17324D] leading-tight tracking-tight`}>
          {getLocalizedName()}
        </span>
        {showSubtitle && (
          <span className="text-[11px] sm:text-xs font-semibold text-[#22A06B] tracking-wide mt-0.5">
            Indian Heritage · Modern EdTech (LKG - 10)
          </span>
        )}
      </div>
    </div>
  );
};
