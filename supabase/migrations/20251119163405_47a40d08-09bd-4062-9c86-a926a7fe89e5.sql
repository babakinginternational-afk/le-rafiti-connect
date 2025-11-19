-- Phase 2: Database Schema Creation
-- Le Rafiti Restaurant Order Management System

-- Create enum for roles
CREATE TYPE app_role AS ENUM ('admin', 'staff', 'customer');

-- 1. Menu Categories
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Menu Items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price INTEGER NOT NULL, -- Prix en FCFA
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Item Options (for customization)
CREATE TABLE item_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Ex: "Taille", "Accompagnement"
  type TEXT NOT NULL, -- "single_choice", "multiple_choice"
  options JSONB NOT NULL, -- [{label: "Petit", price: 0}, {label: "Grand", price: 500}]
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Locations
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Tables (for dine-in orders)
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  table_number TEXT NOT NULL,
  zone TEXT, -- "Terrasse", "Intérieur", etc.
  qr_code_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(location_id, table_number)
);

-- 6. Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  order_type TEXT NOT NULL, -- "dine_in", "takeout", "delivery"
  status TEXT NOT NULL DEFAULT 'pending', -- "pending", "confirmed", "preparing", "ready", "completed", "cancelled"
  payment_status TEXT NOT NULL DEFAULT 'pending', -- "pending", "paid", "failed"
  
  -- Dine-in specifics
  table_id UUID REFERENCES tables(id),
  
  -- Delivery specifics
  delivery_address TEXT,
  delivery_latitude DECIMAL(10, 8),
  delivery_longitude DECIMAL(11, 8),
  delivery_landmark TEXT,
  delivery_fee INTEGER DEFAULT 0,
  
  -- Order details
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  special_notes TEXT,
  
  -- Pricing
  subtotal INTEGER NOT NULL, -- FCFA
  tax_amount INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  
  -- Timing
  estimated_time INTEGER, -- minutes
  confirmed_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Staff assignment
  assigned_staff_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  selected_options JSONB, -- Options choisies par le client
  special_instructions TEXT,
  subtotal INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  location_id UUID REFERENCES locations(id),
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  number_of_guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending', -- "pending", "confirmed", "cancelled", "completed"
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  payment_method TEXT NOT NULL, -- "cash", "tmoney", "flooz", "card"
  payment_provider TEXT, -- "tmoney", "flooz", "stripe"
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- "pending", "completed", "failed"
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. User Roles
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Security Definer Function to check roles
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Enable Row Level Security
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Menu (Public Read Access)
CREATE POLICY "Menu categories are viewable by everyone"
  ON menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Item options are viewable by everyone"
  ON item_options FOR SELECT
  USING (true);

-- RLS Policies for Locations and Tables (Public Read Access)
CREATE POLICY "Locations are viewable by everyone"
  ON locations FOR SELECT
  USING (true);

CREATE POLICY "Tables are viewable by everyone"
  ON tables FOR SELECT
  USING (true);

-- RLS Policies for Orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Admins and staff can update orders"
  ON orders FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete orders"
  ON orders FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for Order Items
CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'))
    )
  );

CREATE POLICY "Users can insert order items for their orders"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- RLS Policies for Reservations
CREATE POLICY "Users can view their own reservations"
  ON reservations FOR SELECT
  USING (customer_email = auth.jwt()->>'email' OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins and staff can update reservations"
  ON reservations FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- RLS Policies for Payments
CREATE POLICY "Users can view payments for their orders"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (orders.user_id = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'))
    )
  );

CREATE POLICY "System can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);

-- RLS Policies for User Roles
CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage roles"
  ON user_roles FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Admin Policies for Menu Management
CREATE POLICY "Admins can manage menu categories"
  ON menu_categories FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage menu items"
  ON menu_items FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage item options"
  ON item_options FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage locations"
  ON locations FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage tables"
  ON tables FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_item_options_item ON item_options(item_id);
CREATE INDEX idx_tables_location ON tables(location_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date, reservation_time);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);

-- Insert default categories
INSERT INTO menu_categories (name, display_order) VALUES
('Entrées', 1),
('Plats Togolais', 2),
('Grillades', 3),
('Poissons', 4),
('Pâtes & Riz', 5),
('Desserts', 6),
('Boissons', 7);

-- Insert default locations
INSERT INTO locations (name, address, phone, is_active) VALUES
('Léo 2000', 'Quartier Léo 2000, Lomé', '+228 XX XX XX XX', true),
('Agoé Anomé', 'Quartier Agoé Anomé, Lomé', '+228 XX XX XX XX', true),
('Klikamé', 'Quartier Klikamé, Lomé', '+228 XX XX XX XX', true),
('Soagbado', 'Quartier Soagbado, Lomé', '+228 XX XX XX XX', true);