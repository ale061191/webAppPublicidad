import { Filter, RefreshCw, Building2, ShoppingBag, Store, Radio, Monitor, MoreVertical, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Totem } from '../types';

export default function TotemsList() {
  const totems: Totem[] = [
    { id: '1', name: 'WF-A1-PRINCIPAL', serial: '992-004-LX', location: 'Westfield • Nivel 1', status: 'online', lastSync: '12ms', previewUrl: 'https://picsum.photos/seed/t1/200/300' },
    { id: '2', name: 'WF-B4-NORTE', serial: '992-018-LX', location: 'Westfield • Nivel 2', status: 'online', lastSync: '18ms', previewUrl: 'https://picsum.photos/seed/t2/200/300' },
    { id: '3', name: 'WF-C2-ATRIUM', serial: '992-102-LX', location: 'Westfield • Nivel 1', status: 'offline', lastSync: '42m', previewUrl: 'https://picsum.photos/seed/t3/200/300' },
    { id: '4', name: 'ATR-M1-SUR', serial: '994-551-LX', location: 'Atrium • Nivel 1', status: 'online', lastSync: '4ms', previewUrl: 'https://picsum.photos/seed/t4/200/300' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-[2px] w-8 bg-primary"></span>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Sistema de Gestión de Unidades</span>
          </div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Red de Tótems</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 glass-panel border border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros Avanzados
          </button>
          <button className="px-6 py-2.5 bg-primary/10 border border-primary/30 font-label text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(117,255,158,0.1)]">
            <RefreshCw className="w-4 h-4" />
            Sincronizar Contenido
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
                <div className="ml-4 pl-4 border-l border-outline-variant/20 space-y-4">
                  <div className="flex items-center gap-3 text-on-surface/60 group cursor-pointer hover:text-primary transition-colors">
                    <Store className="w-4 h-4" />
                    <span className="font-body text-xs">Tienda Flagship A1</span>
                  </div>
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
              <h4 className="text-3xl font-headline font-bold text-on-surface mb-4">99.8%</h4>
              <div className="flex gap-4">
                <div>
                  <p className="text-[9px] font-label uppercase text-on-surface-variant">Activos</p>
                  <p className="text-sm font-headline text-primary">124 Unidades</p>
                </div>
                <div className="w-[1px] bg-outline-variant/20 h-full"></div>
                <div>
                  <p className="text-[9px] font-label uppercase text-on-surface-variant">Alertas</p>
                  <p className="text-sm font-headline text-error">2 Unidades</p>
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
                <button className="text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/50">En Línea (122)</button>
                <button className="text-on-surface-variant/50 font-label text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">Desconectados (2)</button>
              </div>
            </div>
            <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Mostrando 24 de 124 resultados</div>
          </div>

          {totems.map((totem) => (
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
                    {totem.status === 'online' && <span className="text-[9px] font-label text-on-surface-variant/40">{totem.lastSync}</span>}
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-2">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Vista Previa</span>
                  <div className={`flex gap-1 h-8 ${totem.status === 'offline' ? 'opacity-40 grayscale' : ''}`}>
                    <img src={totem.previewUrl} alt="Preview" className="h-full w-12 object-cover border border-primary/20" referrerPolicy="no-referrer" />
                    <div className="h-full w-8 bg-surface-container-high flex items-center justify-center text-[10px] font-label text-on-surface-variant">+4</div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className={`p-2 hover:bg-surface-container-highest transition-colors ${totem.status === 'offline' ? 'text-error' : 'text-on-surface-variant hover:text-primary'}`}>
                  {totem.status === 'offline' ? <AlertTriangle className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-panel border border-primary/20 px-8 py-4 flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
            <CheckCircle className="text-primary w-5 h-5" fill="currentColor" />
          </div>
          <div className="font-label">
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Selección Activa</p>
            <p className="text-xs text-on-surface/80">32 Unidades seleccionadas</p>
          </div>
        </div>
        <div className="w-[1px] bg-outline-variant/20 h-8"></div>
        <button className="bg-primary text-on-primary px-6 py-2 font-label text-[11px] uppercase tracking-widest font-bold hover:brightness-110 transition-all">
          Ejecutar Sincronización
        </button>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
