'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Play, Pause, Users, Building2, Clock, Trash2, Edit, X, FileVideo, FileImage, Zap, ListVideo, Eye, FileSpreadsheet } from 'lucide-react';
import { View } from '@/types';
import { useDB } from '@/lib/hooks';

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
    </aside>
  );
}

export default function PlaylistsDashboard() {
  const totemsDB = useDB('totems');
  const clientsDB = useDB('clients');
  const mediaDB = useDB('media');
  const playlistDB = useDB('playlist_items');

  const [selectedTotem, setSelectedTotem] = useState<any>(null);

  const playlistByTotem = useMemo(() => {
    const grouped: Record<number, any[]> = {};
    playlistDB.data.forEach((item: any) => {
      if (!grouped[item.totem_id]) grouped[item.totem_id] = [];
      grouped[item.totem_id].push(item);
    });
    Object.keys(grouped).forEach((totemId: string) => {
      grouped[Number(totemId)].sort((a: any, b: any) => a.position - b.position);
    });
    return grouped;
  }, [playlistDB.data]);

  const stats = useMemo(() => {
    const totalItems = playlistDB.data.length;
    const activeItems = playlistDB.data.filter((p: any) => p.is_active).length;
    const totalDuration = playlistDB.data.reduce((acc: number, p: any) => acc + (p.duration_secs || 10), 0);
    const totemsWithPlaylist = Object.keys(playlistByTotem).length;
    return { totalItems, activeItems, totalDuration, totemsWithPlaylist };
  }, [playlistDB.data, playlistByTotem]);

  const toggleItemActive = async (itemId: number, currentStatus: boolean) => {
    await playlistDB.update(itemId, { is_active: !currentStatus });
  };

  const deleteItem = async (itemId: number) => {
    if (confirm('¿Eliminar este item de la playlist?')) {
      await playlistDB.remove(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <div className="space-y-8">
          <div>
            <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
            <h2 className="font-headline text-4xl font-light tracking-tight text-on-surface">
              Dashboard de <span className="font-extrabold text-primary">Playlists</span>
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <ListVideo className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Total Items</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalItems}</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Activos</span>
              </div>
              <p className="text-2xl font-bold text-primary">{stats.activeItems}</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Duración Total</span>
              </div>
              <p className="text-2xl font-bold">{Math.floor(stats.totalDuration / 60)}m {stats.totalDuration % 60}s</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Tótems Activos</span>
              </div>
              <p className="text-2xl font-bold">{stats.totemsWithPlaylist}</p>
            </div>
          </div>

          {/* Tótems con Playlists */}
          <div>
            <h3 className="font-bold text-lg mb-4">Playlists por Tótem</h3>
            <div className="space-y-4">
              {totemsDB.data.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <Monitor className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
                  <p className="text-on-surface-variant">No hay tótems registrados</p>
                  <Link href="/totems" className="text-primary text-sm hover:underline mt-2 inline-block">
                    Ir a Tótems →
                  </Link>
                </div>
              ) : totemsDB.data.map((totem: any) => {
                const items = playlistByTotem[totem.id] || [];
                const activeItems = items.filter((i: any) => i.is_active);
                return (
                  <div key={totem.id} className="glass-card rounded-xl overflow-hidden">
                    <div 
                      className="p-4 bg-surface-container-low flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors"
                      onClick={() => setSelectedTotem(selectedTotem?.id === totem.id ? null : totem)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Monitor className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">{totem.name}</h4>
                          <p className="text-xs text-on-surface-variant">{totem.location || 'Sin ubicación'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-bold">{items.length}</p>
                          <p className="text-[10px] text-on-surface-variant">items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{activeItems.length}</p>
                          <p className="text-[10px] text-on-surface-variant">activos</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{items.reduce((acc: number, i: any) => acc + (i.duration_secs || 10), 0)}s</p>
                          <p className="text-[10px] text-on-surface-variant">duración</p>
                        </div>
                        <Link 
                          href="/player" 
                          className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </Link>
                      </div>
                    </div>

                    {/* Playlist Items */}
                    {selectedTotem?.id === totem.id && (
                      <div className="border-t border-outline-variant/10">
                        {items.length === 0 ? (
                          <div className="p-4 text-center text-on-surface-variant text-sm">
                            Playlist vacía. Agrega clientes desde Tótems.
                          </div>
                        ) : (
                          <div className="divide-y divide-outline-variant/10">
                            {items.map((item: any, idx: number) => {
                              const client = clientsDB.data.find((c: any) => c.id === item.client_id);
                              const media = mediaDB.data.find((m: any) => m.id === item.media_id);
                              return (
                                <div key={item.id} className="p-3 flex items-center gap-3 hover:bg-surface-container-low">
                                  <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{media?.name || 'Media #' + item.media_id}</p>
                                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {client?.business_name || client?.name || 'Cliente #' + item.client_id}
                                    </p>
                                  </div>
                                  <span className="text-xs text-on-surface-variant">{item.duration_secs || 10}s</span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggleItemActive(item.id, item.is_active); }}
                                    className={`p-2 rounded-lg ${item.is_active ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
                                  >
                                    {item.is_active ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                                    className="p-2 rounded-lg hover:bg-error/20 text-error"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}