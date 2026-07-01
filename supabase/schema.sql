-- ============================================
-- DigiStore Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Categories table
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Products table
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
  discount_percent DECIMAL(5, 2) DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Product images table
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Users table (extends Supabase Auth)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Orders table
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
  shipping_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  description TEXT,
  tracking_code TEXT,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Order items table
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Reviews table
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created ON products(created_at DESC);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ============================================
-- Auto-update updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Categories: Public read
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true OR auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

CREATE POLICY "Products are insertable by admins"
  ON products FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

CREATE POLICY "Products are updatable by admins"
  ON products FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

CREATE POLICY "Products are deletable by admins"
  ON products FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

-- Product images: Public read, admin write
CREATE POLICY "Product images are viewable by everyone"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Product images are manageable by admins"
  ON product_images FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

-- Users: Can read/update own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

-- Orders: Users can view own orders, admins can view all
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

-- Order items: Users can view items of their orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (order_id IN (
    SELECT id FROM orders WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create items for own orders"
  ON order_items FOR INSERT
  WITH CHECK (order_id IN (
    SELECT id FROM orders WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all order items"
  ON order_items FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE is_admin = true
  ));

-- Reviews: Public read, authenticated write
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (is_approved = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- Sample data
-- ============================================

-- Insert sample categories
INSERT INTO categories (name, slug, icon) VALUES
  ('موبایل', 'mobile', 'smartphone'),
  ('لپتاپ', 'laptop', 'laptop'),
  ('تبلت', 'tablet', 'tablet'),
  ('لوازم خانگی', 'home-appliances', 'home'),
  ('پوشاک', 'clothing', 'shirt'),
  ('صوتی', 'audio', 'headphones'),
  ('دوربین', 'camera', 'camera'),
  ('گیمینگ', 'gaming', 'gamepad-2');

-- Insert sample products
INSERT INTO products (name, slug, description, price, discount_percent, category_id, brand, stock, rating, review_count, features) VALUES
  ('Samsung Galaxy S24 Ultra 256GB', 'samsung-galaxy-s24-ultra', 'گوشی سامسونگ گلکسی اس ۲۴ اولترا با حافظه ۲۵۶ گیگابایت', 75000000, 15, (SELECT id FROM categories WHERE slug = 'mobile'), 'Samsung', 10, 4.8, 245, '{"حافظه داخلی": "۲۵۶ گیگابایت", "رم": "۱۲ گیگابایت", "دوربین اصلی": "۲۰۰ مگاپیکسل", "اندازه صفحه نمایش": "۶.۸ اینچ"}'),
  ('iPhone 15 Pro Max 256GB', 'iphone-15-pro-max', 'آیفون ۱۵ پرو مکس اپل با حافظه ۲۵۶ گیگابایت', 95000000, 10, (SELECT id FROM categories WHERE slug = 'mobile'), 'Apple', 5, 4.9, 189, '{"حافظه داخلی": "۲۵۶ گیگابایت", "رم": "۸ گیگابایت", "دوربین اصلی": "۴۸ مگاپیکسل", "اندازه صفحه نمایش": "۶.۷ اینچ"}'),
  ('MacBook Pro 14 inch M3', 'macbook-pro-14-m3', 'مک‌بوک پرو ۱۴ اینچی اپل با تراشه M3', 120000000, 5, (SELECT id FROM categories WHERE slug = 'laptop'), 'Apple', 3, 4.9, 78, '{"حافظه داخلی": "۵۱۲ گیگابایت SSD", "رم": "۱۸ گیگابایت", "اندازه صفحه نمایش": "۱۴.۲ اینچ", "تراشه": "Apple M3"}'),
  ('Samsung Galaxy Tab S9 FE', 'samsung-galaxy-tab-s9-fe', 'تبلت سامسونگ گلکسی تب اس ۹ FE', 18000000, 20, (SELECT id FROM categories WHERE slug = 'tablet'), 'Samsung', 15, 4.6, 123, '{"حافظه داخلی": "۱۲۸ گیگابایت", "رم": "۶ گیگابایت", "اندازه صفحه نمایش": "۱۰.۹ اینچ"}'),
  ('AirPods Pro 2nd Generation', 'airpods-pro-2', 'ایرپادز پرو نسل دوم اپل با ANC', 8500000, 12, (SELECT id FROM categories WHERE slug = 'audio'), 'Apple', 20, 4.7, 312, '{"نوع": "بی‌سیم", "ANC": "بله", "عمر باتری": "۶ ساعت"}'),
  ('Sony WH-1000XM5', 'sony-wh-1000xm5', 'هدفون بی‌سیم سونی با حذف نویز فعال', 12000000, 8, (SELECT id FROM categories WHERE slug = 'audio'), 'Sony', 8, 4.8, 198, '{"نوع": "بی‌سیم", "ANC": "بله", "عمر باتری": "۳۰ ساعت"}'),
  ('Dell XPS 15', 'dell-xps-15', 'لپتاپ دل ایکس‌پی‌اس ۱۵ اینچی', 85000000, 0, (SELECT id FROM categories WHERE slug = 'laptop'), 'Dell', 7, 4.7, 67, '{"حافظه داخلی": "۵۱۲ گیگابایت SSD", "رم": "۱۶ گیگابایت", "اندازه صفحه نمایش": "۱۵.۶ اینچ"}'),
  ('PlayStation 5', 'playstation-5', 'کنسول بازی سونی پلی‌استیشن ۵', 25000000, 18, (SELECT id FROM categories WHERE slug = 'gaming'), 'Sony', 12, 4.9, 445, '{"حافظه داخلی": "۸۲۵ گیگابایت SSD", "رم": "۱۶ گیگابایت", "رزولوشن": "4K"}');
