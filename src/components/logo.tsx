import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FDD835', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6DB33F', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Anell exterior groc */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="#FDB813" strokeWidth="6" />
      
      {/* Anell interior blau */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#0072CE" strokeWidth="8" />

      {/* Fons amb degradat */}
      <circle cx="50" cy="50" r="35" fill="url(#grad1)" />

      {/* Línies de la quadrícula blaves */}
      <line x1="30" y1="50" x2="70" y2="50" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="30" x2="50" y2="70" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="30" x2="70" y2="30" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="70" x2="70" y2="70" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="30" x2="30" y2="70" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
      <line x1="70" y1="30" x2="70" y2="70" stroke="#0072CE" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
