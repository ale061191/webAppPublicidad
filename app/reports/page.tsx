'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Users, Building2, FileVideo, FileImage, ListVideo, Download, FileSpreadsheet, BarChart3, PieChart, TrendingUp, TrendingDown, Calendar, Clock, Play, Pause, Eye, DollarSign, MonitorPlay, Activity, FileCheck } from 'lucide-react';
import { View } from '@/types';
import { useDB } from '@/lib/hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';

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
        <div className="flex items-center p-3 glass-card rounded-xl">
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

const COLORS = ['#75FF9E', '#FFD93D', '#FF6B6B', '#6BCBFF', '#C9B1FF', '#FF9ED2'];

function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}

function exportToExcelJS(data: any[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.xls`;
  link.click();
}

function StatCard({ title, value, subtitle, icon: Icon, trend, color }: { title: string; value: string | number; subtitle?: string; icon: any; trend?: 'up' | 'down'; color?: 'green' | 'yellow' | 'red' | 'blue' }) {
  const colorClasses = {
    green: 'stat-card-green text-primary',
    yellow: 'stat-card-yellow text-[#FFD93D]',
    red: 'stat-card-red text-error',
    blue: 'stat-card-blue text-[#6BCBFF]',
  };
  const iconBg = {
    green: 'bg-primary/20 text-primary',
    yellow: 'bg-[#FFD93D]/20 text-[#FFD93D]',
    red: 'bg-error/20 text-error',
    blue: 'bg-[#6BCBFF]/20 text-[#6BCBFF]',
  };
  const iconGlow = {
    green: 'glow-green',
    yellow: 'glow-yellow',
    red: 'glow-red',
    blue: '',
  };
  
  return (
    <div className={`glass-stat p-6 ${color ? colorClasses[color] : 'stat-card-green'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-bold font-headline">{value}</p>
          {subtitle && <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBg[color || 'green']} ${iconGlow[color || 'green']} transition-all`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const clientsDB = useDB('clients');
  const totemsDB = useDB('totems');
  const mediaDB = useDB('media');
  const playlistDB = useDB('playlist_items');
  
  const [dateRange, setDateRange] = useState('30');
  
const totalClients = clientsDB.data?.length || 0;
  const activeClients = clientsDB.data?.filter((c: any) => c.is_active).length || 0;
  const totalTotems = totemsDB.data?.length || 0;
  const connectedTotems = totemsDB.data?.filter((t: any) => t.is_display_connected).length || 0;
  const totalMedia = mediaDB.data?.length || 0;
  const videosMedia = mediaDB.data?.filter((m: any) => m.type === 'video').length || 0;
  const imagesMedia = mediaDB.data?.filter((m: any) => m.type === 'image').length || 0;
  const totalPlaylistItems = playlistDB.data?.length || 0;
  const activePlaylistItems = playlistDB.data?.filter((p: any) => p.is_active).length || 0;
  
  const clientsByStatus = useMemo(() => {
    return [
      { name: 'Activos', value: activeClients },
      { name: 'Inactivos', value: totalClients - activeClients },
    ];
  }, [activeClients, totalClients]);

  const totemsByStatus = useMemo(() => {
    return [
      { name: 'Conectados', value: connectedTotems },
      { name: 'Desconectados', value: totalTotems - connectedTotems },
    ];
  }, [connectedTotems, totalTotems]);
  
  const mediaByType = useMemo(() => {
    return [
      { name: 'Videos', value: videosMedia },
      { name: 'Imágenes', value: imagesMedia },
    ];
  }, [videosMedia, imagesMedia]);
  
  const clientsWithMedia = useMemo(() => {
    if (!clientsDB.data || !mediaDB.data) return [];
    return clientsDB.data.map((client: any) => {
      const assignedMedia = mediaDB.data.filter((m: any) => m.client_id === client.id);
      return {
        ID: client.id,
        Nombre: client.name,
        'Razón Social': client.business_name || '',
        Email: client.email || '',
        Teléfono: client.phone || '',
        Dirección: client.address || '',
        Estado: client.is_active ? 'Activo' : 'Inactivo',
        'Multimedia Asignada': assignedMedia.length,
        'Videos Asignados': assignedMedia.filter((m: any) => m.type === 'video').length,
        'Imágenes Asignadas': assignedMedia.filter((m: any) => m.type === 'image').length,
      };
    });
  }, [clientsDB.data, mediaDB.data]);
  
  const totemsWithPlaylist = useMemo(() => {
    if (!totemsDB.data || !playlistDB.data) return [];
    return totemsDB.data.map((totem: any) => {
      const items = playlistDB.data.filter((p: any) => p.totem_id === totem.id);
      return {
        ID: totem.id,
        Nombre: totem.name,
        Serial: totem.serial || '',
        Ubicación: totem.location || '',
        Estado: totem.is_display_connected ? 'Conectado' : 'Desconectado',
        'Items en Playlist': items.length,
        'Items Activos': items.filter((p: any) => p.is_active).length,
        'Duración Total (s)': items.reduce((acc, p) => acc + (p.duration_secs || 10), 0),
      };
    });
  }, [totemsDB.data, playlistDB.data]);
  
  const mediaList = useMemo(() => {
    if (!mediaDB.data || !clientsDB.data) return [];
    return mediaDB.data.map((media: any) => {
      const client = clientsDB.data.find((c: any) => c.id === media.client_id);
      return {
        ID: media.id,
        Nombre: media.name,
        Tipo: media.type === 'video' ? 'Video' : 'Imagen',
        URL: media.url,
        Cliente: client?.business_name || client?.name || 'Sin asignar',
        Estado: media.is_active ? 'Activo' : 'Inactivo',
        Tamaño: media.size ? `${(media.size / 1024 / 1024).toFixed(2)} MB` : 'N/A',
        'Fecha Creación': media.created_at ? new Date(media.created_at).toLocaleDateString() : 'N/A',
      };
    });
  }, [mediaDB.data, clientsDB.data]);
  
  const playlistItemsList = useMemo(() => {
    if (!playlistDB.data || !mediaDB.data || !totemsDB.data) return [];
    return playlistDB.data.map((item: any) => {
      const media = mediaDB.data.find((m: any) => m.id === item.media_id);
      const totem = totemsDB.data.find((t: any) => t.id === item.totem_id);
      return {
        ID: item.id,
        'Tótem': totem?.name || `ID ${item.totem_id}`,
        'ID Tótem': item.totem_id,
        Multimedia: media?.name || `ID ${item.media_id}`,
        'ID Multimedia': item.media_id,
        Tipo: media?.type === 'video' ? 'Video' : 'Imagen',
        Posición: item.position,
        'Duración (s)': item.duration_secs || 10,
        Estado: item.is_active ? 'Activo' : 'Inactivo',
      };
    });
  }, [playlistDB.data, mediaDB.data, totemsDB.data]);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Análisis del Sistema</p>
              <h1 className="font-headline text-4xl font-light text-on-surface tracking-tight">Reportes <span className="font-extrabold text-primary">Globales</span></h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const allData = [
                    ...clientsWithMedia,
                    ...totemsWithPlaylist,
                    ...mediaList,
                    ...playlistItemsList
                  ];
                  if (allData.length > 0) exportToCSV(allData, 'reporte_global');
                }}
                className="px-4 py-2 bg-primary text-black font-bold text-sm rounded-lg hover:brightness-110 flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                Exportar Todo
              </button>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-surface-container-high border border-outline-variant rounded-lg text-sm"
              >
                <option value="7">Últimos 7 días</option>
                <option value="30">Últimos 30 días</option>
                <option value="90">Últimos 90 días</option>
                <option value="365">Último año</option>
              </select>
            </div>
          </header>
          
          <div className="grid grid-cols-4 gap-6">
            <StatCard title="Total Clientes" value={totalClients} subtitle={`${activeClients} activos`} icon={Users} color="green" />
            <StatCard title="Total Tótems" value={totalTotems} subtitle={`${connectedTotems} conectados`} icon={Monitor} color="blue" />
            <StatCard title="Multimedia" value={totalMedia} subtitle={`${videosMedia} videos, ${imagesMedia} imágenes`} icon={FileVideo} color="blue" />
            <StatCard title="Playlist Items" value={totalPlaylistItems} subtitle={`${activePlaylistItems} activos`} icon={ListVideo} color="yellow" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Clientes por Estado
                </h3>
                <button 
                  onClick={() => exportToCSV(clientsWithMedia, 'reporte_clientes')}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-primary"
                  title="Descargar CSV"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={clientsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {clientsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="glass-panel p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Tótems por Estado
                </h3>
                <button 
                  onClick={() => exportToCSV(totemsWithPlaylist, 'reporte_totems')}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-primary"
                  title="Descargar CSV"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={totemsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {totemsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-panel p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Multimedia por Tipo
              </h3>
              <button 
                onClick={() => exportToCSV(mediaList, 'reporte_multimedia')}
                className="p-2 hover:bg-surface-container-high rounded-lg text-primary"
                title="Descargar CSV"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mediaByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Bar dataKey="value" fill="#75FF9E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Detalle de Clientes
                </h3>
                <button 
                  onClick={() => exportToCSV(clientsWithMedia, 'detalle_clientes')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black text-xs font-bold rounded hover:brightness-110"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Nombre</th>
                      <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Estado</th>
                      <th className="text-right py-2 px-3 text-xs text-on-surface-variant font-medium">Media</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsWithMedia.slice(0, 5).map((client: any) => (
                      <tr key={client.ID} className="border-b border-outline-variant/10">
                        <td className="py-2 px-3">{client.Nombre}</td>
                        <td className="py-2 px-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${client.Estado === 'Activo' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                            {client.Estado}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right text-primary font-bold">{client['Multimedia Asignada']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="glass-panel p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Detalle de Tótems
                </h3>
                <button 
                  onClick={() => exportToCSV(totemsWithPlaylist, 'detalle_totems')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black text-xs font-bold rounded hover:brightness-110"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Nombre</th>
                      <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Estado</th>
                      <th className="text-right py-2 px-3 text-xs text-on-surface-variant font-medium">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totemsWithPlaylist.slice(0, 5).map((totem: any) => (
                      <tr key={totem.ID} className="border-b border-outline-variant/10">
                        <td className="py-2 px-3">{totem.Nombre}</td>
                        <td className="py-2 px-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${totem.Estado === 'Online' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                            {totem.Estado}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right text-primary font-bold">{totem['Items en Playlist']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-lg font-bold flex items-center gap-2">
                <ListVideo className="w-5 h-5 text-primary" />
                Playlist Completa
              </h3>
              <button 
                onClick={() => exportToCSV(playlistItemsList, 'playlist_completa')}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black text-xs font-bold rounded hover:brightness-110"
              >
                <FileSpreadsheet className="w-3 h-3" />
                Exportar Todo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">ID</th>
                    <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Tótem</th>
                    <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Multimedia</th>
                    <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Tipo</th>
                    <th className="text-right py-2 px-3 text-xs text-on-surface-variant font-medium">Posición</th>
                    <th className="text-right py-2 px-3 text-xs text-on-surface-variant font-medium">Duración</th>
                    <th className="text-left py-2 px-3 text-xs text-on-surface-variant font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {playlistItemsList.slice(0, 10).map((item: any) => (
                    <tr key={item.ID} className="border-b border-outline-variant/10">
                      <td className="py-2 px-3">{item.ID}</td>
                      <td className="py-2 px-3">{item.Tótem}</td>
                      <td className="py-2 px-3 max-w-[200px] truncate">{item.Multimedia}</td>
                      <td className="py-2 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded ${item.Tipo === 'Video' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                          {item.Tipo}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">{item.Posición}</td>
                      <td className="py-2 px-3 text-right">{item['Duración (s)']}s</td>
                      <td className="py-2 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded ${item.Estado === 'Activo' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                          {item.Estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {playlistItemsList.length > 10 && (
              <p className="text-xs text-on-surface-variant mt-4 text-center">
                Mostrando 10 de {playlistItemsList.length} items
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}