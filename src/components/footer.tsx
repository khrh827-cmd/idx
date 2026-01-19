import Link from 'next/link';
import { Logo } from './logo';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            © 2025 Global Cargocare. Tots els drets reservats.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
