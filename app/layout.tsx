import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanRoots",
  description: "UrbanRoots, la plateforme de jardinage urbain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" dir="ltr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
