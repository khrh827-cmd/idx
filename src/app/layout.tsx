import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
