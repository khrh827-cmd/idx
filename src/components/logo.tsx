import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      {/* Anell exterior blau fosc */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#003366" strokeWidth="4" />
      
      {/* Fons blanc */}
      <circle cx="50" cy="50" r="42" fill="white" />
      
      {/* Globus terraqüi estilitzat */}
      <path
        fill="#0072CE"
        d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z M50,75c-13.81,0-25-11.19-25-25
	s11.19-25,25-25s25,11.19,25,25S63.81,75,50,75z"
      />
      {/* Línies de meridià i paral·lel */}
      <path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        d="M50,15v70 M15,50h70 M27.5,27.5c11.25-6.49,23.75-6.49,35,0 M27.5,72.5c11.25,6.49,23.75,6.49,35,0"
      />
       <path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        d="M50,15c-9.62,0-18.4,3.92-24.75,10.25 M50,15c9.62,0,18.4,3.92,24.75,10.25"
      />
       <path
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        d="M50,85c-9.62,0-18.4-3.92-24.75-10.25 M50,85c9.62,0,18.4-3.92,24.75-10.25"
      />
    </svg>
  );
}
