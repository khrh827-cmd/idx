import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      {/* Anell exterior taronja */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#F58220" strokeWidth="4" />
      
      {/* Fons blau */}
      <circle cx="50" cy="50" r="42" fill="#0072CE" />
      
      {/* Globus amb gradient */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F58220', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8DC63F', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#grad1)"
        d="M50,10c-22.09,0-40,17.91-40,40s17.91,40,40,40s40-17.91,40-40S72.09,10,50,10z M78.33,50
	c0,4.89-1.39,9.45-3.81,13.26L50,63.26V36.74l24.52-13.26C76.94,27.35,78.33,32.9,78.33,50z M50,13.62
	c5.44,0,10.49,1.4,14.8,3.81L50,27.18l-14.8-9.75C39.51,15.02,44.56,13.62,50,13.62z M21.67,50c0-6.1,2.34-11.66,6.19-15.86
	l16.14,9.12v33.48l-16.14-9.12C24.01,61.66,21.67,56.1,21.67,50z M50,86.38c-5.44,0-10.49-1.4-14.8-3.81L50,72.82l14.8,9.75
	C60.49,84.98,55.44,86.38,50,86.38z"
      />
    </svg>
  );
}
