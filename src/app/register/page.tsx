'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'El nom ha de tenir almenys 2 caràcters.' }),
  lastName: z.string().min(2, { message: 'El cognom ha de tenir almenys 2 caràcters.' }),
  email: z.string().email({ message: 'El format del correu electrònic no és vàlid.' }),
  password: z.string().min(6, { message: 'La contrasenya ha de tenir almenys 6 caràcters.' }),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error de configuració',
        description: 'Els serveis de Firebase no estan disponibles.',
      });
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, {
          id: user.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        });
      }

      toast({
        title: 'Compte creat!',
        description: "T'hem registrat correctament. Ara pots iniciar sessió.",
      });
      
      router.push('/login');

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error en el registre',
        description: error.code === 'auth/email-already-in-use' 
          ? 'Aquest correu electrònic ja està en ús.'
          : error.message || 'Hi ha hagut un problema en crear el teu compte.',
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Crear un Compte</CardTitle>
          <CardDescription>Uneix-te a Global Cargocare.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Joan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cognoms</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correu Electrònic</FormLabel>
                    <FormControl>
                      <Input placeholder="el.teu@correu.com" {...field} />
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
              <Button type="submit" className="w-full">
                Registrar-se
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
              Ja tens un compte?{' '}
              <Link href="/login" className="underline">
                Inicia sessió
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
