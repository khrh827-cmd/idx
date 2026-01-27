import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/LOGO_K_R_MINI.png" 
      alt="Global Cargocare Logo" 
      width={134} 
      height={40} 
      className={className}
      unoptimized
    />
  );
}
