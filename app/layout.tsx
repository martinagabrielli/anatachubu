import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import './scss/index.scss';

const roboto = Roboto({
  weight: ['400', '700'], // Specify the font weights you need
  subsets: ['latin'],     // Subsets to support
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Anatachubu",
  description: "The best video platform",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </div>
        <footer className="text-center">
          This is the footer
        </footer>
      </body>
    </html>
  );
}
