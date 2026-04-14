import { Bolt, AtSign, LockOpen, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(117, 255, 158, 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-start">
        <button className="group flex items-center space-x-2 text-on-surface-variant/70 hover:text-primary transition-colors duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest">Atrás</span>
        </button>
      </div>

      <main className="w-full max-w-[450px] px-6 z-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <Bolt className="text-primary w-10 h-10" fill="currentColor" />
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(117, 255, 158, 0.3)]">VOLTAJE PLUS</h1>
          </div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant/60">SISTEMA DE GESTIÓN CENTRALIZADO</p>
        </header>

        <section className="bg-surface/60 backdrop-blur-2xl border border-outline-variant/20 rounded-lg p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
          <form 
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-8 relative z-10"
          >
            <div className="space-y-2 group">
              <label className="font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative">
                <AtSign className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5 group-focus-within:text-primary" />
                <input 
                  type="email" 
                  placeholder="admin@voltaje.plus"
                  className="w-full bg-surface-container-highest/30 border-t-0 border-x-0 border-b-2 border-outline-variant/30 text-on-surface py-3 pl-8 pr-4 focus:ring-0 focus:border-primary focus:bg-primary/5 transition-all outline-none placeholder:text-on-surface-variant/30 font-body"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-end">
                <label className="font-label text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">
                  CONTRASEÑA
                </label>
                <button type="button" className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant/60 hover:text-primary transition-colors">¿Olvidaste la contraseña?</button>
              </div>
              <div className="relative">
                <LockOpen className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5 group-focus-within:text-primary" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-surface-container-highest/30 border-t-0 border-x-0 border-b-2 border-outline-variant/30 text-on-surface py-3 pl-8 pr-4 focus:ring-0 focus:border-primary focus:bg-primary/5 transition-all outline-none placeholder:text-on-surface-variant/30 font-body"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="remember" className="w-4 h-4 bg-transparent border-outline-variant rounded-sm text-primary focus:ring-primary/20 focus:ring-offset-0" />
              <label htmlFor="remember" className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/80 cursor-pointer select-none">MANTENER SESIÓN INICIADA</label>
            </div>

            <button type="submit" className="w-full group relative overflow-hidden bg-gradient-to-br from-primary to-primary-container py-4 rounded-lg flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(117,255,158,0.2)] hover:shadow-[0_0_35px_rgba(117,255,158,0.4)] active:scale-[0.98] transition-all">
              <span className="font-headline font-bold text-on-primary uppercase tracking-tighter text-lg">ENTRAR AL SISTEMA</span>
              <ArrowRight className="text-on-primary w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </section>
        
        <footer className="mt-8 text-center">
          <p className="font-label text-[10px] text-on-surface-variant/40 tracking-[0.2em] uppercase">
            © 2024 VOLTAJE DIGITAL ARCHITECTURE. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </footer>
      </main>
    </div>
  );
}
