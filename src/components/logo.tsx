import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={cn(className)}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#F29100', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#53A646', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        {/* Anell exterior taronja */}
        <circle cx="50" cy="50" r="48" stroke="#F39200" strokeWidth="4" fill="none" />
        {/* Fons blau */}
        <circle cx="50" cy="50" r="45" fill="#0072CE" />
        {/* Globus amb gradient */}
        <circle cx="50" cy="50" r="35" fill="url(#grad1)" />
        {/* Línies de la graella (longitud) */}
        <path d="M50,15 a35,35 0 0,1 0,70" stroke="#0072CE" strokeWidth="5" fill="none" />
        <path d="M37.5,19.2 a35,35 0 0,1 25,0" stroke="#0072CE" strokeWidth="4.5" fill="none" />
        <path d="M26.5,29 a35,35 0 0,1 47,0" stroke="#0072CE" strokeWidth="4" fill="none" />
        <path d="M21,42 a35,35 0 0,1 58,0" stroke="#0072CE" strokeWidth="3.5" fill="none" />
        <path d="M21,58 a35,35 0 0,0 58,0" stroke="#0072CE" strokeWidth="3.5" fill="none" />
        <path d="M26.5,71 a35,35 0 0,0 47,0" stroke="#0072CE" strokeWidth="4" fill="none" />
        <path d="M37.5,80.8 a35,35 0 0,0 25,0" stroke="#0072CE" strokeWidth="4.5" fill="none" />
        {/* Línies de la graella (latitud) */}
        <path d="M15,50 a35,35 0 0,1 70,0" stroke="#0072CE" strokeWidth="5" fill="none" />
        <path d="M22,25 a35,35 0 0,1 56,0" stroke="#0072CE" strokeWidth="4" fill="none" />
        <path d="M31.5,17.5 a35,35 0 0,1 37,0" stroke="#0072CE" strokeWidth="4" fill="none" />
        <path d="M22,75 a35,35 0 0,0 56,0" stroke="#0072CE" strokeWidth="4" fill="none" />
        <path d="M31.5,82.5 a35,35 0 0,0 37,0" stroke="#0072CE" strokeWidth="4" fill="none" />
      </g>
    </svg>
  );
}
