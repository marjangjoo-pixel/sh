'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fs from 'fs';
import path from 'path';
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
  Clock,
  Send
} from 'lucide-react';

// 🔐 رمز عبور ثابت برای پنل مدیریت
const ADMIN_PASSWORD = 'DigistoreAdmin123';

// تابع برای بارگذاری محصولات
const loadProducts = () => {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// تابع برای ذخیره محصولات
const saveProducts = (products: any[]) => {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
};

// کامپوننت صفحه ورود
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin();
    } else {
      setError('رمز عبور اشتباه است!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">ورود به پنل مدیریت</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              placeholder="رمز عبور را وارد کنید"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    category_id: 'mobile',
    brand: '',
    description: '',
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setProducts(loadProducts());
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setProducts(loadProducts());
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };

  const handleAddProduct = () => {
    const updatedProducts = [
      ...products,
      {
        ...newProduct,
        id: (products.length + 1).toString(),
        discount_percent: 0,
        images: [],
        rating: 0,
        review_count: 0,
      },
    ];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      category_id: 'mobile',
      brand: '',
      description: '',
    });
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* دکمه خروج */}
      <button
        onClick={handleLogout}
        className="fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600 z-50"
      >
        خروج
      </button>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-l border-gray-200 min-h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-8">پنل مدیریت</h2>
            <nav className="space-y-2">
              <button
                onClick={() => {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors bg-primary-50 text-primary-600`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>داشبورد</span>
              </button>
              <button
                onClick={() => {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-gray-600 hover:bg-gray-50`}
              >
                <Package className="w-5 h-5" />
                <span>محصولات</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">محصولات</h1>

            {/* فرم افزودن محصول */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">افزودن محصول جدید</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="نام محصول"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200"
                />
                <input
                  type="number"
                  placeholder="قیمت (تومان)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="px-4 py-3 rounded-xl border border-gray-200"
                />
                <input
                  type="number"
                  placeholder="موجودی"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="px-4 py-3 rounded-xl border border-gray-200"
                />
                <select
                  value={newProduct.category_id}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200"
                >
                  <option value="mobile">موبایل</option>
                  <option value="laptop">لپتاپ</option>
                  <option value="tablet">تبلت</option>
                </select>
                <input
                  type="text"
                  placeholder="برند"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200"
                />
                <textarea
                  placeholder="توضیحات"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 md:col-span-2"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="mt-4 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700"
              >
                افزودن محصول
              </button>
            </div>

            {/* لیست محصولات */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-right text-sm text-gray-500 bg-gray-50">
                      <th className="p-4 font-medium">نام محصول</th>
                      <th className="p-4 font-medium">موجودی</th>
                      <th className="p-4 font-medium">قیمت</th>
                      <th className="p-4 font-medium">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
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
        </main>
      </div>
    </div>
  );
}