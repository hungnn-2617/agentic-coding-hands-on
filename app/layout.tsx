import type { Metadata } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';
import { LanguageProvider, HtmlLangUpdater } from '@/lib/i18n';
import { Toaster } from 'sonner';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alternates',
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SAA 2025 | Sun Annual Awards',
  description: 'Sun Annual Awards 2025 - ROOT FURTHER',
  icons: {
    icon: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${montserratAlternates.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-montserrat">
        <LanguageProvider>
          <HtmlLangUpdater />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#FFF8E1',
                color: '#00101A',
                border: '1px solid #998C5F',
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 700,
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
