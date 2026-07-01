'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const discountPercent = product.discount_percent || 0;
  const finalPrice = product.price * (1 - discountPercent / 100);
  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);
  const formattedFinalPrice = new Intl.NumberFormat('fa-IR').format(finalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Link href={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 p-4">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-6xl">📦</span>
            </div>
          )}
          
          {/* Discount badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {discountPercent}%-
            </div>
          )}
          
          {/* Wishlist */}
          <button
            className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
          
          {/* Quick add */}
          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-3 right-3 bg-primary-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>افزودن به سبد</span>
            </button>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          )}
          
          {/* Name */}
          <h3 className="font-medium text-gray-800 line-clamp-2 mb-2 h-12">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              {product.review_count && (
                <span className="text-xs text-gray-400">
                  ({new Intl.NumberFormat('fa-IR').format(product.review_count)} نظر)
                </span>
              )}
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2">
            {discountPercent > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {formattedPrice}
              </span>
            )}
            <span className="text-lg font-bold text-primary-600">
              {formattedFinalPrice}
            </span>
            <span className="text-xs text-gray-500">تومان</span>
          </div>
          
          {/* Stock status */}
          {product.stock === 0 && (
            <p className="text-sm text-red-500 mt-2">ناموجود</p>
          )}
          {product.stock > 0 && product.stock < 5 && (
            <p className="text-sm text-orange-500 mt-2">
              تنها {product.stock} عدد در انبار باقی مانده
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
