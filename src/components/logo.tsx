import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 50"
      className={cn(className)}
      aria-label="Global Cargo Care Logo"
    >
      <defs>
        <linearGradient id="globe-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#F29100' }} />
          <stop offset="100%" style={{ stopColor: '#53A646' }} />
        </linearGradient>
      </defs>

      {/* Icon */}
      <g transform="translate(0, 0) scale(0.48)">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#F39200" strokeWidth="4" />
        <circle cx="50" cy="50" r="44" fill="#0072CE" />
        <path
          fill="url(#globe-gradient)"
          d="M50,15.1c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S69.3,15.1,50,15.1z M25.8,50c0-3.3,0.5-6.5,1.5-9.5h45.5 c1,3,1.5,6.2,1.5,9.5s-0.5,6.5-1.5,9.5H27.3C26.3,56.5,25.8,53.3,25.8,50z M50,83.5c-5.5,0-10.6-1.4-15-3.8V62.2h30v17.5 C60.6,82.1,55.5,83.5,50,83.5z M65,59.2H35V39.3h30V59.2z M50,16.5c5.5,0,10.6,1.4,15,3.8v17.5H35V20.3 C39.4,17.9,44.5,16.5,50,16.5z"
        />
      </g>

      {/* Text */}
      <text x="55" y="32" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">
        <tspan fill="#0072CE">GLOBAL</tspan>
        <tspan fill="#F39200" dx="5">CARGO</tspan>
        <tspan fill="#F39200" dx="5">CARE</tspan>
      </text>
    </svg>
  );
}
