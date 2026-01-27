import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/LOGO_K_R_MINI.png" 
      alt="Global Cargocare Logo" 
      width={80} 
      height={24} 
      className={className}
      unoptimized
    />
  );
}
