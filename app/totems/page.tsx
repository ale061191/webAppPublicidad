'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Activity, RefreshCw, Building2, ShoppingBag, Store, Radio, MoreVertical, AlertTriangle, CheckCircle, X, Power, Trash2, Edit, Eye, Users, ArrowLeft, Play, PlusCircle, FileVideo, FileImage, GripVertical, Clock, Zap, ListVideo, Copy, ExternalLink, FileSpreadsheet, Search } from 'lucide-react';
import { View } from '../../types';
import { useDB } from '../../lib/hooks';

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
    if (savedProfile) setProfile(JSON.parse(savedProfile));
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
              {item.id === 'playlist' && <ListVideo className="mr-4 w-5 h-5" />}
              {item.id === 'reports' && <FileSpreadsheet className="mr-4 w-5 h-5" />}
              {item.id === 'settings' && <Settings className="mr-4 w-5 h-5" />}
              <span className="font-label text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
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
    status: totem?.status || 'online',
    latency: totem?.latency || '0ms',
    lastSync: totem?.lastSync || new Date().toLocaleTimeString(),
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
          <h2 className="font-headline text-xl font-bold">{totem ? 'Editar' : 'Nuevo'} Tótem</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre del Tótem</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Tótem Centro Comercial" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Número de Serie</label>
            <input type="text" required value={form.serial} onChange={(e) => setForm({...form, serial: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="SN-2024-001" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Ubicación</label>
            <input type="text" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Caracas, Venezuela" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary text-on-primary font-bold">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TotemsList({ onEdit, onNew, onSelect }: { onEdit?: (totem: any) => void; onNew?: () => void; onSelect?: (totem: any) => void }) {
  const totemsDB = useDB('totems');
  const totems = totemsDB.data;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      totemsDB.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredTotems = useMemo(() => {
    if (!searchQuery.trim()) return totems || [];
    const query = searchQuery.toLowerCase();
    return (totems || []).filter((totem: any) => 
      totem.name?.toLowerCase().includes(query) ||
      totem.serial?.toLowerCase().includes(query) ||
      totem.location?.toLowerCase().includes(query)
    );
  }, [totems, searchQuery]);

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Buscar tótem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface-container-high border border-outline-variant rounded-lg text-sm w-64"
            />
          </div>
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
                <span className="font-headline font-semibold text-sm">{totems.length} Tótems</span>
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
          {totems.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Monitor className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
              <p className="text-on-surface-variant">No hay tótems registrados</p>
              <p className="text-[10px] text-on-surface-variant/60 mt-2">Agrega un nuevo tótem para comenzar</p>
            </div>
          ) : filteredTotems.map((totem: any) => (
            <div 
              key={totem.id} 
              onClick={() => onSelect?.(totem)}
              className={`grid grid-cols-12 items-center glass-card hover:bg-surface-container-low/40 transition-all px-6 py-6 border border-outline-variant/5 gap-4 cursor-pointer ${totem.status === 'offline' ? 'bg-error/5 border-error/10' : ''}`}>
              <div className="col-span-1">
                <input type="checkbox" onClick={(e) => e.stopPropagation()} className="form-checkbox bg-transparent border-outline-variant text-primary focus:ring-0 rounded-none w-5 h-5" />
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
                  <span className="text-xs font-body text-on-surface/80">{totem.location || 'Sin ubicación'}</span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Estado</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-label uppercase ${totem.status === 'offline' ? 'text-error font-bold' : 'text-primary'}`}>
                      {totem.status === 'online' ? 'Activo' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Playlist</span>
                  <span className="text-xs text-primary">Configurar →</span>
                </div>
              </div>
              <div className="col-span-1 flex justify-end gap-2">
                <button onClick={(e) => { e.stopPropagation(); onEdit?.(totem); }} className="p-2 hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-primary">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(totem.id); }} className="p-2 hover:bg-surface-container-highest transition-colors text-error">
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
  const [selectedTotem, setSelectedTotem] = useState<any>(null);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const totemsDB = useDB('totems');
  const clientsDB = useDB('clients');
  const mediaDB = useDB('media');
  const playlistDB = useDB('playlist_items');

  useEffect(() => {
    if (!selectedTotem) return;
    const interval = setInterval(() => {
      totemsDB.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedTotem]);

  useEffect(() => {
    if (!selectedTotem || !totemsDB.data.length) return;
    const updatedTotem = totemsDB.data.find((t: any) => t.id === selectedTotem.id);
    if (updatedTotem) setSelectedTotem(updatedTotem);
  }, [totemsDB.data, selectedTotem?.id]);

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

  const handleSelectTotem = (totem: any) => {
    setSelectedTotem(totem);
    setShowClientSelector(false);
    setShowMediaSelector(false);
    setSelectedClientId(null);
  };

  const handleCloseSidebar = () => {
    setSelectedTotem(null);
    setShowClientSelector(false);
    setShowMediaSelector(false);
    setSelectedClientId(null);
  };

  const handleCloseClientSelector = () => {
    setShowClientSelector(false);
    setSelectedClientId(null);
  };

  const handleCloseMediaSelector = () => {
    setShowMediaSelector(false);
  };

  const handleAddClientToPlaylist = async (clientId: number) => {
    if (!selectedTotem) return;
    const clientMedia = mediaDB.data.filter((m: any) => m.client_id === clientId);
    for (let i = 0; i < clientMedia.length; i++) {
      const media = clientMedia[i];
      await playlistDB.create({
        totem_id: selectedTotem.id,
        client_id: clientId,
        media_id: media.id,
        position: i,
        duration_secs: 10,
        is_active: true,
      });
    }
    setShowClientSelector(false);
    setSelectedClientId(null);
  };

  const handleAddMediaToPlaylist = async (mediaId: number) => {
    if (!selectedTotem || !selectedClientId) return;
    const currentItems = playlistDB.data.filter((p: any) => p.totem_id === selectedTotem.id);
    await playlistDB.create({
      totem_id: selectedTotem.id,
      client_id: selectedClientId,
      media_id: mediaId,
      position: currentItems.length,
      duration_secs: 10,
      is_active: true,
    });
    setShowMediaSelector(false);
  };

  const handleRemovePlaylistItem = async (itemId: number) => {
    if (confirm('¿Eliminar este item de la playlist?')) {
      await playlistDB.remove(itemId);
    }
  };

  const playlistItems = useMemo(() => {
    if (!selectedTotem) return [];
    return playlistDB.data
      .filter((p: any) => p.totem_id === selectedTotem.id && p.is_active)
      .sort((a, b) => a.position - b.position);
  }, [selectedTotem, playlistDB.data]);

  const playlistItemsWithDetails = useMemo(() => {
    return playlistItems.map((item: any) => {
      const client = clientsDB.data.find((c: any) => c.id === item.client_id);
      const media = mediaDB.data.find((m: any) => m.id === item.media_id);
      return { ...item, clientName: client?.business_name || client?.name, mediaName: media?.name, mediaUrl: media?.url, mediaType: media?.type };
    });
  }, [playlistItems, clientsDB.data, mediaDB.data]);

  const availableClients = useMemo(() => {
    const clientsInPlaylist = playlistItems.map((p: any) => p.client_id);
    return clientsDB.data.filter((c: any) => !clientsInPlaylist.includes(c.id));
  }, [playlistItems, clientsDB.data]);

  const availableMediaForClient = useMemo(() => {
    if (!selectedClientId) return [];
    return mediaDB.data.filter((m: any) => m.client_id === selectedClientId);
  }, [selectedClientId, mediaDB.data]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <TotemsList 
          onEdit={(totem) => { setEditingTotem(totem); setShowForm(true); }} 
          onNew={() => setShowForm(true)} 
          onSelect={handleSelectTotem}
        />
      </div>
      {showForm && <TotemForm onClose={handleCloseForm} totem={editingTotem} onSave={handleSave} />}
      
      {selectedTotem && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={handleCloseSidebar} />
          <div className="fixed right-0 top-0 h-full w-[400px] bg-surface-container-low border-l border-outline-variant/10 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/10">
              <div>
                <h3 className="font-bold">{selectedTotem.name}</h3>
                <p className="text-xs text-on-surface-variant">{selectedTotem.serial}</p>
              </div>
              <button onClick={handleCloseSidebar} className="p-2 hover:bg-surface-container-high rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="glass-card p-4 border-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Estado de Conexión
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${selectedTotem.is_display_connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="text-sm font-bold">{selectedTotem.is_display_connected ? 'Conectado' : 'Desconectado'}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {selectedTotem.last_heartbeat 
                        ? `Último latido: ${new Date(selectedTotem.last_heartbeat).toLocaleTimeString()}`
                        : 'Sin conexión aún'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Playlist del Tótem
                  </h4>
                  <button 
                    onClick={() => setShowClientSelector(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3 h-3" /> Agregar Cliente
                  </button>
                </div>
                
                {playlistItemsWithDetails.length > 0 ? (
                  <div className="space-y-2">
                    {playlistItemsWithDetails.map((item: any, index: number) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 bg-surface-container-low rounded">
                        <GripVertical className="w-4 h-4 text-on-surface-variant/40" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.mediaName}</p>
                          <p className="text-[9px] text-on-surface-variant">{item.clientName} • {item.duration_secs}s</p>
                        </div>
                        {item.mediaType === 'video' ? (
                          <FileVideo className="w-4 h-4 text-primary" />
                        ) : (
                          <FileImage className="w-4 h-4 text-primary" />
                        )}
                        <button 
                          onClick={() => handleRemovePlaylistItem(item.id)}
                          className="p-1 hover:bg-error/20 rounded"
                        >
                          <X className="w-3 h-3 text-error" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant">Playlist vacía. Agrega clientes para comenzar.</p>
                )}
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Tiempo Total
                  </h4>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {playlistItemsWithDetails.reduce((acc, item) => acc + (item.duration_secs || 10), 0)}s
                </p>
                <p className="text-[10px] text-on-surface-variant">{playlistItemsWithDetails.length} items</p>
              </div>

              <div className="glass-card p-4 border-2 border-primary/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Play className="w-4 h-4 text-primary" />
                    Enlace Display
                  </h4>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-2">ID del Tótem: <span className="text-primary font-bold">{selectedTotem.id}</span></p>
                <div className="bg-black/30 p-2 rounded font-mono text-xs text-primary break-all flex items-center justify-between">
                  <span>/display/{selectedTotem.id}</span>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/display/${selectedTotem.id}`;
                      navigator.clipboard.writeText(url);
                      alert('Enlace copiado al portapapeles');
                    }}
                    className="ml-2 p-1 hover:bg-primary/20 rounded transition-colors"
                    title="Copiar enlace"
                  >
                    <Copy className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <p className="text-[9px] text-on-surface-variant mt-2">Accede desde el tótem físico</p>
              </div>

              <Link 
                href="/player"
                className="block w-full py-3 bg-primary text-black text-center font-bold rounded-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                VER EN PANTALLA
              </Link>
            </div>
          </div>
        </>
      )}

      {showClientSelector && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
          <div className="glass-panel w-full max-w-md rounded-xl p-6 relative z-[71]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Agregar Cliente a Playlist</h3>
              <button onClick={handleCloseClientSelector} className="p-2 hover:bg-surface-container-high rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant mb-4">
              Se agregarán automáticamente todos los videos del cliente seleccionado.
            </p>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableClients.length === 0 ? (
                <p className="text-sm text-on-surface-variant">Todos los clientes ya están en la playlist</p>
              ) : (
                availableClients.map((client: any) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => handleAddClientToPlaylist(client.id)}
                    className="w-full p-3 bg-surface-container-low hover:bg-surface-container-high rounded text-left flex items-center gap-3 cursor-pointer"
                  >
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{client.business_name || client.name}</p>
                      <p className="text-xs text-on-surface-variant">{mediaDB.data.filter((m: any) => m.client_id === client.id).length} videos</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}