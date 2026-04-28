'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Activity, Bolt, AtSign, LockOpen, ArrowRight, ArrowLeft, Users, ListVideo, FileSpreadsheet } from 'lucide-react';
import { View } from '../types';
import { useDB } from '../lib/hooks';
import { RevenueChart, TotemHeatmap } from '../components/RevenueCharts';

const navItems = [
  { id: 'dashboard' as View, label: 'Tablero', href: '/' },
  { id: 'clients' as View, label: 'Clientes', href: '/clients' },
  { id: 'totems' as View, label: 'Tótems', href: '/totems' },
  { id: 'media' as View, label: 'Multimedia', href: '/media' },
  { id: 'playlist' as View, label: 'Playlists', href: '/playlist' },
  { id: 'reports' as View, label: 'Reportes', href: '/reports' },
  { id: 'settings' as View, label: 'Ajustes', href: '/settings' },
];

function Sidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState({ displayName: 'Admin Root', email: 'admin@voltaje.plus' });

  useEffect(() => {
    const savedProfile = localStorage.getItem('voltaje_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    const handleProfileUpdate = () => {
      const updated = localStorage.getItem('voltaje_profile');
      if (updated) setProfile(JSON.parse(updated));
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  const getInitials = (name: string) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'A';
  
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-6 glass-sidebar w-64 z-50">
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
              {item.id === 'clients' && <Users className="mr-4 w-5 h-5" />}
              {item.id === 'totems' && <Monitor className="mr-4 w-5 h-5" />}
              {item.id === 'media' && <Images className="mr-4 w-5 h-5" />}
              {item.id === 'playlist' && <ListVideo className="mr-4 w-5 h-5" />}
              {item.id === 'reports' && <FileSpreadsheet className="mr-4 w-5 h-5" />}
              {item.id === 'settings' && <Settings className="mr-4 w-5 h-5" />}
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
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {getInitials(profile.displayName)}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-xs font-bold truncate">{profile.displayName}</p>
            <p className="text-[10px] text-on-surface-variant font-mono">{profile.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 glass-panel border-b border-primary/10 flex items-center justify-between px-6 z-40">
      <h2 className="font-headline text-lg font-semibold tracking-tight">{title}</h2>
      <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#75ff9e]"></span>
        <span className="uppercase tracking-widest">Sistema Activo</span>
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(117, 255, 158, 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="w-full max-w-[450px] px-6 z-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <Bolt className="text-primary w-10 h-10" fill="currentColor" />
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(117, 255, 158, 0.3)]">VOLTAJE PLUS</h1>
          </div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant/60">SISTEMA DE GESTIÓN CENTRALIZADO</p>
        </header>

        <section className="bg-surface/60 backdrop-blur-2xl border border-outline-variant/20 rounded-lg p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
          <form 
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-8 relative z-10"
          >
            <div className="space-y-2 group">
              <label className="font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative">
                <AtSign className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5 group-focus-within:text-primary" />
                <input 
                  type="email" 
                  placeholder="admin@voltaje.plus"
                  className="w-full bg-surface-container-highest/30 border-t-0 border-x-0 border-b-2 border-outline-variant/30 text-on-surface py-3 pl-8 pr-4 focus:ring-0 focus:border-primary focus:bg-primary/5 transition-all outline-none placeholder:text-on-surface-variant/30 font-body"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-end">
                <label className="font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">
                  CONTRASEÑA
                </label>
                <button type="button" className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant/60 hover:text-primary transition-colors">¿Olvidaste la contraseña?</button>
              </div>
              <div className="relative">
                <LockOpen className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5 group-focus-within:text-primary" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-surface-container-highest/30 border-t-0 border-x-0 border-b-2 border-outline-variant/30 text-on-surface py-3 pl-8 pr-4 focus:ring-0 focus:border-primary focus:bg-primary/5 transition-all outline-none placeholder:text-on-surface-variant/30 font-body"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="remember" className="w-4 h-4 bg-transparent border-outline-variant rounded-sm text-primary focus:ring-primary/20 focus:ring-offset-0" />
              <label htmlFor="remember" className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/80 cursor-pointer select-none">MANTENER SESIÓN INICIADA</label>
            </div>

            <button type="submit" className="w-full group relative overflow-hidden bg-gradient-to-br from-primary to-primary-container py-4 rounded-lg flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(117,255,158,0.2)] hover:shadow-[0_0_35px_rgba(117,255,158,0.4)] active:scale-[0.98] transition-all">
              <span className="font-headline font-bold text-on-primary uppercase tracking-tighter text-lg">ENTRAR AL SISTEMA</span>
              <ArrowRight className="text-on-primary w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </section>
        
        <footer className="mt-8 text-center">
          <p className="font-label text-[10px] text-on-surface-variant/40 tracking-[0.2em] uppercase">
            © 2024 VOLTAJE DIGITAL ARCHITECTURE. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();
  
  const totemsData = useDB('totems');
  const mediaData = useDB('media');
  const playlistData = useDB('playlists');
  const clientsData = useDB('clients');
  
  const totems = totemsData.data;
  const clients = clientsData.data;
  const media = mediaData.data;
  const playlists = playlistData.data;
  
  const onlineTotems = totems.filter((t: any) => t.status === 'online').length;
  const activeMedia = media.filter((m: any) => m.isActive).length;
  
  const stats = [
    { label: 'Tótems Activos', value: onlineTotems.toString(), change: '+' + onlineTotems, icon: Monitor, progress: Math.round((onlineTotems / (totems.length || 1)) * 100) },
    { label: 'Salud de la Red', value: totems.length > 0 ? Math.round((onlineTotems / totems.length) * 100) + '%' : '0%', change: 'Óptimo', icon: Activity, type: 'bars' },
    { label: 'Archivos Multimedia', value: media.length.toString(), change: '+' + activeMedia, icon: Bolt, type: 'points' },
    { label: 'Playlists', value: playlists.length.toString(), change: 'Activas', icon: LayoutDashboard, progress: Math.round((playlists.length / (media.length || 1)) * 100), critical: playlists.length === 0 },
  ];

  const getTitle = () => {
    if (pathname === '/') return 'TERMINAL ADS MANAGER';
    if (pathname === '/totems') return 'GESTIÓN DE UNIDADES';
    if (pathname === '/media') return 'BIBLIOTECA MULTIMEDIA';
    if (pathname === '/settings') return 'CONFIGURACIÓN GLOBAL';
    return 'TERMINAL ADS MANAGER';
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <TopBar title={getTitle()} />
      
      <main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
        <div className="space-y-10">
          <section className="flex justify-between items-end">
            <div>
              <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
              <h2 className="font-headline text-4xl font-light text-on-surface tracking-tight">Terminal <span className="font-extrabold text-primary">ADS MANAGER</span></h2>
            </div>
            <div className="flex items-center space-x-2 font-label text-[10px] text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#75ff9e]"></span>
              <span className="uppercase tracking-widest">Transmisión en Vivo Sincronizada</span>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((kpi, i) => (
              <div key={i} className={`glass-card p-6 rounded-lg border-l-4 ${kpi.critical ? 'border-error' : 'border-primary'} shadow-[0_0_32px_rgba(117,255,158,0.02)] relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <kpi.icon className="w-10 h-10" />
                </div>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">{kpi.label}</p>
                <div className="flex items-end justify-between">
                  <span className="font-headline text-4xl font-bold text-on-surface">{kpi.value}</span>
                  <span className={`font-label text-xs font-bold px-2 py-1 rounded ${kpi.critical ? 'text-error bg-error/10' : 'text-primary bg-primary/10'}`}>
                    {kpi.change}
                  </span>
                </div>
                <div className="mt-4 h-1 w-full bg-white/5 overflow-hidden">
                  {kpi.progress && (
                    <div className={`h-full ${kpi.critical ? 'bg-error' : 'bg-primary'}`} style={{ width: `${kpi.progress}%` }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart payments={[]} clients={clients} />
            <TotemHeatmap totems={totems} clients={clients} />
          </div>
        </div>
      </main>

      <Link 
        href="/player"
        className="fixed bottom-4 right-4 z-[100] bg-primary text-on-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Toggle Player View"
      >
        <Activity className="w-6 h-6" />
      </Link>
    </div>
  );
}