import Link from 'next/link';
import { Logo } from './logo';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo className="h-7 w-7" />
            <p className="text-lg font-semibold font-headline">Global Cargocare</p>
          </div>
          <nav className="flex gap-4 mb-4 md:mb-0">
            <Link href="#" className="text-sm hover:underline">Avís Legal</Link>
            <Link href="#" className="text-sm hover:underline">Privacitat</Link>
            <Link href="#" className="text-sm hover Vull tornar al disseny anterior. No vull cap canvi de logo ni cap modificació visual. Deixa-ho com estava abans, amb el logo original i el menú tal com estava.
:underline">Cookies</Link>
          </nav>
          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>© {new Date().getFullYear()} Global Cargocare. Tots els drets reservats.</p>
            <p>ver. 1.0 – data 2 de desembre 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
