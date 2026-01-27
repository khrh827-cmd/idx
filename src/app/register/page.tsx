'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93?sheet=usuaris';

export default function RegisterPage() {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [usuari, setUsuari] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!nom || !empresa || !usuari || !password) {
      setError('Tots els camps són obligatoris.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    nom: nom,
                    empresa: empresa,
                    usuari: usuari,
                    password: password,
                    rol: 'treballador'
                }
            ]
        })
      });

      if (response.ok) {
        setSuccess('Registre completat! Ara pots iniciar sessió.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Error en el registre.');
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Ha ocorregut un error. Intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50/90 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crear un Compte</CardTitle>
          <CardDescription>Introdueix les teves dades per registrar-te.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet</Label>
              <Input id="name" value={nom} onChange={(e) => setNom(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" value={empresa} onChange={(e) => setEmpresa(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'usuari</Label>
              <Input id="username" value={usuari} onChange={(e) => setUsuari(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contrasenya</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {error && (
              <div className="w-full flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
            {success && (
                <div className="w-full flex items-center gap-2 p-3 text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p>{success}</p>
                </div>
            )}
            <Button type="submit" className="w-full bg-blue-900 text-white hover:bg-blue-900/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrar-se
            </Button>
             <p className="text-xs text-center text-muted-foreground">
                Ja tens un compte?{' '}
                <Link href="/login" className="underline underline-offset-2 hover:text-primary">
                    Inicia sessió
                </Link>
             </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
