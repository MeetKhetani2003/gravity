import type { Metadata } from 'next';
import '../styles.css';
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/Providers";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const metadata: Metadata = {
  title: 'Gravity Industries — ISO 9001:2015 Manufacturer of Plumbing, Bathware & Pipe Fittings | Rajkot, India',
  description: 'Gravity Industries manufactures premium uPVC & cPVC pipe fittings, valves, clamps, bathware and plumbing solutions under King Roar and Devam brands. ISO 9001:2015 certified, based in Rajkot, Gujarat since 2010.',
  authors: [{ name: 'Gravity Industries' }],
  openGraph: {
    title: 'Gravity Industries — Premium Plumbing & Bathware Manufacturer',
    description: 'ISO 9001:2015 certified manufacturer of uPVC/cPVC fittings, valves, clamps and bathware — King Roar & Devam brands. Since 2010.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}

