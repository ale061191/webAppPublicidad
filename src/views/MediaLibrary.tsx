import { CloudUpload, Filter, UploadCloud, CheckCircle, Send, Tag, Delete, ChevronLeft, ChevronRight, VideoOff } from 'lucide-react';

export default function MediaLibrary() {
  const mediaItems = [
    { id: '1', name: 'NEON_DRIFT_01.MP4', size: '3.4 MB', res: '1080x1920', dur: '15S', quality: 'HD', img: 'https://picsum.photos/seed/m1/200/350', active: true },
    { id: '2', name: 'CORE_METRIC_SYS.MP4', size: '12.8 MB', res: '2160x3840', dur: '30S', quality: '4K', img: 'https://picsum.photos/seed/m2/200/350' },
    { id: '3', name: 'GLITCH_LOOP_A.MP4', size: '1.2 MB', res: '1080x1920', dur: '05S', quality: 'HD', img: 'https://picsum.photos/seed/m3/200/350' },
    { id: '4', name: 'VOID_AMBIENT_60.MP4', size: '24.5 MB', res: '1080x1920', dur: '60S', quality: 'HD', img: 'https://picsum.photos/seed/m4/200/350' },
    { id: '5', name: 'GLOBAL_NETWORK_04.MP4', size: '8.1 MB', res: '2160x3840', dur: '15S', quality: '4K', img: 'https://picsum.photos/seed/m5/200/350' },
    { id: '6', name: 'TERMINAL_FEED_X.MP4', size: '2.9 MB', res: '1080x1920', dur: '10S', quality: 'HD', img: 'https://picsum.photos/seed/m6/200/350' },
    { id: '7', name: 'BINARY_CASCADE.MP4', size: '4.5 MB', res: '1080x1920', dur: '15S', quality: 'HD', img: 'https://picsum.photos/seed/m7/200/350' },
    { id: '8', name: 'BUFFER_CORRUPTO_02.MOV', size: 'Recuperación Pendiente', res: '', dur: '30S', quality: '', corrupted: true },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="max-w-xl">
          <h2 className="text-4xl font-headline font-light tracking-tight text-on-surface mb-2 italic">REPOSITORIO <span className="text-primary font-bold not-italic">.LIBR</span></h2>
          <div className="flex gap-4 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            <span>ENTIDADES_INDEXADAS: 342</span>
            <span>CARGA_ALMACENAMIENTO: 72%</span>
            <span>ÚLTIMA_SINCRONIZACIÓN: 04:22:00</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-outline-variant/30 hover:bg-surface-container-high transition-all text-on-surface font-label text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros Avanzados
          </button>
          <button className="px-6 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all font-label text-[10px] uppercase tracking-widest flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Ingesta Masiva
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3 space-y-8">
          <div className="p-6 border border-dashed border-primary/30 glass-panel flex flex-col items-center justify-center text-center group hover:border-primary/60 transition-colors cursor-pointer aspect-square rounded-xl">
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
                <button className="px-3 py-2 bg-surface-container-low text-[10px] font-label text-on-surface-variant hover:bg-surface-container-high text-left">SNIPPET 5S</button>
                <button className="px-3 py-2 bg-surface-container-low text-[10px] font-label text-on-surface-variant hover:bg-surface-container-high text-left">TEASER 15S</button>
                <button className="px-3 py-2 bg-primary/20 text-primary border border-primary/30 text-[10px] font-label text-left">ESTÁNDAR 30S</button>
                <button className="px-3 py-2 bg-surface-container-low text-[10px] font-label text-on-surface-variant hover:bg-surface-container-high text-left">EXTENDIDO 60S</button>
              </div>
            </div>
            <div>
              <h4 className="font-label text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Matriz de Formato</h4>
              <div className="flex flex-col gap-1">
                {['Vertical 9:16 (Activo)', 'Horizontal 16:9', 'Cuadrado 1:1'].map((f, i) => (
                  <label key={i} className="flex items-center gap-3 px-3 py-2 bg-surface-container-low/50 cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input type="checkbox" className="rounded-none bg-background border-outline-variant text-primary focus:ring-0" />
                    <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{f}</span>
                  </label>
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
                <span className="font-label text-[10px] uppercase tracking-widest font-bold">12 Seleccionados</span>
              </div>
              <div className="h-4 w-px bg-outline-variant/30"></div>
              <div className="flex gap-4">
                <button className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Send className="w-3 h-3" /> Asignar a Tótems
                </button>
                <button className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Añadir Etiquetas
                </button>
                <button className="font-label text-[10px] uppercase tracking-widest text-error hover:text-error/80 transition-colors flex items-center gap-1">
                  <Delete className="w-3 h-3" /> Eliminar
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <div key={item.id} className="group relative aspect-[9/16] glass-card overflow-hidden rounded-xl">
                {item.corrupted ? (
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <VideoOff className="text-primary/20 w-12 h-12 mb-4 mx-auto" />
                      <p className="font-label text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/40">Miniatura No Disponible</p>
                    </div>
                  </div>
                ) : (
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" referrerPolicy="no-referrer" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-3 left-3 flex gap-1">
                  {item.quality && <span className="bg-primary px-1.5 py-0.5 text-[8px] font-label font-bold text-on-primary uppercase tracking-tighter">{item.quality}</span>}
                  <span className="bg-surface-container-highest/80 backdrop-blur px-1.5 py-0.5 text-[8px] font-label text-on-surface uppercase tracking-tighter">{item.dur}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-1 truncate">{item.name}</p>
                  <p className="font-body text-[8px] text-on-surface-variant/60">{item.size} {item.res && `| ${item.res}`}</p>
                </div>
                {item.active && (
                  <div className="absolute bottom-4 right-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center border-t border-outline-variant/10 pt-8">
            <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">
              MOSTRANDO <span className="text-on-surface">1-24</span> DE <span className="text-on-surface">342</span> ACTIVOS
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
