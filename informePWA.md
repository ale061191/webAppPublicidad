# informePWA.md - Sistema PWA para Tótems de Voltaje Ads Manager

## 📋 Resumen Ejecutivo

Este documento describe la implementación de una Progressive Web App (PWA) para los tótems de Voltaje Ads Manager, diseñada para garantizar la continuidad del sistema ante fallos de energía eléctrica y desconexiones de internet.

---

## 🔍 Problema Identificado

### Situación Actual
El sistema Voltaje Ads Manager funciona correctamente mientras el dispositivo del tótem tenga energía eléctrica y conexión a internet. Sin embargo, ante un apagón:

1. **El dispositivo se apaga** 💡
2. **Al volver la luz**, el dispositivo enciende pero...
3. **NO se abre automáticamente** la página del display
4. **Se requiere intervención manual** para:
   - Abrir el navegador
   - Ingresar la URL correcta
   - Digitar el código de seguridad
5. **Esto es impráctico** si el tótem está en ubicaciones remotas o de difícil acceso

### Escenario Crítico
- Imagine una ciudad con 10 tótems distribuidos
- Ocurre un apagón general
- Al恢复 la luz, los 10 tótems encienden pero ninguno reproduce automáticamente
- Se requiere personal técnico para manually iniciar cada uno

---

## 💡 Solución Propuesta: Progressive Web App (PWA)

### ¿Qué es una PWA?

Una Progressive Web App es una aplicación web que se comporta como una aplicación nativa. Se puede:
- Instalar en el dispositivo
- Funcionar offline (parcialmente)
- Abrirse automáticamente al encender el dispositivo
- Enviar notificaciones (opcional)

### Beneficios para Voltaje Ads Manager

| Beneficio | Descripción |
|-----------|-------------|
| 🔄 Auto-arranque | Se abre automáticamente al encender el dispositivo |
| 🧠 Memoria | Recordar el código de seguridad del display |
| 🔌 Reconexión automática | Se conecta a internet y reproduce playlist al возврате |
| 📱 Instalable | Se instala como una app nativa en el tótem |
| 🌐 Offline | Muestra pantalla de "Sin conexión" si no hay internet |

---

## 🏗️ Arquitectura del Sistema

### Flujo Normal (Con Energía y Internet)

```
┌─────────────────────────────────────────────────────────────┐
│                    TÓTEM CON PWA INSTALADO                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     ┌───────────────┐
                     │  DISPOSITIVO   │
                     │    ENCIENDE    │
                     └───────────────┘
                              │
                              ▼
                     ┌───────────────┐
                     │ PWA SE ABRE   │
                     │ AUTOMÁTICAMENTE│
                     └───────────────┘
                              │
                              ▼
                     ┌───────────────┐
                     │SOLICITA URL   │
                     │ A SUPABASE    │
                     └───────────────┘
                              │
                              ▼
                     ┌───────────────┐
                     │   SUPABASE    │
                     │   RESPONDE:   │
                     │   "PLAYLIST   │
                     │   DE ESTE    │
                     │   TÓTEM"      │
                     └───────────────┘
                              │
                              ▼
                     ┌───────────────┐
                     │   REPRODUCE   │
                     │   VIDEOS EN   │
                     │    BUCLE      │
                     └───────────────┘
```

### Flujo Post-Apagón (Escenario Real)

```
═══════════════════════════════════════════════════════════════
                    ESCENARIO: APAGÓN GENERAL
═══════════════════════════════════════════════════════════════

FASE 1: APAGÓN
├── Todos los tótems se apagan simultáneamente
├── Supabase sigue funcionando (en la nube)
├── La base de datos conserva todas las playlists

FASE 2: REGRESO DE LA LUZ
│
├── TÓTEM #1 (Centro Comercial)              TÓTEM #2 (Estadio)
│   ├── Enciende                                ├── Enciende
│   ├── PWA se abre automáticamente            ├── PWA se abre automáticamente
│   ├── Consulta: "¿Qué playlist para #1?"    ├── Consulta: "¿Qué playlist para #2?"
│   └── Supabase: "Café + Banco"               └── Supabase: "Restaurante + Tienda"
│
├── TÓTEM #3 (Metro)                         TÓTEM #10 (Aeropuerto)
│   ├── Enciende                                ├── Enciende
│   ├── PWA se abre automáticamente            ├── PWA se abre automáticamente
│   ├── Consulta: "¿Qué playlist para #3?"     ├── Consulta: "¿Qué playlist para #10?"
│   └── Supabase: "Farmacia"                   └── Supabase: "Banco + Celulares"
│
└── CADA TÓTEM REPRODUCE SU PROPIA PLAYLIST SIN INTERVENCIÓN HUMANA
```

---

## 🔧 Especificaciones Técnicas

### 1. Manifest de la PWA

```json
{
  "name": "Voltaje Display",
  "short_name": "Voltaje",
  "description": "Voltaje Ads Manager - Display para Tótems",
  "start_url": "/display/[id]",
  "display": "fullscreen",
  "orientation": "portrait",
  "background_color": "#000000",
  "theme_color": "#75ff9e",
  "icons": [...]
}
```

### 2. Service Worker

- Cache de la aplicación shell
- Manejo offline
- Auto-actualización cuando hay nueva versión

### 3. Auto-arranque

- Al abrir la PWA una vez, queda registrada en el dispositivo
- Algunos navegadores permiten "arranque automático" al encender
- Para caso críticos, se puede configurar en el sistema operativo

### 4. Código de Seguridad

- Se guarda en `localStorage`
- No requiere digitarlo cada vez que se reinicia
- El display valida contra Supabase directamente

---

## 🎯 Cómo Funciona la Playlist

### Pregunta: ¿La PWA sabe qué videos reproducir?

**RESPUESTA: SÍ, absolutamente.**

| Aspecto | Respuesta |
|---------|-----------|
| ¿Se descargan videos al tótem? | **NO** - Se stream directamente desde Supabase |
| ¿Cada tótem tiene playlist diferente? | **SÍ** - Cada ID de tótem tiene su propia configuración en Supabase |
| ¿Se requiere configurar después de instalado? | **NO** - Es completamente automático |
| ¿Qué pasa si no hay internet? | Muestra "Sin conexión" y se reconecta automáticamente |

### Flujo de la Playlist

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   TÓTEM #1  │ ───► │  SUPABASE   │ ◄─── │  PLAYLIST  │
│   (PWA)     │      │  (Cloud)    │      │  (DB)       │
└─────────────┘      └─────────────┘      └─────────────┘
      │                    │                    │
      │                    │                    │
      ▼                    ▼                    ▼
URLs de videos      "Videos: A, B, C"      totem_id: 1
del totem 1        para totem 1           client_id: X, Y
                                            media_id: 10, 20
```

---

## 📱 Implementación

### Archivos a Crear/Modificar

1. **public/manifest.json** - Manifiesto de la PWA
2. **public/sw.js** - Service Worker
3. **app/layout.tsx** - Meta tags para PWA
4. **app/display/[id]/page.tsx** - Pantalla completa y offline

### Instalación (UNA SOLA VEZ)

1. Visitar `https://web-app-publicidad.vercel.app/display/1` desde el dispositivo del tótem
2. Agregar a pantalla de inicio (opción en el navegador)
3. Ingresar el código de seguridad una vez
4. ¡Listo! De ahora en adelante se abre automáticamente

---

## ✅ Checklist de Implementación

- [ ] Crear manifest.json
- [ ] Crear service worker
- [ ] Agregar meta tags de PWA
- [ ] Implementar pantalla offline
- [ ] Auto-guardado de código de display
- [ ] Testing de escenarios

---

## 📝 Notas y Consideraciones

1. **El código se guarda automáticamente** - No requiere digitarlo cada vez
2. **Los videos se stream desde Supabase** - No se almacenan localmente
3. **Cada tótem es independiente** - No hay conflicto entre dispositivos
4. **Funciona con cualquier navegador moderno** - Chrome, Firefox, Edge, Safari
5. **No requiere tienda de apps** - Se instala directamente desde el navegador

---

## 📅 Historial de Cambios

| Fecha | Descripción |
|-------|-------------|
| 2026-05-XX | Documento creado |
| 2026-05-XX | Implementación de PWA iniciada |

---

## 🤖 Información del Agente IA

Este sistema de PWA está diseñado para integración futura con el Agente de Telegram descrito en `createAgent.md`. El agente podrá:
- Consultar el estado de cada tótem remotamente
- Reiniciar playlists desde Telegram
- Verificar si hay tótems desconectados

---

*Documento creado el 2026-05-XX para referencia futura del sistema PWA de Voltaje Ads Manager*