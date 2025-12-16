import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  // Aquest component es deixa intencionadament buit per eliminar el logo.
  return <div className={cn(className)} />;
}
