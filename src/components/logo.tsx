import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      className={cn(className)} 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
    >
      <defs>
        <linearGradient id="globeGradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#F08D00' }} />
          <stop offset="50%" style={{ stopColor: '#A4C639' }} />
          <stop offset="100%" style={{ stopColor: '#00A651' }} />
        </linearGradient>
      </defs>
      
      {/* Outer orange ring */}
      <circle cx="100" cy="100" r="98" fill="none" stroke="#F08D00" strokeWidth="4" />
      
      {/* Inner white ring */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeWidth="4" />

      {/* Blue background circle */}
      <circle cx="100" cy="100" r="88" fill="#1E73BE" />

      {/* Globe grid */}
      <g fill="url(#globeGradient)">
        <path d="M100 12 A 88 88 0 0 1 100 188 A 88 88 0 0 1 100 12 Z M 100 20 A 80 80 0 0 1 100 180 A 80 80 0 0 1 100 20 Z" fill="#1E73BE" />
        <path d="M100 12 a 120 120 0 0 0 0 176 a 120 120 0 0 0 0 -176" fill="url(#globeGradient)" />
        
        {/* Vertical lines */}
        <path d="M141,31.5a100,100 0 0,0-82,0 L70,170 a100,100 0 0,0 60,0z" />
        <path d="M169.5,60a120,120 0 0,0-139,0 L48,140 a120,120 0 0,0 104,0z" />
        
        {/* Horizontal lines */}
        <path d="M 25,75 a 100 100 0 0 0 150 0 a 100 100 0 0 0 -150 0" />
        <path d="M 20,100 a 100 100 0 0 0 160 0 a 100 100 0 0 0 -160 0" />
        <path d="M 25,125 a 100 100 0 0 0 150 0 a 100 100 0 0 0 -150 0" />
      </g>
    </svg>
  );
}
