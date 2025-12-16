import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#F58220' }} />
          <stop offset="100%" style={{ stopColor: '#8DC63F' }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill="none" stroke="#F58220" strokeWidth="2" />
      <circle cx="50" cy="50" r="45" fill="#0072CE" />
      <mask id="globeMask">
        <rect width="100" height="100" fill="white" />
        <g stroke="black" strokeWidth="4" strokeLinecap="round">
          {/* Vertical lines */}
          <path d="M50 10 V 90" />
          <path d="M30 15 C 30 50, 70 50, 70 85" />
          <path d="M70 15 C 70 50, 30 50, 30 85" />

          {/* Horizontal lines */}
          <path d="M15 30 Q 50 25, 85 30" />
          <path d="M10 50 H 90" />
          <path d="M15 70 Q 50 75, 85 70" />
        </g>
      </mask>
      <circle cx="50" cy="50" r="40" fill="url(#globeGradient)" mask="url(#globeMask)" />
    </svg>
  );
}
