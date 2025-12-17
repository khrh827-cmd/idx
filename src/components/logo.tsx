import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/logokhaoula.png" 
      alt="Global Cargocare Logo" 
      width={160} 
      height={48} 
      className={className}
    />
  );
}
