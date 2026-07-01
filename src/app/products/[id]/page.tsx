'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// Sample product data
const sampleProduct = {
  id: '1',
  name: 'Samsung Galaxy S24 Ultra 256GB',
  description: 'گوشی سامسونگ گلکسی اس ۲۴ اولترا با حافظه ۲۵۶ گیگابایت، دوربین ۲۰۰ مگاپیکسلی، قلم S Pen و صفحه نمایش Dynamic AMOLED 2X',
  price: 75000000,
  discount_percent: 15,
  images: ['/products/phone1.jpg', '/products/phone1-2.jpg', '/products/phone1-3.jpg'],
  category_id: 'mobile',
  brand: 'Samsung',
  stock: 10,
  rating: 4.8,
  review_count: 245,
  features: {
    'حافظه داخلی': '۲۵۶ گیگابایت',
    'رم': '۱۲ گیگابایت',
    'دوربین اصلی': '۲۰۰ مگاپیکسل',
    'اندازه صفحه نمایش': '۶.۸ اینچ',
    'باتری': '۵۰۰۰ میلی‌آمپر ساعت',
    'سیستم عامل': 'Android 14',
    'تراشه': 'Snapdragon 8 Gen 3',
  },
  created_at: new Date().toISOString(),
};

const sampleReviews = [
  {
    id: '1',
    user: 'علی محمدی',
    rating: 5,
    date: '۱۴۰۳/۰۳/۱۵',
    comment: 'عالیه! دوربین فوق‌العاده‌ای داره و سرعت گوشی خیلی بالاست.',
  },
  {
    id: '2',
    user: 'سارا احمدی',
    rating: 4,
    date: '۱۴۰۳/۰۳/۱۰',
    comment: 'خیلی خوبه ولی قیمتش یکم بالاست. در کل راضیم.',
  },
  {
    id: '3',
    user: 'محمد رضایی',
    rating: 5,
    date: '۱۴۰۳/۰۳/۰۵',
    comment: 'بهترین گوشی که تا حالا داشتم. حتماً پیشنهاد میکنم.',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const addItem = useCartStore((state) => state.addItem);

  const product = sampleProduct;
  const discountPercent = product.discount_percent || 0;
  const finalPrice = product.price * (1 - discountPercent / 100);
  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);
  const formattedFinalPrice = new Intl.NumberFormat('fa-IR').format(finalPrice);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-primary-600">خانه</a>
        <ChevronLeft className="w-4 h-4" />
        <a href="/products" className="hover:text-primary-600">محصولات</a>
        <ChevronLeft className="w-4 h-4" />
        <a href={`/products?category=${product.category_id}`} className="hover:text-primary-600">
          موبایل
        </a>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="bg-gray-50 rounded-2xl aspect-square relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-9xl">📱</span>
            </div>
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-xl">
                {discountPercent}%-
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-3">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'border-primary-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Title and brand */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= (product.rating || 0)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({new Intl.NumberFormat('fa-IR').format(product.review_count || 0)} نظر)
            </span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              {discountPercent > 0 && (
                <span className="text-gray-400 line-through text-lg">
                  {formattedPrice}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                  {discountPercent}% تخفیف
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary-600">
                {formattedFinalPrice}
              </span>
              <span className="text-gray-500">تومان</span>
            </div>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">موجود در انبار</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-500 font-medium">ناموجود</span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600">تعداد:</span>
            <div className="flex items-center border border-gray-200 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-r-xl"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-l-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-6 h-6" />
              افزودن به سبد خرید
            </button>
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-primary-500" />
              <span>ارسال رایگان</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-primary-500" />
              <span>گارانتی اصالت</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-primary-500" />
              <span>۷ روز بازگشت</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'specs'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            مشخصات فنی
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            نظرات کاربران ({sampleReviews.length})
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.features || {}).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 font-medium text-gray-700 w-1/3">{key}</td>
                    <td className="py-4 px-6 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {sampleReviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold">
                        {review.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
