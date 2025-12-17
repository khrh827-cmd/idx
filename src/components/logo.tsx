import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  // Assuming the new logo file is named 'logo-nuevo.png' and placed in the /public directory.
  // The user referred to "LOGO NUEVO (KHAOULARHOULI)". We'll use a sanitized name.
  return (
    <Image 
      src="/logo-nuevo.png" 
      alt="Global Cargocare Logo" 
      width={48} 
      height={48} 
      className={className}
      unoptimized
    />
  );
}
