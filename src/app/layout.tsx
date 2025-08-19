import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {SpeedInsights} from "@vercel/speed-insights/next";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muzicamea.ro'),
  title: "MuzicaMea - Radio Online | Muzică bună, mai aproape de sufletul tău",
  description: "Ascultă muzică românească și internațională la MuzicaMea Radio. Fără reclame, piese originale, varietate de genuri muzicale. Postul tău radio preferat online 24/7.",
  keywords: "radio online, muzică românească, radio fără reclame, ascultă live, muzică pop, rock, folk, hip-hop românesc, radio muzica mea",
  authors: [{ name: "Systemio Tehnologies" }],
  creator: "Systemio Tehnologies",
  publisher: "MuzicaMea Radio",
  robots: "index, follow",
  openGraph: {
    title: "MuzicaMea - Radio Online | Muzică bună, mai aproape de sufletul tău",
    description: "Ascultă muzică românească și internațională la MuzicaMea Radio. Fără reclame, piese originale, varietate de genuri muzicale.",
    url: "https://muzicamea.ro",
    siteName: "MuzicaMea Radio",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 60,
        alt: "MuzicaMea Radio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MuzicaMea - Radio Online",
    description: "Muzică bună, mai aproape de sufletul tău. Ascultă live 24/7!",
    images: ["/logo.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d62828",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <link rel="canonical" href="https://muzicamea.ro" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="RO" />
        <meta name="geo.placename" content="România" />
      </head>
      <body
        className={`${roboto.variable} font-roboto antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-[#000000]">
          <Navbar />
          <main className="flex-1">
            {children}
              <SpeedInsights />

          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
