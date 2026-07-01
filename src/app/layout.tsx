import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'دیجی‌استور | فروشگاه آنلاین',
  description: 'فروشگاه آنلاین دیجی‌استور - بهترین برندها با بهترین قیمت‌ها',
  keywords: 'فروشگاه آنلاین, خرید آنلاین, دیجی کالا, تخفیف',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
