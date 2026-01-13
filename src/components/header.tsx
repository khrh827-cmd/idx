'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Home, Briefcase, Users, Mail, Newspaper, LogIn, UserPlus, LayoutDashboard, LogOut, Truck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, Fragment, useEffect } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useAuth } from '@/firebase';
import { Logo } from './logo';

const navLinks = [
  { href: '/', label: 'Inici', icon: <Home className="h-5 w-5" /> },
  { href: '/services', label: 'Serveis', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/about', label: 'Qui Som', icon: <Users className="h-5 w-5" /> },
  { href: '/tracking', label: 'Seguiment', icon: <Truck className="h-5 w-5" /> },
  { href: '/contact', label: 'Contacte', icon: <Mail className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isLoading } = useUser();
  const auth = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    if (auth) {
        await auth.signOut();
    }
    setIsSheetOpen(false);
    router.push('/');
  };

  const desktopAuthLinks = (
    <div className="flex items-center gap-2">
      {!isClient || isLoading ? (
         <>
            <div className="h-9 w-24 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-9 w-28 rounded-md bg-gray-200 animate-pulse" />
        </>
      ) : user ? (
        <>
          <Button variant="outline" asChild>
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
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sessió</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/register">Registrar-se</Link>
          </Button>
        </>
      )}
    </div>
  );

  const mobileAuthLinks = (
    <>
      {!isClient || isLoading ? (
        <div className="flex flex-col gap-2 px-3">
            <div className="h-9 w-full rounded-md bg-gray-200 animate-pulse" />
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
        <div className="flex flex-col gap-2 px-3">
          <SheetClose asChild>
            <Button asChild variant="outline">
                <Link href="/login" className="w-full">
                <LogIn className="mr-2"/> Iniciar Sessió
                </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild>
                <Link href="/register" className="w-full">
                <UserPlus className="mr-2"/> Registrar-se
                </Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors text-foreground/70 hover:text-foreground',
                pathname === link.href && 'text-foreground'
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
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground">
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
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
