'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

const API_URL = 'https://sheetdb.io/api/v1/pxnx6b606vc93';

export default function LoginPage() {
  const router = useRouter();
  const [usuari, setUsuari] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuari || !password) {
        setError('Tots els camps són obligatoris.');
        setIsLoading(false);
        return;
    }

    try {
      // Cerquem a la pestanya 'usuaris' segons les columnes del teu Excel
      const response = await fetch(`${API_URL}/search?usuari=${encodeURIComponent(usuari)}&password=${encodeURIComponent(password)}&sheet=usuaris`);
      if (!response.ok) {
        throw new Error('Error en la connexió amb el servidor.');
      }
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        // Guardar dades a localStorage. Utilitzem 'treballador' com a nom de visualització.
        localStorage.setItem('user', JSON.stringify({
          nom_usuari: user.treballador || user.usuari, 
          usuari: user.usuari,
          empresa: user.empresa,
          rol: user.rol
        }));
        window.dispatchEvent(new Event('userChanged')); 
        router.push('/dashboard');
      } else {
        setError('Dades incorrectes. Si us plau, verifica el teu usuari i contrasenya.');
      }
    } catch (e) {
      console.error(e);
      setError('Ha ocorregut un error. Intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-muted py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Benvingut de nou</CardTitle>
          <CardDescription>Introdueix les teves dades per accedir al teu panell.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">Usuari</Label>
                <Input
                id="username"
                type="text"
                placeholder="El teu nom d'usuari"
                value={usuari}
                onChange={(e) => setUsuari(e.target.value)}
                disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input
                id="password"
                type="password"
                placeholder="La teva contrasenya"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                />
            </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                {error && (
                    <div className="w-full flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        <p>{error}</p>
                    </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Entrar
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
