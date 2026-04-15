'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Filter, UploadCloud, CheckCircle, Send, Tag, Delete, ChevronLeft, ChevronRight, VideoOff, CloudUpload, Users, X, Play, Pause, Trash2, Edit } from 'lucide-react';
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

function MediaForm({ onClose, media }: { onClose: () => void; media?: any }) {
  const createMedia = useMutation(api.mutations.createMedia);
  const updateMedia = useMutation(api.mutations.updateMedia);
  const [form, setForm] = useState({
    name: media?.name || '',
    type: media?.type || 'video' as 'video' | 'image',
    format: media?.format || 'mp4',
    size: media?.size || '0 MB',
    duration: media?.duration || '30S',
    resolution: media?.resolution || '1920x1080',
    thumbnailUrl: media?.thumbnailUrl || '',
    tags: media?.tags || [] as string[],
    isActive: media?.isActive || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (media?._id) {
      await updateMedia({ id: media._id, ...form });
    } else {
      await createMedia({ ...form, url: '', clientId: undefined });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-panel p-8 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold">{media ? 'Editar' : 'Subir'} Multimedia</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Mi Video" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Tipo</label>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value as any})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                <option value="video">Video</option>
                <option value="image">Imagen</option>
              </select>
            </div>
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Duración</label>
              <select value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                <option value="5S">5 segundos</option>
                <option value="15S">15 segundos</option>
                <option value="30S">30 segundos</option>
                <option value="60S">60 segundos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Resolución</label>
              <select value={form.resolution} onChange={(e) => setForm({...form, resolution: e.target.value})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none">
                <option value="1920x1080">1080p (1920x1080)</option>
                <option value="2160x3840">4K (2160x3840)</option>
                <option value="1080x1920">Vertical (1080x1920)</option>
              </select>
            </div>
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Tamaño</label>
              <input type="text" value={form.size} onChange={(e) => setForm({...form, size: e.target.value})}
                className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="10 MB" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary text-on-primary font-bold">{media ? 'Actualizar' : 'Subir'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MediaPage({ onEdit, onNew }: { onEdit?: (item: any) => void; onNew?: () => void }) {
  const media = useQuery(api.queries.getMedia) || [];
  const deleteMedia = useMutation(api.mutations.deleteMedia);
  const toggleMediaActive = useMutation(api.mutations.toggleMediaActive);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este contenido?')) {
      await deleteMedia({ id: id as any });
    }
  };

  const handleToggleActive = async (id: string) => {
    await toggleMediaActive({ id: id as any });
  };

  const handleEdit = (item: any) => {
    onEdit?.(item);
  };

  const filteredMedia = selectedFilter 
    ? media.filter((m: any) => m.duration === selectedFilter)
    : media;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="max-w-xl">
          <h2 className="text-4xl font-headline font-light tracking-tight text-on-surface mb-2 italic">REPOSITORIO <span className="text-primary font-bold not-italic">.LIBR</span></h2>
          <div className="flex gap-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            <span>ENTIDADES_INDEXADAS: {media.length}</span>
            <span>ACTIVOS: {media.filter((m: any) => m.isActive).length}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setSelectedFilter(selectedFilter ? null : '30S')} className={`px-6 py-2 border hover:bg-surface-container-high transition-all text-on-surface font-label text-[10px] uppercase tracking-widest flex items-center gap-2 ${selectedFilter ? 'border-primary text-primary' : 'border-outline-variant/30'}`}>
            <Filter className="w-4 h-4" />
            Filtros {selectedFilter && `(${selectedFilter})`}
          </button>
          <button onClick={onNew} className="px-6 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all font-label text-[10px] uppercase tracking-widest flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Subir Archivo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3 space-y-8">
          <div onClick={onNew} className="p-6 border border-dashed border-primary/30 glass-panel flex flex-col items-center justify-center text-center group hover:border-primary/60 transition-colors cursor-pointer aspect-square rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all">
              <CloudUpload className="text-primary w-6 h-6" />
            </div>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Arrastra y Suelta Activos</p>
            <p className="font-body text-[9px] text-on-surface-variant/40">MP4, MOV | Máx 500MB</p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-label text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Rango de Duración</h4>
              <div className="grid grid-cols-2 gap-2">
                {['5S', '15S', '30S', '60S'].map((dur) => (
                  <button 
                    key={dur}
                    onClick={() => setSelectedFilter(selectedFilter === dur ? null : dur)}
                    className={`px-3 py-2 text-[10px] font-label text-left transition-colors ${selectedFilter === dur ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="col-span-9">
          <div className="glass-panel p-4 mb-8 flex justify-between items-center border-l-4 border-primary shadow-[0_4px_20px_rgba(0,0,0,0.4)] rounded-r-lg">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary w-4 h-4" fill="currentColor" />
                <span className="font-label text-[10px] uppercase tracking-widest font-bold">{filteredMedia.length} Elementos</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredMedia.length === 0 ? (
              <div className="col-span-4 glass-card p-12 text-center">
                <Images className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
                <p className="text-on-surface-variant">No hay contenido multimedia</p>
                <p className="text-[10px] text-on-surface-variant/60 mt-2">Sube archivos para comenzar</p>
              </div>
            ) : filteredMedia.map((item: any) => (
              <div key={item._id} className="group relative aspect-[9/16] glass-card overflow-hidden rounded-xl">
                {item.thumbnailUrl ? (
                  <img src={item.thumbnailUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                    <VideoOff className="text-primary/20 w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-3 left-3 flex gap-1">
                  {item.type && <span className="bg-primary px-1.5 py-0.5 text-[8px] font-label font-bold text-on-primary uppercase tracking-tighter">{item.type}</span>}
                  <span className="bg-surface-container-highest/80 backdrop-blur px-1.5 py-0.5 text-[8px] font-label text-on-surface uppercase tracking-tighter">{item.duration || 'N/A'}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-1 truncate">{item.name}</p>
                  <p className="font-body text-[8px] text-on-surface-variant/60">{item.size} {item.resolution && `| ${item.resolution}`}</p>
                </div>
                {item.isActive && (
                  <div className="absolute bottom-4 right-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button onClick={() => handleToggleActive(item._id)} className="p-1.5 bg-surface-container-highest/80 rounded-full hover:bg-primary/20">
                    {item.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleEdit(item)} className="p-1.5 bg-surface-container-highest/80 rounded-full hover:bg-primary/20">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-surface-container-highest/80 rounded-full hover:bg-error/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center border-t border-outline-variant/10 pt-8">
            <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">
              MOSTRANDO <span className="text-on-surface">1-{Math.min(filteredMedia.length, 24)}</span> DE <span className="text-on-surface">{filteredMedia.length}</span> ACTIVOS
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary font-label text-[10px] font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary font-label text-[10px]">2</button>
              <button className="w-10 h-10 flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary transition-all"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Media() {
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any>(null);

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMedia(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <MediaPage onEdit={(item) => { setEditingMedia(item); setShowForm(true); }} onNew={() => setShowForm(true)} />
      </div>
      {showForm && <MediaForm onClose={handleCloseForm} media={editingMedia} />}
    </div>
  );
}