'use server-only'


import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from './header'
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Project",
  description: "My Project Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen v-screen overflow-scroll">
          <SessionProvider>
            <div className="flex-shrink-0">
                <Header/>
            </div>
            <div className="overflow-scroll">
              <div className="mb-auto w-auto max-h-full overflow-y-auto">
                <main>{children}</main>
              </div>
            </div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
