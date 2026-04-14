import { ArrowLeft, Search, Bell, Sliders, Moon, Sun } from 'lucide-react';

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

export default function TopBar({ title, onBack }: TopBarProps) {
  return (
    <header className="ml-64 flex justify-between items-center h-16 px-8 w-[calc(100%-16rem)] glass-panel border-b border-primary/10 fixed top-0 z-40">
      <div className="flex items-center space-x-6">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 text-primary transition-all active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em]">Atrás</span>
          </button>
        )}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="CONSULTAR RED..."
            className="bg-white/5 border-none focus:ring-0 text-xs label-font tracking-widest pl-10 pr-4 py-2 w-64 text-on-surface transition-all border-b-2 border-transparent focus:border-primary placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Sliders className="w-5 h-5" />
          </button>
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
            <button className="p-1.5 rounded-full bg-primary text-on-primary">
              <Moon className="w-3 h-3" />
            </button>
            <button className="p-1.5 rounded-full text-on-surface-variant">
              <Sun className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="h-6 w-[1px] bg-white/10"></div>
        <div className="flex items-center">
          <span className="text-lg font-black tracking-widest text-primary uppercase font-headline">{title}</span>
        </div>
      </div>
    </header>
  );
}
