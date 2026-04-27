-- Crear tabla de Payments (Ingresos)
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  client_id INTEGER,
  client_name TEXT,
  amount NUMERIC(12,2) NOT NULL,
  payment_date TEXT NOT NULL,
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Política para que todos lean
CREATE POLICY "Permitir lectura payments" ON payments
  FOR SELECT USING (true);

-- Política para que todos inserten
CREATE POLICY "Permitir insertar payments" ON payments
  FOR INSERT WITH CHECK (true);

-- Política para que todos actualicen
CREATE POLICY "Permitir actualizar payments" ON payments
  FOR UPDATE USING (true);

-- Política para que todos eliminen
CREATE POLICY "Permitir eliminar payments" ON payments
  FOR DELETE USING (true);

-- Crear playlist_id en media si no existe
ALTER TABLE media ADD COLUMN IF NOT EXISTS playlist_id INTEGER;

-- Insertar datos de ejemplo para el gráfico
INSERT INTO payments (client_name, amount, payment_date, status) VALUES
  ('Global Retail Corp', 15000, '2026-04-01', 'paid'),
  ('TechStore México', 12000, '2026-04-05', 'paid'),
  ('FoodBrand Central', 8000, '2026-04-10', 'paid'),
  ('Fashion Outlet', 18000, '2026-04-15', 'paid'),
  ('Electronics Pro', 22000, '2026-04-20', 'paid'),
  ('Cinema Plus', 9500, '2026-04-25', 'paid'),
  ('Global Retail Corp', 16000, '2026-05-01', 'paid'),
  ('TechStore México', 14000, '2026-05-05', 'paid'),
  ('FoodBrand Central', 11000, '2026-05-10', 'paid'),
  ('Fashion Outlet', 20000, '2026-05-15', 'paid'),
  ('Electronics Pro', 25000, '2026-05-20', 'paid'),
  ('Cinema Plus', 10500, '2026-05-25', 'paid');

-- Resultado
SELECT '✅ Tabla payments creada con datos de ejemplo' AS resultado;