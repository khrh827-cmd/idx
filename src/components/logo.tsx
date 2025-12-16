import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F58220' }} />
          <stop offset="100%" style={{ stopColor: '#8DC63F' }} />
        </linearGradient>
      </defs>
      
      {/* --- Anell Exterior --- */}
      <circle cx="50" cy="50" r="49" fill="#F58220" />
      
      {/* --- Anell Interior Blanc --- */}
      <circle cx="50" cy="50" r="46" fill="white" />

      {/* --- Fons Blau del Globus --- */}
      <circle cx="50" cy="50" r="42" fill="#0072CE" />

      {/* --- Gradient amb Màscara de Línies --- */}
      <mask id="globeLines">
        <rect width="100" height="100" fill="white" />
        <g stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none">
          {/* Meridians (Línies Verticals) */}
          <path d="M50 10 V 90" />
          <path d="M30 15 C 35 50, 65 50, 70 85" />
          <path d="M70 15 C 65 50, 35 50, 30 85" />

          {/* Paral·lels (Línies Horitzontals) */}
          <path d="M15 30 Q 50 25, 85 30" />
          <path d="M10 50 H 90" />
          <path d="M15 70 Q 50 75, 85 70" />
        </g>
      </mask>

      <circle cx="50" cy="50" r="42" fill="url(#globeGradient)" mask="url(#globeLines)" />

    </svg>
  );
}
