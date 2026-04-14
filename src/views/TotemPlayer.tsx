import { Terminal, PlayCircle, TrendingUp, Radio, Fingerprint, Activity, Lock } from 'lucide-react';

export default function TotemPlayer() {
  return (
    <div className="bg-black text-on-surface font-body overflow-hidden flex items-center justify-center min-h-screen p-4">
      <main className="relative aspect-[9/16] w-full max-w-[506px] h-full max-h-[900px] overflow-hidden bg-background shadow-[0_0_100px_rgba(0,0,0,0.8)] border-x border-surface-container-highest">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/kinetic/1080/1920?blur=4" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(117, 255, 158, 0.05) 51%, transparent 52%)', backgroundSize: '100% 4px' }}></div>
        </div>

        <header className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex flex-col">
            <span className="text-2xl font-headline font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(117,255,158,0.4)]">VOLTAJE</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#75ff9e]"></div>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/80">V-01_KINETIC</span>
            </div>
          </div>
          <div className="glass-panel px-4 py-2 rounded-lg border border-primary/10">
            <span className="font-label text-xs font-bold text-on-surface tracking-widest">Tótem A1-Sambil Mall</span>
          </div>
        </header>

        <aside className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 px-4 z-40">
          <div className="flex flex-col items-center gap-6 py-8 glass-panel rounded-full border border-white/5 shadow-xl">
            <Terminal className="text-primary/40 w-5 h-5" />
            <PlayCircle className="text-primary w-5 h-5" fill="currentColor" />
            <TrendingUp className="text-primary/40 w-5 h-5" />
          </div>
        </aside>

        <div className="absolute inset-x-0 bottom-0 z-50 p-8 flex flex-col items-center gap-6">
          <div className="w-full glass-panel border border-primary/20 p-8 rounded-xl flex flex-col items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center gap-2">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary/60">Device Synchronization</span>
              <h2 className="font-headline text-lg font-medium text-on-surface">Vincular Dispositivo</h2>
            </div>
            
            <div className="flex gap-3 justify-center">
              {['C', '-', '7', '7', '2', '9'].map((char, i) => (
                <div key={i} className={`w-14 h-16 flex items-center justify-center ${char === '-' ? '' : 'bg-surface-container-highest/50 border-b-2 border-primary'}`}>
                  <span className={`font-headline text-3xl font-bold ${char === '-' ? 'text-primary/40' : 'text-primary'}`}>{char}</span>
                </div>
              ))}
            </div>
            
            <p className="text-on-surface-variant text-center text-sm font-body max-w-[240px] leading-relaxed">
              Ingresa este código en la aplicación móvil para tomar el control de la unidad.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Radio className="text-primary w-3 h-3" />
                <span className="font-label text-[9px] uppercase text-on-surface-variant tracking-widest">Signal: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="text-primary w-3 h-3" />
                <span className="font-label text-[9px] uppercase text-on-surface-variant tracking-widest">Sec: Encrypted</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full opacity-60">
            <span className="font-label text-[10px] tracking-tighter">VOLTAJE_NETWORK</span>
            <div className="flex gap-4">
              <Activity className="w-4 h-4" />
              <Lock className="w-4 h-4" />
            </div>
            <span className="font-label text-[10px] tracking-tighter">SYS_STATUS_OK</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/10 blur-[100px] pointer-events-none"></div>
      </main>
    </div>
  );
}
