'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { LayoutDashboard, Monitor, Images, Settings as SettingsIcon, Plus, Code2, Database, UserPlus, Edit, Delete, Users as UsersIcon } from 'lucide-react';
import { View } from '@/types';

const navItems = [
  { id: 'dashboard' as View, label: 'Tablero', href: '/' },
  { id: 'clients' as View, label: 'Clientes', href: '/clients' },
  { id: 'totems' as View, label: 'Tótems', href: '/totems' },
  { id: 'media' as View, label: 'Multimedia', href: '/media' },
  { id: 'settings' as View, label: 'Ajustes', href: '/settings' },
];

function Sidebar() {
  const pathname = usePathname();
  
  return (
<aside className="fixed left-0 top-0 h-full flex flex-col py-6 glass-panel w-64 border-r border-primary/10 z-50">
      <div className="px-6 mb-12">
        <h1 className="text-lg font-bold tracking-tight text-primary font-headline leading-tight">VOLTAJE ADS MANAGER</h1>
        <p className="font-label text-[9px] tracking-widest text-primary/50 uppercase mt-1">Red v2.4</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center py-3 pl-4 transition-all scale-95 duration-150 ease-in-out rounded-lg ${
                isActive 
                  ? 'text-primary font-bold border-l-2 border-primary bg-primary/5' 
                  : 'text-on-surface/60 font-medium hover:bg-white/5 hover:text-primary'
              }`}
            >
{item.id === 'dashboard' && <LayoutDashboard className="mr-4 w-5 h-5" />}
              {item.id === 'clients' && <UsersIcon className="mr-4 w-5 h-5" />}
              {item.id === 'totems' && <Monitor className="mr-4 w-5 h-5" />}
              {item.id === 'media' && <Images className="mr-4 w-5 h-5" />}
              {item.id === 'settings' && <SettingsIcon className="mr-4 w-5 h-5" />}
              <span className="font-label text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
        <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-label text-[10px] uppercase tracking-widest rounded-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(117,255,158,0.2)] flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Desplegar Nuevo Tótem
        </button>
        
        <div className="flex items-center mt-8 p-3 bg-white/5 rounded-xl border border-white/5">
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
          <div className="ml-3 overflow-hidden">
            <p className="text-xs font-bold truncate">Admin_Raíz</p>
            <p className="text-[10px] text-on-surface-variant font-mono">ID: 8829-XP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SettingsPage() {
  const users = useQuery(api.queries.getUsers) || [];
  
  const [notifications, setNotifications] = useState({
    serverAlerts: true,
    userRegistration: false,
    debugMode: true,
  });

  return (
    <div className="space-y-12">
      <header>
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">Control Maestro</span>
        <h1 className="text-5xl font-headline font-light tracking-tight text-on-surface">Ajustes <span className="font-bold text-primary">Globales</span></h1>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <Code2 className="text-primary w-8 h-8" />
                <div className="w-2 h-2 rounded-full bg-primary pulse-indicator"></div>
              </div>
              <h3 className="font-headline text-lg font-bold mb-4">Ajustes de API</h3>
              <div className="space-y-4">
                <div>
                  <label className="font-label text-[10px] text-on-surface-variant uppercase block mb-1">Voltaje Endpoint</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="https://hidden-jellyfish-402.convex.cloud"
                    className="w-full bg-surface-container-highest border-none text-xs font-label py-2 text-primary focus:ring-0"
                  />
                  <div className="h-px w-full bg-outline-variant/30 mt-1"></div>
                </div>
                <button className="w-full py-2 bg-surface-container-high text-on-surface-variant font-label text-[10px] uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors">Renovar API Key</button>
              </div>
            </section>

            <section className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <Database className="text-primary w-8 h-8" />
                <span className="font-label text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">Convex</span>
              </div>
              <h3 className="font-headline text-lg font-bold mb-4">Bases de Datos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest">
                  <span className="font-label text-xs">Convex DB</span>
                  <span className="text-[10px] text-primary font-label">Activo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest">
                  <span className="font-label text-xs">Tablas Activas</span>
                  <span className="text-[10px] text-on-surface-variant font-label">5</span>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-surface p-1">
            <div className="flex justify-between items-end mb-6 px-7">
              <div>
                <h3 className="font-headline text-2xl font-bold">Gestión de Usuarios</h3>
                <p className="font-body text-sm text-on-surface-variant max-w-md mt-1">Controla los niveles de acceso y permisos para los operadores del terminal.</p>
              </div>
              <button className="kinetic-gradient px-6 py-2 text-on-primary font-label font-bold text-xs flex items-center gap-2 rounded-lg">
                <UserPlus className="w-4 h-4" />
                NUEVO OPERADOR
              </button>
            </div>
            <div className="space-y-2">
              {users.length === 0 ? (
                <div className="px-7 py-8 text-center">
                  <UsersIcon className="w-8 h-8 mx-auto text-on-surface-variant/30 mb-2" />
                  <p className="text-on-surface-variant text-sm">No hay usuarios registrados</p>
                </div>
              ) : users.map((user: any) => (
                <div key={user._id} className="grid grid-cols-12 gap-4 px-8 py-4 bg-surface-container-low hover:bg-surface-container-high transition-colors group cursor-pointer">
                  <div className="col-span-1 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col justify-center">
                    <span className="font-headline text-sm font-semibold">{user.name || 'Usuario'}</span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase">{user.role || 'Operador'}</span>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <span className="font-label text-xs text-on-surface-variant">{user.email || 'N/A'}</span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="w-4 h-4 text-on-surface-variant hover:text-primary" />
                    <Delete className="w-4 h-4 text-error" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="glass-panel p-8 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-20 h-20 border-2 border-primary p-1">
                <img src="https://picsum.photos/seed/admin/200/200" alt="Admin" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold">Admin Root</h3>
                <p className="font-label text-[10px] text-primary">TERMINAL LEVEL 1</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="font-label text-[10px] text-on-surface-variant uppercase block mb-2">Display Name</label>
                <input type="text" defaultValue="System Architect" className="w-full bg-transparent border-b border-outline-variant/30 text-sm font-body py-2 focus:border-primary focus:ring-0 transition-colors outline-none" />
              </div>
              <div>
                <label className="font-label text-[10px] text-on-surface-variant uppercase block mb-2">Email corporativo</label>
                <input type="email" defaultValue="root@voltajeplus.io" className="w-full bg-transparent border-b border-outline-variant/30 text-sm font-body py-2 focus:border-primary focus:ring-0 transition-colors outline-none" />
              </div>
              <button className="w-full border border-primary/20 py-3 text-primary font-label text-[10px] tracking-widest hover:bg-primary hover:text-on-primary transition-all">ACTUALIZAR PERFIL</button>
            </div>
          </section>

          <section className="p-8 bg-surface-container-low">
            <h3 className="font-headline text-sm font-bold uppercase tracking-widest mb-6">Notificaciones</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-sm">Alertas de Servidor</span>
                  <span className="text-[10px] text-on-surface-variant font-body">Errores críticos de DB</span>
                </div>
                <button 
                  onClick={() => setNotifications({...notifications, serverAlerts: !notifications.serverAlerts})}
                  className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${notifications.serverAlerts ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-3 h-3 bg-on-primary rounded-full absolute transition-all ${notifications.serverAlerts ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-sm">Registro de Usuarios</span>
                  <span className="text-[10px] text-on-surface-variant font-body">Nuevas altas en terminal</span>
                </div>
                <button 
                  onClick={() => setNotifications({...notifications, userRegistration: !notifications.userRegistration})}
                  className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${notifications.userRegistration ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-3 h-3 bg-on-primary rounded-full absolute transition-all ${notifications.userRegistration ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-sm">Modo Depuración</span>
                  <span className="text-[10px] text-on-surface-variant font-body">Logs detallados en consola</span>
                </div>
                <button 
                  onClick={() => setNotifications({...notifications, debugMode: !notifications.debugMode})}
                  className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${notifications.debugMode ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-3 h-3 bg-on-primary rounded-full absolute transition-all ${notifications.debugMode ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-16 border-t border-outline-variant/10 pt-8 flex justify-between items-center">
        <div>
          <h4 className="text-error font-headline text-lg font-bold">Zona de Peligro</h4>
          <p className="font-body text-xs text-on-surface-variant">Acciones irreversibles sobre la infraestructura del terminal.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-outline-variant text-on-surface-variant font-label text-[10px] hover:text-on-surface hover:border-on-surface transition-colors">PURGAR CACHÉ</button>
          <button className="px-6 py-3 border border-error/30 text-error font-label text-[10px] hover:bg-error hover:text-on-primary transition-all">RESETEAR SISTEMA</button>
        </div>
      </footer>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16">
        <SettingsPage />
      </div>
    </div>
  );
}
