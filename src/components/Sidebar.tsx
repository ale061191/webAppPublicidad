import { LayoutDashboard, Monitor, Images, Settings, Plus } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as View, label: 'Tablero', icon: LayoutDashboard },
    { id: 'totems' as View, label: 'Tótems', icon: Monitor },
    { id: 'media' as View, label: 'Multimedia', icon: Images },
    { id: 'settings' as View, label: 'Ajustes', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-6 glass-panel w-64 border-r border-primary/10 z-50">
      <div className="px-8 mb-12">
        <h1 className="text-xl font-bold tracking-tighter text-primary font-headline uppercase">KINETIC CMS</h1>
        <p className="font-label text-[10px] tracking-widest text-primary/50 uppercase mt-1">Red v2.4</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center py-3 pl-4 transition-all scale-95 duration-150 ease-in-out rounded-lg ${
                isActive 
                  ? 'text-primary font-bold border-l-2 border-primary bg-primary/5' 
                  : 'text-on-surface/60 font-medium hover:bg-white/5 hover:text-primary'
              }`}
            >
              <Icon className="mr-4 w-5 h-5" />
              <span className="font-label text-sm uppercase tracking-wider">{item.label}</span>
            </button>
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
