import type { Metadata } from "next";
import { Inter, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeadline = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '700',
});

export const metadata: Metadata = {
  title: "Global Cargocare - Logística Internacional",
  description: "Solucions integrals de transport marítim, terrestre i magatzematge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
       <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeadline.variable)}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
