import './globals.css';
import { Cairo } from 'next/font/google';
import type { Metadata } from 'next';
import AuthProvider from '../components/AuthProvider';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Shop Ton – Telegram Services Marketplace',
  description:
    'منصة Shop Ton تقدم أفضل خدمات تليجرام مع لوحة تحكم زجاجية مستقبلية وروبوت تليجرام للإدارة الكاملة.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} min-h-screen bg-gradient-to-br from-background-start to-background-end text-white`}> 
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
