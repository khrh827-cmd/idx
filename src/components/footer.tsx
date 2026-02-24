import Link from 'next/link';
import { Logo } from './logo';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm text-primary-foreground/70">
              Solucions logístiques integrals: Seguretat, velocitat i confiança global.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Enllaços</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Inici</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Serveis</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Sobre Nosaltres</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Contacte</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Política de Privacitat</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Avís Legal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contacte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@cargocare.cat" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">
                  info@cargocare.cat
                </a>
              </li>
            </ul>
            <h4 className="mb-4 mt-6 font-semibold">Xarxes Socials</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-sm text-primary-foreground/70">
            © 2025 Cargocare. Tots els drets reservats. ver. 1.0 – data 2 de desembre 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
