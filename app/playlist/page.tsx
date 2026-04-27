'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, ListVideo, Save, X, Trash2, Edit, Check, Play, Pause, Users } from 'lucide-react';
import { View, Playlist } from '@/types';
import { useDB } from '@/lib/hooks';

const navItems = [
  { id: 'dashboard' as View, label: 'Tablero', href: '/' },
  { id: 'clients' as View, label: 'Clientes', href: '/clients' },
  { id: 'totems' as View, label: 'Tótems', href: '/totems' },
  { id: 'media' as View, label: 'Multimedia', href: '/media' },
  { id: 'playlist' as View, label: 'Playlists', href: '/playlist' },
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
      <div className="px-8 mb-12">
        <h1 className="text-xl font-bold tracking-tighter text-primary font-headline uppercase">VOLTAJE ADS MANAGER</h1>
        <p className="font-label text-[10px] tracking-widest text-primary/50 uppercase mt-1">Red v2.4</p>
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

function PlaylistForm({ onClose, playlist, onSave }: { onClose: () => void; playlist?: any; onSave: (id: number, data: any) => void }) {
  const mediaDB = useDB('media');
  const totemsDB = useDB('totems');
  const [form, setForm] = useState({
    name: playlist?.name || '',
    description: playlist?.description || '',
    is_active: playlist?.is_active || false,
  });
  const [selectedMedia, setSelectedMedia] = useState<number[]>(playlist?.media_ids || []);
  const [selectedTotems, setSelectedTotems] = useState<number[]>(playlist?.totem_ids || []);

  const toggleMedia = (id: number) => {
    setSelectedMedia(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleTotem = (id: number) => {
    setSelectedTotems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      media_ids: selectedMedia,
      totem_ids: selectedTotems,
      created_at: playlist?.created_at || new Date().toISOString(),
    };
    if (playlist?.id) {
      await onSave(playlist.id, data);
    } else {
      onSave(0, data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
      <div className="glass-panel p-8 rounded-xl w-full max-w-3xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold">{playlist ? 'Editar' : 'Nueva'} Playlist</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Mi Playlist" />
            </div>
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Descripción</label>
              <input type="text" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Descripción..." />
            </div>
          </div>

          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Multimedia</label>
            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-surface-container-low rounded-lg">
              {mediaDB.data.map((m: any) => (
                <div 
                  key={m.id}
                  onClick={() => toggleMedia(m.id)}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    selectedMedia.includes(m.id) 
                      ? 'bg-primary/20 border border-primary' 
                      : 'bg-surface-container-high hover:bg-surface-container-highest'
                  }`}
                >
                  <p className="text-xs truncate">{m.name}</p>
                </div>
              ))}
              {mediaDB.data.length === 0 && <p className="text-xs text-on-surface-variant">No hay multimedia</p>}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1">{selectedMedia.length} seleccionados</p>
          </div>

          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Asignar a Tótems</label>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 bg-surface-container-low rounded-lg">
              {totemsDB.data.map((t: any) => (
                <div 
                  key={t.id}
                  onClick={() => toggleTotem(t.id)}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    selectedTotems.includes(t.id) 
                      ? 'bg-primary/20 border border-primary' 
                      : 'bg-surface-container-high hover:bg-surface-container-highest'
                  }`}
                >
                  <p className="text-xs truncate">{t.name}</p>
                </div>
              ))}
              {totemsDB.data.length === 0 && <p className="text-xs text-on-surface-variant">No hay tótems</p>}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1">{selectedTotems.length} tótems seleccionados</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary text-on-primary font-bold">{playlist ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PlaylistList() {
  const playlistsDB = useDB('playlists');
  const [showForm, setShowForm] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<any>(null);

  const handleSave = async (id: number, data: any) => {
    if (id) {
      await playlistsDB.update(id, data);
    } else {
      await playlistsDB.create(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta playlist?')) {
      await playlistsDB.remove(id);
    }
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    await playlistsDB.update(id, { is_active: !isActive });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
          <h2 className="font-headline text-4xl font-light tracking-tight text-on-surface">Gestión de <span className="font-extrabold text-primary">Playlists</span></h2>
        </div>
        <button onClick={() => setShowForm(true)}
          className="px-6 py-2.5 bg-primary/10 border border-primary/30 font-label text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nueva Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlistsDB.data.length === 0 ? (
          <div className="col-span-3 glass-card p-12 text-center">
            <ListVideo className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
            <p className="text-on-surface-variant">No hay playlists</p>
            <p className="text-[10px] text-on-surface-variant/60 mt-2">Crea una playlist para comenzar</p>
          </div>
        ) : playlistsDB.data.map((playlist: any) => (
          <div key={playlist.id} className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <ListVideo className="w-5 h-5 text-primary" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleToggleActive(playlist.id, playlist.is_active)} className="p-2 hover:bg-surface-container-highest text-on-surface-variant hover:text-primary">
                  {playlist.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => { setEditingPlaylist(playlist); setShowForm(true); }} className="p-2 hover:bg-surface-container-highest text-on-surface-variant hover:text-primary">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(playlist.id)} className="p-2 hover:bg-surface-container-highest text-error">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="font-headline font-bold text-lg mb-1">{playlist.name}</h3>
            <p className="font-label text-xs text-on-surface-variant mb-4">{playlist.description}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Images className="w-4 h-4" />
                <span>{playlist.media_ids?.length || 0} archivos</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Monitor className="w-4 h-4" />
                <span>{playlist.totem_ids?.length || 0} tótems</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className={`text-[10px] px-2 py-1 rounded ${playlist.is_active ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                {playlist.is_active ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <PlaylistForm 
          onClose={() => { setShowForm(false); setEditingPlaylist(null); }} 
          playlist={editingPlaylist} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
}

export default function Playlists() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <PlaylistList />
      </div>
    </div>
  );
}