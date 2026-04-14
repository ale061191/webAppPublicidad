import { Router, ShieldCheck, PlayCircle, HardDrive, Map as MapIcon, History, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const kpis = [
    { label: 'Tótems Activos', value: '1.248', change: '+12.4%', icon: Router, progress: 85 },
    { label: 'Salud de la Red', value: '99.8%', change: 'Óptimo', icon: ShieldCheck, type: 'bars' },
    { label: 'Reproducciones Totales', value: '4.2M', change: '+342k', icon: PlayCircle, type: 'points' },
    { label: 'Almacenamiento Usado', value: '84.2 TB', change: 'Crítico', icon: HardDrive, progress: 92, critical: true },
  ];

  const logs = [
    { time: '09:42:12', status: 'ÉXITO', msg: 'Sincronización multimedia completada: "Campaña_Invierno_2024.mp4"', node: 'HUB_NYC_01', color: 'text-primary' },
    { time: '08:15:44', status: 'SISTEMA', msg: 'Administrador "Raíz" actualizó firmware de pantalla v2.3.9', node: 'Transmisión Global', color: 'text-secondary' },
    { time: '07:59:01', status: 'ERROR', msg: 'Conexión perdida con Periférico: "PANTALLA_LATERAL_B"', node: 'Nodo: TERMINAL_LAX_04', color: 'text-error' },
    { time: '07:20:12', status: 'INFO', msg: 'Rutina de mantenimiento automático iniciada', node: 'Cron de Sistema', color: 'text-on-surface-variant' },
  ];

  return (
    <div className="space-y-10">
      <section className="flex justify-between items-end">
        <div>
          <p className="font-label text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">Resumen del Sistema</p>
          <h2 className="font-headline text-4xl font-light text-on-surface tracking-tight">Terminal <span className="font-extrabold text-primary">Alfa-01</span></h2>
        </div>
        <div className="flex items-center space-x-2 font-label text-[10px] text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#75ff9e]"></span>
          <span className="uppercase tracking-widest">Transmisión en Vivo Sincronizada</span>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className={`glass-card p-6 rounded-lg border-l-4 ${kpi.critical ? 'border-error' : 'border-primary'} shadow-[0_0_32px_rgba(117,255,158,0.02)] relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <kpi.icon className="w-10 h-10" />
            </div>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <span className="font-headline text-4xl font-bold text-on-surface">{kpi.value}</span>
              <span className={`font-label text-xs font-bold px-2 py-1 rounded ${kpi.critical ? 'text-error bg-error/10' : 'text-primary bg-primary/10'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-white/5 overflow-hidden">
              {kpi.progress && (
                <div className={`h-full ${kpi.critical ? 'bg-error' : 'bg-primary'}`} style={{ width: `${kpi.progress}%` }}></div>
              )}
              {kpi.type === 'bars' && (
                <div className="flex space-x-1 h-6 items-end">
                  {[40, 60, 50, 80, 70, 90, 100].map((h, j) => (
                    <div key={j} className="w-1 bg-primary" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-lg p-6 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-label text-sm font-bold uppercase tracking-widest flex items-center">
                <MapIcon className="mr-2 w-4 h-4 text-primary" />
                Mapa de Calor de la Red
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white/5 font-label text-[10px] rounded uppercase tracking-tighter hover:text-primary transition-colors">Global</button>
                <button className="px-3 py-1 bg-primary text-on-primary font-label text-[10px] rounded uppercase tracking-tighter">Región_Este</button>
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-black/40 relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/map/1200/800?blur=2" 
                alt="Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-primary rounded-full relative shadow-[0_0_15px_#75ff9e]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg p-6 flex flex-col border border-primary/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-label text-sm font-bold uppercase tracking-widest flex items-center">
              <History className="mr-2 w-4 h-4 text-primary" />
              Registros del Sistema
            </h3>
            <button className="text-[10px] font-label text-primary hover:underline uppercase tracking-tighter">Ver Todo</button>
          </div>
          <div className="space-y-8 flex-1 overflow-y-auto pr-2">
            {logs.map((log, i) => (
              <div key={i} className="relative pl-6 border-l border-white/10 pb-4">
                <div className={`absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-current ${log.color} shadow-[0_0_10px_currentColor]`}></div>
                <p className={`font-label text-[10px] font-bold uppercase mb-1 ${log.color}`}>{log.time} | {log.status}</p>
                <p className="text-xs font-medium text-on-surface mb-1">{log.msg}</p>
                <p className="text-[10px] text-on-surface-variant font-label uppercase">{log.node}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
