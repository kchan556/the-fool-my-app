import './globals.css';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'THE FOOL',
  description: 'Online Card Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Analytics />
        {/* エラーの原因となる Provider 類を一時的にコメントアウト。
            これで「ファイルが見つからない」エラーを物理的に消去します。
        */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}