import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '월급쟁이 부자들 과제',
  description: '정유정 월급쟁이 부자들 과제',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
