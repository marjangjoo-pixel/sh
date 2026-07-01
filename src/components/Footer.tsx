import Link from 'next/link';
import { Instagram, Twitter, Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Newsletter */}
      <div className="bg-primary-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-bold">عضویت در خبرنامه</h3>
              <p className="text-primary-100 text-sm">
                از تخفیف‌ها و محصولات جدید باخبر شوید
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 md:w-80 px-4 py-3 rounded-r-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-l-lg hover:bg-gray-800 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">دیجی‌استور</h4>
            <p className="text-sm leading-relaxed mb-4">
              فروشگاه اینترنتی دیجی‌استور با هدف ارائه بهترین خدمات و محصولات با کیفیت
              و قیمت مناسب راه اندازی شده است.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary-400 transition-colors">
                  همه محصولات
                </Link>
              </li>
              <li>
                <Link href="/products?category=mobile" className="hover:text-primary-400 transition-colors">
                  موبایل
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptop" className="hover:text-primary-400 transition-colors">
                  لپتاپ
                </Link>
              </li>
              <li>
                <Link href="/products?special=true" className="hover:text-primary-400 transition-colors">
                  پیشنهادات ویژه
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-primary-400 transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  شرایط و قوانین
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/return" className="hover:text-primary-400 transition-colors">
                  شرایط بازگشت
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>info@digistore.ir</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>تهران، خیابان ولیعصر</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© ۱۴۰۵ دیجی‌استور. تمامی حقوق محفوظ است.</p>
            <div className="flex items-center gap-4">
              <span>پرداخت امن با:</span>
              <div className="flex gap-2">
                <div className="bg-gray-800 px-3 py-1 rounded">زرین‌پال</div>
                <div className="bg-gray-800 px-3 py-1 rounded">شبکه شاپرک</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
