import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/component/provider/AuthProvider';
import { DeckProvider } from '@/component/provider/DeckProvider';
import { ClientProvider } from '@/component/provider/ClientProvider';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'THE FOOL',
  description: 'Online Card Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // authSkip がエラーの原因なら、一旦使わずに定義だけしておく
  const authSkip = false;

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Analytics />
        {/* @ts-ignore: Props mismatch bypass */}
        <AuthProvider authSkip={authSkip}>
          <DeckProvider>
            <ClientProvider>
              {children}
            </ClientProvider>
          </DeckProvider>
        </AuthProvider>
      </body>
    </html>
  );
}