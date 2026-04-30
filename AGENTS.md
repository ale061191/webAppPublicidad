# AGENTS.md - Voltaje Ads Manager

## Saludar al usuario y revisar este archivo al inicio de cada conversación

---

## Información del Proyecto

**Nombre:** Voltaje Ads Manager  
**URL Producción:** https://web-app-publicidad.vercel.app  
**Repositorio:** https://github.com/ale061191/webAppPublicidad  
**Rama Principal:** `main` (usar esta rama para todo)

### Variables de Entorno (en Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://rkedmrqvqzgetubjvrwy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_UR-...
```

---

## Arquitectura General

- **Frontend:** Next.js 14 (App Router)
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Ninguna (sistema administrativo cerrado)
- **Estilo UI:** Glassmorphism con variables CSS custom

### Flujo de Datos
```
Clientes → Multimedia → Tótems → Playlist → Display
```

### Tablas Principales
- `clients` - Clientes publicitarios
- `media` - Videos/imágenes (con client__id)
- `totems` - Dispositivos físicos (monitores)
- `playlist_items` - Elementos en playlist de cada tótem
- `system_settings` - Configuración global (código de display)
- `payments` - Historial de ingresos

---

## Sistema de Heartbeat (Estado de Conexión)

### Cómo funciona
1. El **Display** (/display/[id]) envía un heartbeat cada 10 segundos al endpoint `/api/heartbeat` (POST)
2. El endpoint actualiza `last_heartbeat` y `is_display_connected = true` en la tabla `totems`
3. El sistema marca automáticamente como "desconectado" si no hay heartbeat en 20 segundos (GET /api/heartbeat)
4. La página de tótems sincroniza el estado cada 10 segundos

### Endpoint
- **POST** `/api/heartbeat` - Recibe heartbeat del display: `{ totemId, timestamp }`
- **GET** `/api/heartbeat` - Sincroniza estado de todos los tótems

### Columnas necesarias en `totems`
```sql
last_heartbeat TIMESTAMP WITH TIME ZONE
is_display_connected BOOLEAN DEFAULT false
```

---

## Problemas Resueltos

### 1. Error al crear tótems (latency/lastSync)
**Error:** `Could not find the 'lastSync' column of 'totems'`
**Causa:** El formulario enviaba campos que no existían en la tabla
**Solución:** Limpiamos los datos antes de enviar: solo name, serial, location, status

### 2. Display "Conectado" pero sistema decía "Desconectado"
**Causa:** El display mostraba estado local sin verificar respuesta del servidor
**Solución:** Ahora solo marca "Conectado" si `result.success === true`, se agrega timestamp del ping

### 3. Código de display en caché
**Causa:** El código del display se cacheaba en el navegador
**Solución:** Obtener de `system_settings` + localStorage como fallback

### 4. Lista de tótems no se actualizaba al crear nuevo
**Causa:** Sin auto-refresh en TotemsList
**Solución:** Agregar useEffect con interval de 5 segundos

---

## Convenciones de Código

### Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
refactor: reorganización
```

### Rama a usar
- **SIEMPRE:** `main` para push
- Verificar con `git log --oneline origin/main -5` antes de decir que está desplegado

### Variables de Estado
- useDB, useState, useEffect de React
- Estados de UI: snake_case (enter_code, error, playing)

### Deploy en Vercel
1. Push a `main`
2. Vercel hace deploy automáticamente
3. Si hay caché, usar "Invalidate Cache" o Ctrl+Shift+R

---

## Comandos Útiles

```bash
# Verificar rama actual y estado
git branch -v

# Ver últimos commits en main
git log --oneline origin/main -5

# Build local
npm run build

# Verificar errores TypeScript
npm run typecheck
```

---

## Archivos Clave

- `app/totems/page.tsx` - Gestión de tótems + sidebar con estado de conexión
- `app/display/[id]/page.tsx` - Display para tótem físico
- `app/api/heartbeat/route.ts` - Endpoint de heartbeat
- `lib/hooks.ts` - useDB, useUser
- `lib/supabase.ts` - Cliente de Supabase
- `app/globals.css` - Estilos glassmorphism

---

## Notas Importantes

1. **Siempre verificar que los cambios se guarden en `main`** antes de informar al usuario
2. **Ejecutar `npm run build`** después de cambios importantes para verificar que no hay errores
3. **El display usa formato 9:16 vertical** (1080x1920)
4. **El código de display es de 6 dígitos** configurado en system_settings

---

## SQL Necesario para Setup

```sql
-- Tablas ya existentes en Supabase (no recrear)

-- Agregar columnas faltantes a totems
ALTER TABLE totems ADD COLUMN IF NOT EXISTS latency TEXT;
ALTER TABLE totems ADD COLUMN IF NOT EXISTS lastSync TEXT;
ALTER TABLE totems ADD COLUMN IF NOT EXISTS last_heartbeat TIMESTAMP WITH TIME ZONE;
ALTER TABLE totems ADD COLUMN IF NOT EXISTS is_display_connected BOOLEAN DEFAULT false;

-- Tabla de playlists
CREATE TABLE IF NOT EXISTS playlists (id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT, client_id INTEGER NOT NULL, totem_id INTEGER NOT NULL, is_active BOOLEAN DEFAULT true, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());

-- Habilitar RLS en playlists
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all playlists" ON playlists FOR ALL USING (true) WITH CHECK (true);
```

---

## Checklist antes de Deploy

- [ ] Build pasa sin errores: `npm run build`
- [ ] Commits en `main`: `git log --oneline origin/main -3`
- [ ] Cambios probados localmente
- [ ] Documentar cambios en este archivo si hay cambios significativos