'use client';

import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import './scss/index.scss';
import "./scss/base/_globals.scss";
import { SessionProvider } from 'next-auth/react';
import Footer from "./components/Footer/Footer";
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
          <div className="mx-auto px-4 py-8">
            <SessionProvider>
              {children}
            </SessionProvider>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
