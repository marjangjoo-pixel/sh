'use client';

import Link from 'next/link';
import { Smartphone, Laptop, Tablet, Home, Shirt, Headphones, Camera, Gamepad2 } from 'lucide-react';

const categories = [
  { name: 'موبایل', icon: Smartphone, href: '/products?category=mobile', color: 'bg-blue-50 text-blue-600' },
  { name: 'لپتاپ', icon: Laptop, href: '/products?category=laptop', color: 'bg-purple-50 text-purple-600' },
  { name: 'تبلت', icon: Tablet, href: '/products?category=tablet', color: 'bg-green-50 text-green-600' },
  { name: 'لوازم خانگی', icon: Home, href: '/products?category=home', color: 'bg-orange-50 text-orange-600' },
  { name: 'پوشاک', icon: Shirt, href: '/products?category=clothing', color: 'bg-pink-50 text-pink-600' },
  { name: 'صوتی', icon: Headphones, href: '/products?category=audio', color: 'bg-cyan-50 text-cyan-600' },
  { name: 'دوربین', icon: Camera, href: '/products?category=camera', color: 'bg-amber-50 text-amber-600' },
  { name: 'گیمینگ', icon: Gamepad2, href: '/products?category=gaming', color: 'bg-red-50 text-red-600' },
];

export default function CategoryGrid() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        دسته‌بندی‌های محبوب
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center p-4 rounded-2xl hover:shadow-lg transition-all group"
            >
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
