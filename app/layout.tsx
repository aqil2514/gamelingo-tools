import type { Metadata } from "next";
import { Poppins, Nova_Square, Merriweather, Merienda, McLaren } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";
import Headers from "./components/Headers";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | GameLingo Tools",
    default: "GameLingo Tools",
  },
  description: "A Tools for Gamers",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

const novaSquare = Nova_Square({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-nova-square",
});

const mclaren = McLaren({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mclaren",
});

const merriweather = Merriweather({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const merienda = Merienda({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-merienda",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${novaSquare.variable} ${poppins.variable} ${merriweather.variable} ${merienda.variable} ${mclaren.variable}`}>
      <body>
        <SessionProvider session={session}>
          <Headers />
          <main className="flex flex-row">{children}</main>
          <Analytics />
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
