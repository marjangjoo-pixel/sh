'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  PackageCheck,
  Clock
} from 'lucide-react';

const stats = [
  { label: 'فروش امروز', value: '۱۲,۵۰۰,۰۰۰', icon: DollarSign, color: 'bg-green-500' },
  { label: 'سفارشات جدید', value: '۸', icon: ShoppingCart, color: 'bg-blue-500' },
  { label: 'محصولات', value: '۱۵۶', icon: Package, color: 'bg-purple-500' },
  { label: 'کاربران', value: '۱,۲۳۴', icon: Users, color: 'bg-orange-500' },
];

const recentOrders = [
  { id: 'DS-123456', customer: 'علی محمدی', amount: 2500000, status: 'paid', date: '۱۴۰۳/۰۳/۲۰' },
  { id: 'DS-123457', customer: 'سارا احمدی', amount: 8500000, status: 'shipped', date: '۱۴۰۳/۰۳/۱۹' },
  { id: 'DS-123458', customer: 'محمد رضایی', amount: 1200000, status: 'pending', date: '۱۴۰۳/۰۳/۱۸' },
  { id: 'DS-123459', customer: 'زهرا کریمی', amount: 4500000, status: 'delivered', date: '۱۴۰۳/۰۳/۱۷' },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'در انتظار', color: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'پرداخت شده', color: 'bg-green-100 text-green-800' },
  shipped: { label: 'ارسال شده', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'تحویل شده', color: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-800' },
};

const sampleProducts = [
  { id: '1', name: 'Samsung Galaxy S24 Ultra', stock: 10, price: 75000000, sales: 45 },
  { id: '2', name: 'iPhone 15 Pro Max', stock: 5, price: 95000000, sales: 32 },
  { id: '3', name: 'MacBook Pro M3', stock: 3, price: 120000000, sales: 12 },
  { id: '4', name: 'AirPods Pro 2', stock: 20, price: 8500000, sales: 89 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-l border-gray-200 min-h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-8">پنل مدیریت</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>داشبورد</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === 'products'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>محصولات</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>سفارشات</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Mobile tabs */}
          <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              داشبورد
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              محصولات
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              سفارشات
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">آخرین سفارشات</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right text-sm text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">کد سفارش</th>
                        <th className="pb-3 font-medium">مشتری</th>
                        <th className="pb-3 font-medium">مبلغ</th>
                        <th className="pb-3 font-medium">وضعیت</th>
                        <th className="pb-3 font-medium">تاریخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50">
                          <td className="py-4 font-mono text-sm">{order.id}</td>
                          <td className="py-4">{order.customer}</td>
                          <td className="py-4">
                            {new Intl.NumberFormat('fa-IR').format(order.amount)} تومان
                          </td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[order.status].color}`}>
                              {statusLabels[order.status].label}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">محصولات</h1>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  افزودن محصول
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right text-sm text-gray-500 bg-gray-50">
                        <th className="p-4 font-medium">نام محصول</th>
                        <th className="p-4 font-medium">موجودی</th>
                        <th className="p-4 font-medium">قیمت</th>
                        <th className="p-4 font-medium">فروش</th>
                        <th className="p-4 font-medium">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleProducts.map((product) => (
                        <tr key={product.id} className="border-t border-gray-100">
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4">
                            <span className={`font-medium ${product.stock < 5 ? 'text-red-500' : 'text-green-500'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                          </td>
                          <td className="p-4">{product.sales}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-800">سفارشات</h1>
              
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right text-sm text-gray-500 bg-gray-50">
                        <th className="p-4 font-medium">کد سفارش</th>
                        <th className="p-4 font-medium">مشتری</th>
                        <th className="p-4 font-medium">مبلغ</th>
                        <th className="p-4 font-medium">وضعیت</th>
                        <th className="p-4 font-medium">تاریخ</th>
                        <th className="p-4 font-medium">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-t border-gray-100">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">
                            {new Intl.NumberFormat('fa-IR').format(order.amount)} تومان
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[order.status].color}`}>
                              {statusLabels[order.status].label}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-500">{order.date}</td>
                          <td className="p-4">
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              مشاهده جزئیات
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
