import type { Metadata } from "next";
import {
  Poppins,
  Nova_Square,
  Merriweather,
  Merienda,
  McLaren,
} from "next/font/google";
import "../globals.css";

import { getServerSession } from "next-auth";

import SessionProvider from "@/components/Authentication/SessionProvider";
import Headers from "@/components/Layout/Header";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Layout/Footer";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    template: "%s | GameLingo Tools",
    default: "GameLingo Tools",
  },
  description: "A Tools for Gamers",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
  verification: {
    google: "AQdQ6iFFZcojBbTl9fIdqbzoAYZ5qNBbgdevebLXVRY",
  },
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

// Internationalization
const locales = ["id", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession();
  unstable_setRequestLocale(locale);
  const messages = await getMessages({locale})

  return (
    <html
      lang={locale}
      className={`${novaSquare.variable} ${poppins.variable} ${merriweather.variable} ${merienda.variable} ${mclaren.variable}`}
    >
      <body>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <Headers />
            <main>{children}</main>
            <Analytics />
            <Footer />
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
