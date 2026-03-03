import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/auth';
import { DeckProvider } from '@/hooks/deck';
import { Analytics } from '@vercel/analytics/next';
import dynamic from 'next/dynamic'; // ← これを追加

// サーバーで動かさないように「予約」する書き方です
const GlobalContextProvider = dynamic(
  () => import('@/hooks/GlobalContextProvider').then((mod) => mod.GlobalContextProvider),
  { ssr: false }
);

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
  keywords: [
    'CODE OF JOKER',
    'COJ',
    'コードオブジョーカー',
    'シミュレータ',
  ],
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
            {/* ここで使われる GlobalContextProvider は、ブラウザでしか動かない設定になります */}
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </DeckProvider>
        </AuthProvider>
      </body>
    </html>
  );
}