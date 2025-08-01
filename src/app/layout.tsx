import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import { Vazirmatn } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Authentication App',
  description: 'Simple authentication app with Next.js',
};

const vazirFont = Vazirmatn({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirFont.className}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}