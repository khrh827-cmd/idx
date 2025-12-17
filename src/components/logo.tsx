import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/logo.png" 
      alt="Global Cargocare Logo" 
      width={48} 
      height={48} 
      className={className}
    />
  );
}
