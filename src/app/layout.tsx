import type { Metadata } from 'next';

import { QueryProvider } from '@app/components/providers/QueryProvider';
import { ThemeProvider } from '@app/components/providers/ThemeProvider';
import Head from 'next/head';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ghanime',
    template: '%s | Ghanime',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
