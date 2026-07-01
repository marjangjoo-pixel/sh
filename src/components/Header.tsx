'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = useCartStore((state) => state.getItemCount());

  const categories = [
    { name: 'موبایل', href: '/products?category=mobile' },
    { name: 'لپتاپ', href: '/products?category=laptop' },
    { name: 'تبلت', href: '/products?category=tablet' },
    { name: 'لوازم خانگی', href: '/products?category=home' },
    { name: 'پوشاک', href: '/products?category=clothing' },
  ];

  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      {/* Top bar */}
      <div className="bg-primary-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-primary-200">پنل مدیریت</Link>
            <span>|</span>
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            دیجی‌استور
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* User */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="hidden lg:inline text-sm">حساب کاربری</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Categories navigation - desktop */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 overflow-x-auto">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={cat.href}
                  className="text-gray-600 hover:text-primary-600 transition-colors whitespace-nowrap font-medium"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 animate-fade-in">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-100 pt-3">
                <Link
                  href="/admin"
                  className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  پنل مدیریت
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
