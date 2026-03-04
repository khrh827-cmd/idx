'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Home, Briefcase, Users, Mail, Newspaper, LogOut, Truck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Logo } from './logo';

const navLinks = [
  { href: '/', label: 'Inici', icon: <Home className="h-5 w-5" /> },
  { href: '/services', label: 'Serveis', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/about', label: 'Qui Som', icon: <Users className="h-5 w-5" /> },
  { href: '/tracking', label: 'Seguiment', icon: <Truck className="h-5 w-5" /> },
  { href: '/contact', label: 'Contacte', icon: <Mail className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
];

type LocalUser = {
  nom_usuari: string;
  usuari?: string;
  empresa: string;
  rol: 'administrador' | 'treballador';
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [user, setUser] = useState<LocalUser | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const checkUser = () => {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && typeof parsedUser === 'object' && 'nom_usuari' in parsedUser) {
              setUser(parsedUser as LocalUser);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      };

      checkUser();
      window.addEventListener('userChanged', checkUser);
      return () => window.removeEventListener('userChanged', checkUser);
    }
  }, [hasMounted]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    router.push('/login');
  };

  const isUserLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Logo />
        </Link>
        
        {/* Només mostrem la navegació si l'usuari NO està loguejat */}
        {!isUserLoggedIn && (
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors text-primary-foreground/80 hover:text-primary-foreground',
                  pathname === link.href && 'font-semibold text-primary-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center ml-auto">
          {hasMounted && isUserLoggedIn ? (
            <Button onClick={handleSignOut} variant="destructive" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Sortir
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="link" asChild className="text-primary-foreground">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild variant="cta" size="sm">
                <Link href="/register">Registrar-se</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Només mostrem els links si NO està loguejat al mòbil també */}
                  {!isUserLoggedIn && navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                        <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2",
                          pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground"
                        )}
                        >
                        {link.icon}
                        {link.label}
                        </Link>
                    </SheetClose>
                  ))}
                  
                  <div className="border-t pt-4">
                    {isUserLoggedIn ? (
                      <Button onClick={handleSignOut} variant="destructive" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Sortir
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Entrar</Link>
                        </Button>
                        <Button asChild variant="cta" className="w-full">
                          <Link href="/register">Registrar-se</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
            </SheetContent>
          </Sheet>
      </div>
    </header>
  );
}
