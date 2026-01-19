import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`font-bold text-xl ${className}`}>
      Global Cargocare
    </span>
  );
}
