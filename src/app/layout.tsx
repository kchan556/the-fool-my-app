import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/auth';
import { DeckProvider } from '@/hooks/deck';
import { Analytics } from '@vercel/analytics/next';
import { ClientProvider } from '@/hooks/ClientProvider'; // 新しく作ったファイルを呼ぶ

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Revolutions',
    absolute: 'Revolutions',
  },
  description: 'CODE OF JOKER Simulator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authSkip = process.env.AUTH_SKIP === 'true';

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <AuthProvider authSkip={authSkip}>
          <DeckProvider>
            {/* dynamic import を閉じ込めた ClientProvider で包む */}
            <ClientProvider>{children}</ClientProvider>
          </DeckProvider>
        </AuthProvider>
      </body>
    </html>
  );
}