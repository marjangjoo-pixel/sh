'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, CreditCard, Truck, MapPin, Send, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    description: '',
  });

  const total = getTotal();
  const shipping = total > 500000 ? 0 : 50000;
  const grandTotal = total + shipping;

  const formattedTotal = new Intl.NumberFormat('fa-IR').format(total);
  const formattedShipping = new Intl.NumberFormat('fa-IR').format(shipping);
  const formattedGrandTotal = new Intl.NumberFormat('fa-IR').format(grandTotal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          سبد خرید شما خالی است
        </h1>
        <Link
          href="/products"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">تکمیل خرید</h1>

      {/* Progress steps */}
      <div className="flex items-center justify-center mb-12">
        {[1, 2, 3].map((s, index) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${s <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {s === 1 ? <MapPin className="w-6 h-6" /> : s === 2 ? <Send className="w-6 h-6" /> : <Check className="w-6 h-6" />}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {s === 1 ? 'اطلاعات ارسال' : s === 2 ? 'ثبت سفارش' : 'تکمیل'}
              </span>
            </div>
            {index < 2 && (
              <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 3 ? (
        /* Success */
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            سفارش شما با موفقیت ثبت شد! 🎉
          </h2>
          <p className="text-gray-600 mb-8">
            پیامک تأیید به شماره {formData.phone} ارسال خواهد شد.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      ) : step === 1 ? (
        /* Step 1: Shipping info */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">اطلاعات ارسال</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شماره موبایل *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="09123456789"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شهر *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      کد پستی
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    آدرس کامل *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات سفارش
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="مثلاً زمان تحویل مورد نظر..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors"
                >
                  ادامه به ثبت سفارش
                </button>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium mr-2">
                      {new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>جمع</span>
                  <span>{formattedTotal} تومان</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ارسال</span>
                  <span>{shipping === 0 ? 'رایگان' : `${formattedShipping} تومان`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>مبلغ نهایی</span>
                  <span className="text-primary-600">{formattedGrandTotal} تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Telegram Payment */
        <div className="max-w-2xl mx-auto text-center py-12 px-6 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ثبت سفارش از طریق تلگرام
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            برای تکمیل سفارش، لطفاً به پیوی تلگرام ما (@Mmj128) پیام دهید و اطلاعات زیر را ارسال کنید:
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
            <h3 className="font-bold text-gray-800 mb-3">اطلاعات مورد نیاز:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• نام و نام خانوادگی</li>
              <li>• شماره تماس (موبایل)</li>
              <li>• آدرس دقیق پستی (شهر، خیابان، کوچه، پلاک)</li>
              <li>• کد پستی (اختیاری)</li>
              <li>• توضیحات اضافی (مثلاً زمان تحویل مورد نظر)</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">خلاصه سفارش شما:</h3>
            <div className="space-y-2 text-sm text-right">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity)} تومان
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-blue-600">{formattedGrandTotal} تومان</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            پس از ارسال اطلاعات، همکاران ما در تلگرام (@Mmj128) با شما تماس خواهند گرفت تا سفارش را نهایی کنند.
          </p>

          <a
            href="https://t.me/Mmj128"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mb-4"
          >
            ارسال اطلاعات به تلگرام
          </a>

          <button
            onClick={() => setStep(1)}
            className="text-gray-500 hover:text-gray-700"
          >
            بازگشت به مرحله قبل
          </button>
        </div>
      )}
    </div>
  );
}