import Link from 'next/link';
import { Logo } from './logo';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="#" className="text-gray-300 hover:underline">Avís Legal</Link>
            <Link href="#" className="text-gray-300 hover:underline">Privacitat</Link>
            <Link href="#" className="text-gray-300 hover:underline">Cookies</Link>
          </nav>

          <p className="text-center text-sm text-gray-400 md:text-right">
            © 2025 Global Cargocare. Tots els drets reservats. ver. 1.0 – data 2 de desembre 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
