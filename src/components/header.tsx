'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Home, Briefcase, Users, Mail, Newspaper, LogIn, LayoutDashboard, LogOut, Truck, UserPlus, FileText } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Logo } from './logo';

const navLinks = [
  { href: '/', label: 'Inici', icon: <Home className="h-5 w-5" /> },
  { href: '/services', label: 'Serveis', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/about', label: 'Qui Som', icon: <Users className="h-5 w-5" /> },
  { href: '/tracking', label: 'Seguiment', icon: <Truck className="h-5 w-5" /> },
  { href: '/documents', label: 'Documents', icon: <FileText className="h-5 w-5" /> },
  { href: '/contact', label: 'Contacte', icon: <Mail className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
];

type LocalUser = {
  nom_usuari: string;
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
            if (parsedUser && typeof parsedUser === 'object' && 'nom_usuari' in parsedUser && 'rol' in parsedUser) {
              setUser(parsedUser as LocalUser);
            } else {
              localStorage.removeItem('user');
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to parse user from localStorage', error);
          localStorage.removeItem('user');
          setUser(null);
        }
      };

      checkUser();

      window.addEventListener('storage', checkUser);
      window.addEventListener('userChanged', checkUser);

      return () => {
        window.removeEventListener('storage', checkUser);
        window.removeEventListener('userChanged', checkUser);
      };
    }
  }, [hasMounted]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    setIsSheetOpen(false);
    router.push('/login');
  };

  const desktopAuthLinks = (
    <div className="flex items-center gap-2">
      {!hasMounted ? (
         <>
            <div className="h-9 w-28 rounded-md bg-white/20 animate-pulse" />
        </>
      ) : user ? (
        <>
          <Button variant="success" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Panell
            </Link>
          </Button>
          <Button onClick={handleSignOut} variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sortir
          </Button>
        </>
      ) : (
        <>
          <Button variant="link" asChild className="text-primary-foreground">
            <Link href="/login">Iniciar sessió</Link>
          </Button>
          <Button asChild variant="cta">
            <Link href="/register">Registrar-se</Link>
          </Button>
        </>
      )}
    </div>
  );

  const mobileAuthLinks = (
    <>
      {!hasMounted ? (
        <div className="flex flex-col gap-2 px-3">
            <div className="h-9 w-full rounded-md bg-gray-200 animate-pulse" />
        </div>
      ) : user ? (
        <>
          <SheetClose asChild>
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LayoutDashboard /> Panell de Client
            </Link>
          </SheetClose>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
             <LogOut /> Tancar Sessió
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4 px-3">
            <SheetClose asChild>
                <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <LogIn className="h-5 w-5" /> Iniciar Sessió
                </Link>
            </SheetClose>
            <SheetClose asChild>
                <Button asChild variant="cta" className="w-full">
                    <Link href="/register">
                        <UserPlus className="mr-2 h-5 w-5"/> Registrar-se
                    </Link>
                </Button>
            </SheetClose>
        </div>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Logo />
        </Link>
        
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

        <div className="hidden md:flex items-center ml-auto">
            {desktopAuthLinks}
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0 bg-background">
                <div className="border-b p-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Logo />
                    </Link>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                        <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                          pathname === link.href
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                        >
                        {link.icon}
                        {link.label}
                        </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto border-t p-4">
                    <div className="flex flex-col gap-2">
                        {mobileAuthLinks}
                    </div>
                </div>
            </SheetContent>
          </Sheet>
      </div>
    </header>
  );
}
