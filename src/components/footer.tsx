import Link from 'next/link';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Globe className="h-6 w-6 text-white" />
            <p className="text-lg font-semibold font-headline">Global Cargocare</p>
          </div>
          <nav className="flex gap-4 mb-4 md:mb-0">
            <Link href="#" className="text-sm hover:underline">Avís Legal</Link>
            <Link href="#" className="text-sm hover:underline">Privacitat</Link>
            <Link href="#" className="text-sm hover:underline">Cookies</Link>
          </nav>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Global Cargocare. Tots els drets reservats.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
