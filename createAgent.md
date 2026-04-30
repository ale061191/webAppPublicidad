# createAgent.md - Agente IA para Voltaje Ads Manager

## Visión General

Este documento describe la implementación de un agente de inteligencia artificial (Gemini 2.5) integrado con Telegram para permitir la gestión remota del sistema Voltaje Ads Manager.

---

## Arquitectura del Sistema

```
[Tú en Telegram] 
       ↓ (mensaje)
[Telegram Bot API] 
       ↓ (webhook)
[Next.js API Routes] 
       ↓ (procesa)
[Gemini 2.5 Flash/Pro] ←→ [Function Calling] → [Supabase]
```

---

## Contexto del Sistema (System Prompt)

El agente debe conocer TODO el sistema al detalle:

### Base de Datos

#### Tabla: `clients`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| name | TEXT | Nombre de contacto |
| business_name | TEXT | Nombre de la empresa |
| phone | TEXT | Teléfono |
| email | TEXT | Correo electrónico |
| address | TEXT | Dirección |
| created_at | TIMESTAMP | Fecha de creación |
| is_active | BOOLEAN | Estado |

#### Tabla: `media`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| client_id | INTEGER | FK a clients |
| name | TEXT | Nombre del archivo |
| type | TEXT | "video" o "image" |
| url | TEXT | URL pública en Supabase Storage |
| size | TEXT | Tamaño (ej: "10 MB") |
| format | TEXT | Formato (MP4, MOV, WEBM) |
| duration | TEXT | Duración (5S, 15S, 30S, 60S) |
| resolution | TEXT | Resolución (1920x1080, 1080x1920) |
| thumbnail_url | TEXT | URL del thumbnail |
| is_active | BOOLEAN | Estado |

#### Tabla: `totems`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| name | TEXT | Nombre del tótem |
| serial | TEXT | Número de serie |
| location | TEXT | Ubicación |
| status | TEXT | Estado (online, offline, maintenance) |
| is_display_connected | BOOLEAN | Display conectado |
| last_heartbeat | TIMESTAMP | Último latido |
| playlist_updated_at | TIMESTAMP | Última actualización de playlist |
| created_at | TIMESTAMP | Fecha de creación |

#### Tabla: `playlist_items`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| totem_id | INTEGER | FK a totems |
| client_id | INTEGER | FK a clients |
| media_id | INTEGER | FK a media |
| position | INTEGER | Orden en playlist |
| duration_secs | INTEGER | Segundos (default: 10) |
| is_active | BOOLEAN | Estado |

#### Tabla: `system_settings`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| key | TEXT | Clave (ej: "display_code") |
| value | TEXT | Valor |

#### Tabla: `payments`
| Campo | Tipo | Descripción |
|-------|------|------------|
| id | INTEGER | ID único |
| client_id | INTEGER | FK a clients |
| amount | DECIMAL | Monto |
| status | TEXT | "paid", "pending", "cancelled" |
| payment_date | DATE | Fecha de pago |

---

## Funciones del Agente (Function Definitions)

### 1. create_client
Crear un nuevo cliente.
**Parámetros requeridos:**
- `name` (string): Nombre de contacto
- `business_name` (string): Nombre de la empresa  
- `phone` (string): Teléfono

**Parámetros opcionales:**
- `email` (string): Correo electrónico
- `address` (string): Dirección

### 2. get_clients
Obtener lista de clientes.
**Parámetros:** (ninguno)

### 3. get_client_by_id
Obtener datos de un cliente específico.
**Parámetros requeridos:**
- `id` (integer): ID del cliente

### 4. update_client
Actualizar datos de un cliente.
**Parámetros requeridos:**
- `id` (integer): ID del cliente
- `data` (object): Datos a actualizar

### 5. delete_client
Eliminar un cliente.
**Par��metros requeridos:**
- `id` (integer): ID del cliente

### 6. create_totem
Crear un nuevo tótem.
**Parámetros requeridos:**
- `name` (string): Nombre del tótem
- `serial` (string): Número de serie
- `location` (string): Ubicación

### 7. get_totems
Obtener lista de tótems.
**Parámetros:** (ninguno)

### 8. get_totem_status
Obtener estado de conexión de un tótem.
**Parámetros requeridos:**
- `id` (integer): ID del tótem

### 9. create_media
Registrar multimedia (la subida real se hace por el flujo de Telegram).
**Parámetros requeridos:**
- `name` (string): Nombre
- `type` (string): "video" o "image"
- `client_id` (integer): ID del cliente

**Parámetros opcionales:**
- `duration` (string): Duración
- `resolution` (string): Resolución

### 10. get_media
Obtener lista de multimedia.
**Parámetros:** (ninguno)

### 11. get_media_by_client
Obtener multimedia de un cliente específico.
**Parámetros requeridos:**
- `client_id` (integer): ID del cliente

### 12. add_to_playlist
Añadir item a playlist de un tótem.
**Parámetros requeridos:**
- `totem_id` (integer): ID del tótem
- `media_id` (integer): ID del multimedia
- `client_id` (integer): ID del cliente

### 13. get_playlist
Obtener playlist de un tótem.
**Parámetros requeridos:**
- `totem_id` (integer): ID del tótem

### 14. remove_from_playlist
Eliminar item de playlist.
**Parámetros requeridos:**
- `playlist_item_id` (integer): ID del item

### 15. get_dashboard_stats
Obtener estadísticas del sistema.
**Parámetros:** (ninguno)
**Retorna:**
- totalClients, totalMedia, activeMedia
- totalTotems, connectedTotems, disconnectedTotems
- totalPlaylistItems, activePlaylistItems

---

## Comportamiento del Agente

### Validación de Datos

El agente debe:
1. **Identificar datos faltantes**: Si el usuario no proporciona todos los campos requeridos, perguntar específicamente cuáles faltan.
2. **Confirmar antes de ejecutar**: Antes de crear/actualizar/eliminar, confirmar con el usuario.
3. **Mostrar resultados**: Después de cada acción, mostrar el resultado con los datos relevantes.

### Ejemplo: Crear Cliente

**Usuario:** "Crea un cliente"
**Agente:** "Con gusto. Por favor, proporciona:\n1. **Nombre de contacto:**\n2. **Nombre de la empresa:**\n3. **Teléfono:**\n4. Email (opcional):"

**Usuario:** "Juan Pérez, Café Voltaje, 5555-1234"
**Agente:** "Perfecto. Tengo:\n- Nombre: Juan Pérez\n- Empresa: Café Voltaje\n- Teléfono: 5555-1234\n\nFalta el **email** (opcional). ¿Deseas agregarlo o procedo con la creación?"

**Usuario:** "juan@voltaje.com"
**Agente:** "✅ Cliente creado exitosamente!\n\n- **ID:** 15\n- **Nombre:** Juan Pérez\n- **Empresa:** Café Voltaje\n- **Teléfono:** 5555-1234\n- **Email:** juan@voltaje.com\n- **Fecha:** 30/04/2026"

### Capacidad de Consulta

El agente debe responder preguntas como:
- "¿Cuántos videos hay activos?"
- "¿Cuál es el estado del tótem 1?"
- "¿Qué clientes tengo?"
- "¿Cuántos ingresos tuvo Café Voltaje?"
- "¿Cuánto dura el video 'Promo1'?"
- "¿Qué hay en la playlist del tótem Centro?"

---

## Configuración de Telegram

### Bot Father
1. Crear bot con @BotFather en Telegram
2. Obtener token
3. Configurar webhook

### Webhook
```
https://tu-dominio.com/api/telegram
```

---

## API Keys Necesarias

1. **Gemini API Key**: De Google AI Studio
2. **Telegram Bot Token**: De @BotFather

---

## Pendientes / Notas

- [ ] Implementar webhook de Telegram
- [ ] Configurar Gemini function calling
- [ ] Testing con datos reales
- [ ] Manejo de archivos multimedia desde Telegram
- [ ] Sistema de confirmación antes de acciones destructivas
- [ ] Logging de conversaciones

---

## Historial de Cambios

| Fecha | Cambio |
|-------|-------|
| 2026-04-30 | Documento creado |