'use client';

import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import './scss/index.scss';
import { SessionProvider } from 'next-auth/react';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <SessionProvider>
              {children}
            </SessionProvider>
          </div>
        </div>
        <footer className="text-center">
          This is the footer
        </footer>
      </body>
    </html>
  );
}
