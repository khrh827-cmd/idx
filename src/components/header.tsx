import Link from 'next/link';
import { Logo } from './logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
