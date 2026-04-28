-- Tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuración por defecto si no existe
INSERT INTO system_settings (key, value) VALUES 
  ('display_code', '000000')
ON CONFLICT (key) DO NOTHING;

-- Habilitar RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all system_settings" ON system_settings;
CREATE POLICY "Allow all system_settings" ON system_settings FOR ALL USING (true) WITH CHECK (true);

-- Resultado
SELECT '✅ Sistema de configuración creado' AS resultado;