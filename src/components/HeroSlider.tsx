'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'فروش ویژه تابستانه',
    subtitle: 'تا ۵۰٪ تخفیف روی محصولات منتخب',
    cta: 'مشاهده محصولات',
    href: '/products?special=true',
    bg: 'from-blue-600 to-purple-600',
    emoji: '🎉',
  },
  {
    id: 2,
    title: 'جدیدترین گوشی‌ها',
    subtitle: 'Samsung Galaxy S24 Ultra',
    cta: 'مشاهده جزئیات',
    href: '/products?category=mobile',
    bg: 'from-emerald-500 to-teal-600',
    emoji: '📱',
  },
  {
    id: 3,
    title: 'لپتاپ‌های حرفه‌ای',
    subtitle: 'MacBook Pro و Dell XPS',
    cta: 'خرید کنید',
    href: '/products?category=laptop',
    bg: 'from-orange-500 to-red-600',
    emoji: '💻',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 md:mx-0">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full bg-gradient-to-l ${slide.bg} p-8 md:p-16 text-white`}
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-6">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
              <div className="hidden md:block text-8xl">
                {slide.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
