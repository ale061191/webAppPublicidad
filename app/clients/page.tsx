'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Users, Building2, Mail, Phone, MapPin, Trash2, Edit, X, FileVideo, FileImage } from 'lucide-react';
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
    </aside>
  );
}

function ClientForm({ onClose, client, onSave }: { onClose: () => void; client?: any; onSave: (id: number, data: any) => void }) {
  const [form, setForm] = useState({
    name: client?.name || '',
    business_name: client?.business_name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (client?.id) {
      await onSave(client.id, form);
    } else {
      onSave(0, form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-panel p-8 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold">{client ? 'Editar' : 'Nuevo'} Cliente</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre de Contacto</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Juan Pérez" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Nombre de Empresa</label>
            <input type="text" required value={form.business_name} onChange={(e) => setForm({...form, business_name: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Empresa XYZ" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="juan@empresa.com" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Teléfono</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="+52 555 123 4567" />
          </div>
          
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Dirección</label>
            <input type="text" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full bg-surface-container-high border-none text-sm py-2 px-3 focus:ring-1 focus:ring-primary outline-none" placeholder="Ciudad, Estado" />
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

export default function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  const clientsDB = useDB('clients');
  const mediaDB = useDB('media');

  const handleSave = async (id: number, data: any) => {
    if (id) {
      await clientsDB.update(id, data);
    } else {
      await clientsDB.create({ ...data, is_active: true });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este cliente?')) {
      await clientsDB.remove(id);
    }
  };

  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    setShowMediaSelector(false);
  };

  const handleCloseSidebar = () => {
    setSelectedClient(null);
    setShowMediaSelector(false);
  };

  const handleAssignMedia = async (mediaId: number) => {
    if (selectedClient) {
      console.log('Assigning media', mediaId, 'to client', selectedClient.id);
      await mediaDB.update(mediaId, { client_id: selectedClient.id });
      setShowMediaSelector(false);
      console.log('Media assigned successfully');
    }
  };

  const assignedMedia = useMemo(() => {
    if (!selectedClient) return [];
    return mediaDB.data.filter((m: any) => m.client_id === selectedClient.id);
  }, [selectedClient, mediaDB.data]);

  const availableMedia = useMemo(() => {
    if (!selectedClient) return [];
    return mediaDB.data.filter((m: any) => !m.client_id || m.client_id === selectedClient.id);
  }, [selectedClient, mediaDB.data]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
              <h2 className="font-headline text-4xl font-light text-on-surface tracking-tight">Gestión <span className="font-extrabold text-primary">Clientes</span></h2>
            </div>
            <button onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-primary/10 border border-primary/30 font-label text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(117,255,158,0.1)]">
              <Plus className="w-4 h-4" /> Nuevo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientsDB.data.length === 0 ? (
              <div className="col-span-3 glass-card p-12 text-center">
                <Users className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
                <p className="text-on-surface-variant">No hay clientes registrados</p>
                <p className="text-[10px] text-on-surface-variant/60 mt-2">Agrega un cliente para comenzar</p>
              </div>
            ) : clientsDB.data.map((client: any) => (
              <div 
                key={client.id} 
                onClick={() => handleSelectClient(client)}
                className="glass-card p-6 rounded-xl hover:bg-surface-container-low/40 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); setEditingClient(client); setShowForm(true); }} className="p-2 hover:bg-surface-container-highest text-on-surface-variant hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }} className="p-2 hover:bg-surface-container-highest text-error"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <h3 className="font-headline font-bold text-lg mb-1">{client.business_name}</h3>
                <p className="font-label text-xs text-on-surface-variant mb-4">{client.name}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-on-surface-variant"><Mail className="w-4 h-4" /><span>{client.email}</span></div>
                  {client.phone && <div className="flex items-center gap-2 text-on-surface-variant"><Phone className="w-4 h-4" /><span>{client.phone}</span></div>}
                  {client.address && <div className="flex items-center gap-2 text-on-surface-variant"><MapPin className="w-4 h-4" /><span>{client.address}</span></div>}
                </div>
                
                <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                  <span className={`text-[10px] px-2 py-1 rounded ${client.is_active ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                    {client.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && <ClientForm onClose={() => { setShowForm(false); setEditingClient(null); }} client={editingClient} onSave={handleSave} />}
      
      {selectedClient && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={handleCloseSidebar} />
          <div className="fixed right-0 top-0 h-full w-96 bg-surface-container-low border-l border-outline-variant/10 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/10">
              <div>
                <h3 className="font-bold">{selectedClient.business_name || selectedClient.name}</h3>
                <p className="text-xs text-on-surface-variant">{selectedClient.email}</p>
              </div>
              <button onClick={handleCloseSidebar} className="p-2 hover:bg-surface-container-high rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Images className="w-4 h-4 text-primary" />
                    Multimedia Asignada
                  </h4>
                  <button 
                    onClick={() => setShowMediaSelector(true)}
                    className="text-xs text-primary hover:underline"
                  >
                    + Agregar
                  </button>
                </div>
                
                {assignedMedia.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {assignedMedia.map((media: any) => (
                      <div key={media.id} className="aspect-video bg-surface-container-low rounded flex items-center justify-center overflow-hidden">
                        {media.type === 'video' ? (
                          <div className="text-center p-2">
                            <FileVideo className="w-6 h-6 text-primary mx-auto" />
                            <span className="text-[8px] truncate block w-full">{media.name}</span>
                          </div>
                        ) : (
                          <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant">Sin multimedia asignada</p>
                )}
              </div>

              <Link href="/player" className="block w-full py-3 bg-primary text-black text-center font-bold rounded-lg hover:brightness-110">
                VER EN PANTALLA
              </Link>
            </div>
          </div>
        </>
      )}

      {showMediaSelector && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
          <div className="glass-panel w-full max-w-md rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Agregar Multimedia</h3>
              <button onClick={() => setShowMediaSelector(false)} className="p-2 hover:bg-surface-container-high rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableMedia.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No hay multimedia disponible</p>
              ) : (
                availableMedia.map((media: any) => (
                  <button
                    key={media.id}
                    onClick={() => handleAssignMedia(media.id)}
                    className="w-full p-3 bg-surface-container-low hover:bg-surface-container-high rounded text-left flex items-center gap-3"
                  >
                    {media.type === 'video' ? <FileVideo className="w-5 h-5 text-primary" /> : <FileImage className="w-5 h-5 text-primary" />}
                    <div>
                      <p className="text-sm font-medium">{media.name}</p>
                      <p className="text-xs text-on-surface-variant">{media.size} • {media.duration}</p>
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