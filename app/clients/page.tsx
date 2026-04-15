'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { LayoutDashboard, Monitor, Images, Settings, Plus, Users, Building2, Mail, Phone, MapPin, Trash2, Edit, Eye, X } from 'lucide-react';
import { View } from '../../types';

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

      <div className="px-6 mt-auto">
        <div className="flex items-center mt-8 p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
          <div className="ml-3 overflow-hidden">
            <p className="text-xs font-bold truncate">Admin</p>
            <p className="text-[10px] text-on-surface-variant font-mono">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ClientForm({ onClose, client }: { onClose: () => void; client?: any }) {
  const createClient = useMutation(api.mutations.createClient);
  const updateClient = useMutation(api.mutations.updateClient);
  const [form, setForm] = useState({
    name: client?.name || '',
    businessName: client?.businessName || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (client?._id) {
      await updateClient({ id: client._id, ...form });
    } else {
      await createClient(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-panel p-8 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold">Nuevo Cliente</h2>
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
            <input type="text" required value={form.businessName} onChange={(e) => setForm({...form, businessName: e.target.value})}
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

function ClientsList() {
  const clients = useQuery(api.queries.getClients) || [];
  const deleteClient = useMutation(api.mutations.deleteClient);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este cliente?')) {
      await deleteClient({ id: id as any });
    }
  };

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-[2px] w-8 bg-primary"></span>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Gestión</span>
          </div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Clientes</h2>
        </div>
        <button onClick={() => setShowForm(true)}
          className="px-6 py-2.5 bg-primary/10 border border-primary/30 font-label text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(117,255,158,0.1)]">
          <Plus className="w-4 h-4" /> Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length === 0 ? (
          <div className="col-span-3 glass-card p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" />
            <p className="text-on-surface-variant">No hay clientes registrados</p>
            <p className="text-[10px] text-on-surface-variant/60 mt-2">Agrega un cliente para comenzar</p>
          </div>
        ) : clients.map((client: any) => (
          <div key={client._id} className="glass-card p-6 rounded-xl hover:bg-surface-container-low/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(client)} className="p-2 hover:bg-surface-container-highest text-on-surface-variant hover:text-primary"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(client._id)} className="p-2 hover:bg-surface-container-highest text-error"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <h3 className="font-headline font-bold text-lg mb-1">{client.businessName}</h3>
            <p className="font-label text-xs text-on-surface-variant mb-4">{client.name}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-on-surface-variant"><Mail className="w-4 h-4" /><span>{client.email}</span></div>
              {client.phone && <div className="flex items-center gap-2 text-on-surface-variant"><Phone className="w-4 h-4" /><span>{client.phone}</span></div>}
              {client.address && <div className="flex items-center gap-2 text-on-surface-variant"><MapPin className="w-4 h-4" /><span>{client.address}</span></div>}
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className={`text-[10px] px-2 py-1 rounded ${client.isActive ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                {client.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showForm && <ClientForm onClose={handleCloseForm} client={editingClient} />}
    </div>
  );
}

export default function Clients() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 pt-16 px-8">
        <ClientsList />
      </div>
    </div>
  );
}