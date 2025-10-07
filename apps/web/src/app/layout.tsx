import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'x402 Payment Middleware',
  description: 'モジュラー・レイヤードアーキテクチャによる決済ミドルウェア',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
} 