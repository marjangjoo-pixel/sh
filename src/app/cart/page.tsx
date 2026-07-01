'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const shipping = total > 500000 ? 0 : 50000;
  const grandTotal = total + shipping;

  const formattedTotal = new Intl.NumberFormat('fa-IR').format(total);
  const formattedShipping = new Intl.NumberFormat('fa-IR').format(shipping);
  const formattedGrandTotal = new Intl.NumberFormat('fa-IR').format(grandTotal);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          سبد خرید شما خالی است
        </h1>
        <p className="text-gray-600 mb-8">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید
        </p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemTotal = item.product.price * item.quantity;
            const formattedItemTotal = new Intl.NumberFormat('fa-IR').format(itemTotal);
            const formattedPrice = new Intl.NumberFormat('fa-IR').format(item.product.price);

            return (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-medium text-gray-800 hover:text-primary-600 transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.brand && (
                        <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <p className="text-lg font-bold text-primary-600">
                        {formattedItemTotal}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formattedPrice} × {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Clear cart */}
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            خالی کردن سبد خرید
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>جمع سبد خرید</span>
                <span>{formattedTotal} تومان</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>هزینه ارسال</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">رایگان</span>
                  ) : (
                    `${formattedShipping} تومان`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  💡 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-primary-600">{formattedGrandTotal} تومان</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg text-center hover:bg-primary-700 transition-colors"
            >
              ادامه فرآیند خرید
            </Link>

            <Link
              href="/products"
              className="block w-full text-center mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5" />
                ادامه خرید
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
