'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'El camp d\'usuari és obligatori.' }),
  password: z.string().min(1, { message: 'El camp de contrasenya és obligatori.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    const apiUrl = `https://sheetdb.io/api/v1/2kd07izw1k26k/search?usuari=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}&sheet=usuaris`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Hi ha hagut un problema amb la connexió a la base de dades.');
      }
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('user', JSON.stringify({ name: user.nom, company: user.empresa }));
        router.push('/dashboard');
      } else {
        setError('Les dades introduïdes són incorrectes. Si us plau, torna a intentar-ho.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ha ocorregut un error inesperat.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Iniciar Sessió</CardTitle>
          <CardDescription>Accedeix a la teva àrea de client.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuari</FormLabel>
                    <FormControl>
                      <Input placeholder="El teu usuari" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrasenya</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrant...' : 'Entrar'}
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center text-sm">
              No tens un compte?{' '}
              <Link href="/register" className="underline">
                Registra't
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
