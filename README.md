# VOLTAJE ADS MANAGER - Sistema de Gestión de Publicidad

## Descripción

Sistema centralizado para gestionar publicidad en tótems/pantallas digitales de Voltaje Plus. Permite administrar clientes, tótems, contenido multimedia y operadores.

## Ubicación del Proyecto

```
C:\Users\Voltaje Plus\Documents\webAppacidad-main
```

## Cómo Ejecutar el Proyecto

```bash
# 1. Abrir terminal en la carpeta del proyecto
cd C:\Users\Voltaje Plus\Documents\webAppacidad-main

# 2. Ejecutar el servidor de desarrollo
npm run dev
```

El proyecto correra en: **http://localhost:3001**

## Estructura del Proyecto

```
webAppacidad-main/
├── app/                    # Páginas de Next.js
│   ├── page.tsx           # Dashboard
│   ├── clients/          # Gestión de clientes
│   ├── totems/          # Gestión de tótems
│   ├── media/          # Biblioteca multimedia
│   ├── settings/       # Ajustes y operadores
│   └── globals.css    # Estilos globales
├── lib/                    # Librerías y utilities
│   ├── hooks.ts        # useDB, useUser (CRUD)
│   └── supabase.ts    # Cliente de Supabase
├── .env.local            # Variables de entorno (NO subir a GitHub)
├── package.json         # Dependencias del proyecto
└── ...
```

## Tecnología Utilizada

| Categoría | Tecnología |
|-----------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Base de Datos | Supabase (PostgreSQL) |
| Íconos | Lucide React |
| Animaciones | Motion |

## Configuración de Base de Datos (Supabase)

Debes configurar tus credenciales de Supabase en el archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

### Cómo obtener las credenciales:

1. Ve a [Supabase](https://supabase.com)
2. Abre tu proyecto
3. Settings → API
4. Copia la URL y la "anon key" (public key)

## Funcionalidades

### 1. Dashboard (`/`)
- Vista general del sistema
- Estadísticas de clientes, tótems y contenido

### 2. Clientes (`/clients`)
- ✅ Crear nuevo cliente
- ✅ Editar cliente
- ✅ Eliminar cliente
- ✅ Ver detalles

### 3. Tótems (`/totems`)
- ✅ Crear nuevo tótem
- ✅ Editar tótem
- ✅ Eliminar tótem
- ✅ Ver detalles

### 4. Multimedia (`/media`)
- ✅ Subir archivos (imágenes/videos)
- ✅ Eliminar archivos
- ✅ Ver biblioteca

### 5. Ajustes (`/settings`)
- ✅ Perfil de usuario
- ✅ Gestión de operadores (CRUD completo)
- ✅ Contraseñas con visibilidad toggle
- ✅ Estado de base de datos

## Historial de Cambios Recientes

### Migración de Convex a Supabase
- Se eliminó completamente Convex como backend
- Se implementó Supabase para toda la persistencia de datos
- Se crearon hooks personalizados (`useDB`, `useUser`) para CRUD

### Funcionalidades Añadidas
- Formularios modales para crear/editar en todas las páginas
- Toggle de visibilidad para contraseñas
- Eliminación de archivos huérfanos de Convex
- Limpieza general del proyecto

## Comandos Útiles

```bash
# Instalar dependencias (si acaso)
npm install

# Build de producción
npm run build

# Iniciar en producción
npm run start

# Limpiar cache de Next.js
rm -rf .next
```

## Notas Importantes

- **NO** subir `.env.local` a GitHub (contiene claves privadas)
- El proyecto usa puerto **3001** por defecto
- Asegúrate de que las credenciales de Supabase estén correctas antes de correr

## Resolver Problemas Comunes

### "npm run dev" no funciona
```bash
# Asegúrate de estar en la carpeta correcta
cd C:\Users\Voltaje Plus\Documents\webAppacidad-main
npm install
npm run dev
```

### Error de Supabase
- Verifica que `.env.local` tenga las credenciales correctas
- Asegúrate de que tu proyecto de Supabase esté activo

### Puerto en uso
```bash
# Busca el proceso usando el puerto 3002
netstat -ano | findstr :3002
# Luego ciérralo o usa otro puerto en package.json
```

## Contacto

Para soporte técnico, contacta al equipo de desarrollo de Voltaje Plus.

---

**Última actualización:** Abril 2026
**Versión:** 1.0.0