import { Inter, Fraunces, Bebas_Neue } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import Script from 'next/script';
import type { Metadata } from 'next';
import "@/styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TCHHZ40CRM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TCHHZ40CRM');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${fraunces.variable} ${bebasNeue.variable} antialiased`}>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline focus:outline-2 focus:outline-muted'
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
