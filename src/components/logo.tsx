import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="grad_logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F29100', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#53A646', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#F39200" />
      <circle cx="50" cy="50" r="45" fill="#0a2a4a" />
      <path
        d="M50,15
           C30,15 15,30 15,50
           C15,70 30,85 50,85
           C70,85 85,70 85,50
           C85,30 70,15 50,15 Z"
        fill="url(#grad_logo)"
      />
      <path
        d="M50,15
           C60,25 65,38 65,50
           C65,62 60,75 50,85
           C40,75 35,62 35,50
           C35,38 40,25 50,15 Z"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="28" y1="30" x2="72" y2="70" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="28" y1="70" x2="72" y2="30" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
}
