'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Activity, Filter, RefreshCw, Building2, ShoppingBag, Store, Radio, MoreVertical, AlertTriangle, CheckCircle, X, Power, Trash2, Edit, Eye, Users } from 'lucide-react';
import { View } from '../../types';
import { useDB } from '../../lib/hooks';

const navItems = [
  { id: 'dashboard' as View, label: 'Tablero', href: '/' },
  { id: 'clients' as View, label: 'Clientes', href: '/clients' },
  { id: 'totems' as View, label: 'Tótems', href: '/totems' },
  { id: 'media' as View, label: 'Multimedia', href: '/media' },
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
              {item.id === 'clients' && <Users className="mr-4 w-5 h-5" />}
              {item.id === 'totems' && <Monitor className="mr-4 w-5 h-5" />}
              {item.id === 'media' && <Images className="mr-4 w-5 h-5" />}
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

function TotemForm({ onClose, totem, onSave }: { onClose: () => void; totem?: any; onSave: (id: number, data: any) => void }) {
  const [form, setForm] = useState({
    name: totem?.name || '',
    serial: totem?.serial || '',
    location: totem?.location || '',
    status: totem?.status || 'offline',
    last_sync: totem?.last_sync || new Date().toLocaleString(),
    latency: totem?.latency || '0ms',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totem?.id) {
      await onSave(totem.id, form);
    } else {
      onSave(0, form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-panel p-8 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold">{totem ? 'Editar Tótem' : 'Nuevo Tótem'}</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Tótem 01" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Número de Serie</label>
            <input type="text" required value={form.serial} onChange={(e) => setForm({...form, serial: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="SN-2024-001" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Ubicación</label>
            <input type="text" required value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Plaza Central,墨西哥" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Estado</label>
            <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value as any})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
              <option value="online">En Línea</option>
              <option value="offline">Desconectado</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary text-on-primary font-bold">{totem ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TotemsList({ onEdit, onNew }: { onEdit?: (totem: any) => void; onNew?: () => void }) {
  const totemsDB = useDB('totems');
  const totems = totemsDB.data;

  const handleSave = async (id: number, data: any) => {
    if (id) {
      await totemsDB.update(id, data);
    } else {
      await totemsDB.create(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este tótem?')) {
      await totemsDB.remove(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
          <h2 className="font-headline text-4xl font-light text-on-surface tracking-tight">Red de <span className="font-extrabold text-primary">Tótems</span></h2>
        </div>
        <div className="flex gap-3">
          <button onClick={onNew}
            className="px-6 py-2.5 bg-primary/10 border border-primary/30 font-label text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(117,255,158,0.1)]">
            <Plus className="w-4 h-4" /> Nuevo Tótem
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 border border-outline-variant/10">
            <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-6">Topología de Red</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Building2 className="w-5 h-5" />
                <span className="font-headline font-semibold text-sm">Global Retail Corp</span>
              </div>
              <div className="ml-4 pl-4 border-l border-outline-variant/20 space-y-4">
                <div className="flex items-center gap-3 text-on-surface/80 group cursor-pointer hover:text-primary transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="font-body text-xs">Westfield Mall</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Radio className="w-12 h-12" />
            </div>
            <div className="relative z-10">
              <p className="font-label text-[10px] uppercase tracking-widest text-primary/80 mb-1">Uptime Global</p>
              <h4 className="text-3xl font-headline font-bold text-on-surface mb-4">{totems.length > 0 ? Math.round((totems.filter((t: any) => t.status === 'online').length / totems.length * 100)) : 0}%</h4>
              <div className="flex gap-4">
                <div>
                  <p className="text-[9px] font-label uppercase text-on-surface-variant">Activos</p>
                  <p className="text-sm font-headline text-primary">{totems.filter((t: any) => t.status === 'online').length} Unidades</p>
                </div>
                <div className="w-[1px] bg-outline-variant/20 h-full"></div>
                <div>
                  <p className="text-[9px] font-label uppercase text-on-surface-variant">Alertas</p>
                  <p className="text-sm font-headline text-error">{totems.filter((t: any) => t.status === 'offline').length} Unidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between glass-panel px-6 py-4 border-b-0">
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="form-checkbox bg-transparent border-outline-variant text-primary focus:ring-0 rounded-none w-4 h-4" />
                <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">Seleccionar Todo</span>
              </label>
              <span className="text-outline-variant/30">|</span>
              <div className="flex gap-4">
                <button className="text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/50">En Línea ({totems.filter((t: any) => t.status === 'online').length})</button>
                <button className="text-on-surface-variant/50 font-label text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">Desconectados ({totems.filter((t: any) => t.status === 'offline').length})</button>
              </div>
            </div>
            <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Mostrando {totems.length} resultados</div>
          </div>

          {totems.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Monitor className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
              <p className="text-on-surface-variant">No hay tótems registrados</p>
              <p className="text-[10px] text-on-surface-variant/60 mt-2">Agrega un nuevo tótem para comenzar</p>
            </div>
          ) : totems.map((totem: any) => (
            <div key={totem.id} className={`grid grid-cols-12 items-center glass-card hover:bg-surface-container-low/40 transition-all px-6 py-6 border border-outline-variant/5 gap-4 ${totem.status === 'offline' ? 'bg-error/5 border-error/10' : ''}`}>
              <div className="col-span-1">
                <input type="checkbox" className="form-checkbox bg-transparent border-outline-variant text-primary focus:ring-0 rounded-none w-5 h-5" />
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 bg-surface-container-high flex items-center justify-center">
                      <Monitor className={`w-6 h-6 ${totem.status === 'offline' ? 'text-error/60' : 'text-primary/60'}`} />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${totem.status === 'offline' ? 'bg-error animate-pulse' : 'bg-primary shadow-[0_0_8px_#75ff9e]'}`}></div>
                  </div>
                  <div>
                    <h5 className="text-sm font-headline font-bold text-on-surface tracking-wide">{totem.name}</h5>
                    <p className="text-[10px] font-label uppercase text-on-surface-variant/60">S/N: {totem.serial}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Ubicación</span>
                  <span className="text-xs font-body text-on-surface/80">{totem.location}</span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Estado</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-label uppercase ${totem.status === 'offline' ? 'text-error font-bold' : 'text-primary'}`}>
                      {totem.status === 'online' ? 'Activo En Línea' : `Desconectado • ${totem.lastSync}`}
                    </span>
                    {totem.status === 'online' && <span className="text-[9px] font-label text-on-surface-variant/40">{totem.latency}</span>}
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-2">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Vista Previa</span>
                  <div className={`flex gap-1 h-8 ${totem.status === 'offline' ? 'opacity-40 grayscale' : ''}`}>
                    {totem.previewUrl ? (
                      <img src={totem.previewUrl} alt="Preview" className="h-full w-12 object-cover border border-primary/20" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-full w-12 bg-surface-container-high flex items-center justify-center text-[10px] font-label text-on-surface-variant">N/A</div>
                    )}
                  </div>
                </div>
              </div>
<div className="col-span-1 flex justify-end gap-2">
                <button onClick={() => onEdit?.(totem)} className="p-2 hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-primary">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(totem.id)} className="p-2 hover:bg-surface-container-highest transition-colors text-error">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Totems() {
  const [showForm, setShowForm] = useState(false);
  const [editingTotem, setEditingTotem] = useState<any>(null);
  const totemsDB = useDB('totems');

  const handleSave = async (id: number, data: any) => {
    if (id) {
      await totemsDB.update(id, data);
    } else {
      await totemsDB.create(data);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTotem(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <TotemsList onEdit={(totem) => { setEditingTotem(totem); setShowForm(true); }} onNew={() => setShowForm(true)} />
      </div>
      {showForm && <TotemForm onClose={handleCloseForm} totem={editingTotem} onSave={handleSave} />}
    </div>
  );
}
