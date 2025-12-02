'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Home, Briefcase, Users, Mail, Newspaper, User as UserIcon, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, Fragment, useEffect } from 'react';
import { Logo } from './logo';
import { useUser, useAuth } from '@/firebase';

const navLinks = [
  { href: '/', label: 'Inici', icon: <Home className="h-5 w-5" /> },
  { href: '/services', label: 'Serveis', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/about', label: 'Qui Som', icon: <Users className="h-5 w-5" /> },
  { href: '/contact', label: 'Contacte', icon: <Mail className="h-5 w-5" /> },
  { href: '/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    setIsSheetOpen(false);
    router.push('/');
  };

  const userAreaActive = pathname.startsWith('/client-area') || pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/register');

  const desktopAuthLinks = (
    <div className="flex items-center gap-2">
       <Button variant="ghost" asChild>
        <Link href="/client-area" className={cn(userAreaActive ? 'font-semibold' : '')}>
            <UserIcon className="mr-2 h-4 w-4" />Àrea Clients
        </Link>
      </Button>
      {!isClient || isUserLoading ? (
        <div className="h-9 w-44 rounded-md bg-gray-200 animate-pulse" />
      ) : user ? (
        <>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Panell
            </Link>
          </Button>
          <Button onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sortir
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sessió</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Registrar-se</Link>
          </Button>
        </>
      )}
    </div>
  );

  const mobileAuthLinks = (
    <>
      {!isClient || isUserLoading ? (
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
            Global Cargocare
            </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:flex">
            {desktopAuthLinks}
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0">
                <div className="border-b p-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Logo className="h-8 w-8" />
                      <span className="font-bold font-headline text-lg">Global Cargocare</span>
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
                         <SheetClose asChild>
                            <Link
                            href="/client-area"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                            <UserIcon />
                            Àrea Clients
                            </Link>
                        </SheetClose>
                        <div className="my-2 border-t -mx-4"></div>
                        {mobileAuthLinks}
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
