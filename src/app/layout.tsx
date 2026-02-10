import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const montserrat = Montserrat({ subsets: ["latin"], weight: '700', variable: '--font-headline' });

export const metadata: Metadata = {
  title: "Cargocare",
  description: "Experts en transport internacional marítim, terrestre i aeri. La teva aliança estratègica per a una logística sense fronteres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${inter.variable} ${montserrat.variable}`}>
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
