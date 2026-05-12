import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';

export const metadata: Metadata = {
  title: 'TypoTune',
  description: 'AI-powered writing improvement tool',
  icons: {
    icon: '/typing.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
