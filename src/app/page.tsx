import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

// Sample products for demo
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    description: 'گوشی سامسونگ گلکسی اس ۲۴ اولترا با حافظه ۲۵۶ گیگابایت',
    price: 75000000,
    discount_percent: 15,
    images: ['/products/phone1.jpg'],
    category_id: 'mobile',
    brand: 'Samsung',
    stock: 10,
    rating: 4.8,
    review_count: 245,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'آیفون ۱۵ پرو مکس اپل با حافظه ۲۵۶ گیگابایت',
    price: 95000000,
    discount_percent: 10,
    images: ['/products/phone2.jpg'],
    category_id: 'mobile',
    brand: 'Apple',
    stock: 5,
    rating: 4.9,
    review_count: 189,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'MacBook Pro 14 inch M3',
    description: 'مک‌بوک پرو ۱۴ اینچی اپل با تراشه M3',
    price: 120000000,
    discount_percent: 5,
    images: ['/products/laptop1.jpg'],
    category_id: 'laptop',
    brand: 'Apple',
    stock: 3,
    rating: 4.9,
    review_count: 78,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Samsung Galaxy Tab S9 FE',
    description: 'تبلت سامسونگ گلکسی تب اس ۹ FE',
    price: 18000000,
    discount_percent: 20,
    images: ['/products/tablet1.jpg'],
    category_id: 'tablet',
    brand: 'Samsung',
    stock: 15,
    rating: 4.6,
    review_count: 123,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'AirPods Pro 2nd Generation',
    description: 'ایرپادز پرو نسل دوم اپل با ANC',
    price: 8500000,
    discount_percent: 12,
    images: ['/products/audio1.jpg'],
    category_id: 'audio',
    brand: 'Apple',
    stock: 20,
    rating: 4.7,
    review_count: 312,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    description: 'هدفون بی‌سیم سونی با حذف نویز فعال',
    price: 12000000,
    discount_percent: 8,
    images: ['/products/audio2.jpg'],
    category_id: 'audio',
    brand: 'Sony',
    stock: 8,
    rating: 4.8,
    review_count: 198,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Dell XPS 15',
    description: 'لپتاپ دل ایکس‌پی‌اس ۱۵ اینچی',
    price: 85000000,
    discount_percent: 0,
    images: ['/products/laptop2.jpg'],
    category_id: 'laptop',
    brand: 'Dell',
    stock: 7,
    rating: 4.7,
    review_count: 67,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'PlayStation 5',
    description: 'کنسول بازی سونی پلی‌استیشن ۵',
    price: 25000000,
    discount_percent: 18,
    images: ['/products/game1.jpg'],
    category_id: 'gaming',
    brand: 'Sony',
    stock: 12,
    rating: 4.9,
    review_count: 445,
    created_at: new Date().toISOString(),
  },
];

export default function Home() {
  const specialProducts = sampleProducts.filter(p => (p.discount_percent || 0) > 0);
  const newProducts = sampleProducts.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Slider */}
      <section className="py-6">
        <div className="container mx-auto">
          <HeroSlider />
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <CategoryGrid />
      </section>

      {/* Special offers */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🔥 پیشنهادات ویژه
          </h2>
          <a
            href="/products?special=true"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            مشاهده همه →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-l from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان
          </h2>
          <p className="text-primary-100 text-lg mb-6">
            همین الان خرید کنید و از ارسال رایگان بهرهمند شوید
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            شروع خرید
          </a>
        </div>
      </section>

      {/* New products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ✨ جدیدترین محصولات
          </h2>
          <a
            href="/products?sort=newest"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            مشاهده همه →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">ارسال سریع</h3>
            <p className="text-sm text-gray-600">تحویل در کمتر از ۳ روز</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">پرداخت امن</h3>
            <p className="text-sm text-gray-600">با درگاه زرین‌پال</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">↩️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">گارانتی بازگشت</h3>
            <p className="text-sm text-gray-600">۷ روز ضمانت بازگشت</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎧</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">پشتیبانی ۲۴/۷</h3>
            <p className="text-sm text-gray-600">همیشه در کنار شما</p>
          </div>
        </div>
      </section>
    </div>
  );
}
