import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#F29100', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#53A646', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        {/* Anell exterior taronja */}
        <circle cx="50" cy="50" r="48" stroke="#F39200" strokeWidth="4" fill="none" />
        {/* Fons circular blau */}
        <circle cx="50" cy="50" r="45" fill="#0072CE" />
        {/* Globus amb gradient */}
        <path
          fill="url(#grad1)"
          d="M50,15.1c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S69.3,15.1,50,15.1z M25.8,50c0-3.3,0.5-6.5,1.5-9.5h45.5
        c1,3,1.5,6.2,1.5,9.5s-0.5,6.5-1.5,9.5H27.3C26.3,56.5,25.8,53.3,25.8,50z M50,83.5c-5.5,0-10.6-1.4-15-3.8V62.2h30v17.5
        C60.6,82.1,55.5,83.5,50,83.5z M65,59.2H35V39.3h30V59.2z M50,16.5c5.5,0,10.6,1.4,15,3.8v17.5H35V20.3
        C39.4,17.9,44.5,16.5,50,16.5z M29,22.2c-2.4,3.2-4.2,7-5.2,11.3h10.1v-9C32.1,23.7,30.4,22.8,29,22.2z M23.8,64.5
        c1,4.3,2.8,8.1,5.2,11.3c1.4-0.6,3.1-1.5,4.8-2.6V64.5H23.8z M66.2,73.2c1.7,1.1,3.4,2,4.8,2.6c2.4-3.2,4.2-7,5.2-11.3H66.2V73.2
        z M76.2,33.5c-1-4.3-2.8-8.1-5.2-11.3c-1.4,0.6-3.1,1.5-4.8,2.6v9H76.2z"
        />
      </g>
    </svg>
  );
}
