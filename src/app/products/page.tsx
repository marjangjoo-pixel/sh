'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    category_id: 'gaming',
    brand: 'Sony',
    stock: 12,
    rating: 4.9,
    review_count: 445,
    created_at: new Date().toISOString(),
  },
];

const categories = [
  { id: 'all', name: 'همه' },
  { id: 'mobile', name: 'موبایل' },
  { id: 'laptop', name: 'لپتاپ' },
  { id: 'tablet', name: 'تبلت' },
  { id: 'audio', name: 'صوتی' },
  { id: 'gaming', name: 'گیمینگ' },
];

const sortOptions = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'cheapest', label: 'ارزان‌ترین' },
  { value: 'expensive', label: 'گران‌ترین' },
  { value: 'popular', label: 'محبوب‌ترین' },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...sampleProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">محصولات</h1>
        <p className="text-gray-600">
          {filteredProducts.length} محصول یافت شد
        </p>
      </div>

      {/* Search and filters bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* View mode */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className={`mt-4 flex flex-wrap gap-2 ${showFilters ? '' : 'hidden md:flex'}`}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            محصولی یافت نشد
          </h3>
          <p className="text-gray-600">
            لطفاً فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید
          </p>
        </div>
      )}

      {/* Pagination (placeholder) */}
      <div className="flex justify-center gap-2 mt-12">
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">۱</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">۲</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">۳</button>
      </div>
    </div>
  );
}
