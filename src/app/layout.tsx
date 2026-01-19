import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const roboto_slab = Roboto_Slab({ subsets: ["latin"], weight: '700', variable: '--font-headline' });

export const metadata: Metadata = {
  title: "App Bàsica",
  description: "Una aplicació bàsica de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${inter.variable} ${roboto_slab.variable}`}>
      <body className={`flex flex-col min-h-screen font-sans`}>
        <FirebaseClientProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
