import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FDB813' }} />
          <stop offset="100%" style={{ stopColor: '#00A651' }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#FDB813" strokeWidth="4" />
      <circle cx="50" cy="50" r="42" fill="#0072CE" />
      <path
        d="M50,12 C69.33,12 85,29.67 85,50 C85,70.33 69.33,88 50,88 C30.67,88 15,70.33 15,50 C15,29.67 30.67,12 50,12 Z M25,50 C25,38.95 35.95,30 50,30 C64.05,30 75,38.95 75,50 C75,61.05 64.05,70 50,70 C35.95,70 25,61.05 25,50 Z"
        fill="url(#globe-gradient)"
        opacity="0.9"
      />
      <line x1="20" y1="35" x2="80" y2="35" stroke="#0072CE" strokeWidth="3" />
      <line x1="20" y1="65" x2="80" y2="65" stroke="#0072CE" strokeWidth="3" />
      <line x1="35" y1="20" x2="35" y2="80" stroke="#0072CE" strokeWidth="3" />
      <line x1="65" y1="20" x2="65" y2="80" stroke="#0072CE" strokeWidth="3" />
    </svg>
  );
}