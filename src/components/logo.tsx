import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="swirl1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FDB813' }} />
          <stop offset="100%" style={{ stopColor: '#F58220' }} />
        </linearGradient>
        <linearGradient id="swirl2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00A651' }} />
          <stop offset="100%" style={{ stopColor: '#8DC63F' }} />
        </linearGradient>
         <linearGradient id="swirl3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0072CE' }} />
          <stop offset="100%" style={{ stopColor: '#00AEEF' }} />
        </linearGradient>
      </defs>
      <g transform="translate(50,50) scale(0.9)">
        <path d="M0-45 A45 45 0 0 1 0 45 A45 45 0 0 1 0-45" fill="none" />
        <path d="M-35,35 A50 50 0 0 1 35,-35" stroke="url(#swirl1)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M-40,15 A50 50 0 0 1 40,-15" stroke="url(#swirl3)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M-40,-10 A50 50 0 0 0 40,10" stroke="url(#swirl2)" strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
