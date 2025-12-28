import type { Metadata } from 'next';

import './globals.css';
import EmotionRegistry from '@/shared/styles/EmotionRegistry';
import AppWrapper from '@/shared/components/AppWrapper';
import { ToastProvider } from '@/shared/components/Toast/ToastProvider';

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
      <body>
        <EmotionRegistry>
          <ToastProvider>
            <AppWrapper>{children}</AppWrapper>
          </ToastProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
