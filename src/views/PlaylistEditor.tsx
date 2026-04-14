import { PlusSquare, Upload, CloudDownload, PlayCircle, MapPin, Cpu, History, BarChart3, X, GripVertical } from 'lucide-react';

export default function PlaylistEditor() {
  const playlistItems = [
    { id: '1', status: 'ACTIVE', name: 'CYBER_PULSE_INTRO.MP4', meta: '00:15 | 4K | H.265', loop: 'ON', active: true, img: 'https://picsum.photos/seed/p1/200/300' },
    { id: '2', status: 'QUEUED', name: 'GLOBAL_CONNECT_VIZ.MP4', meta: '00:45 | 4K | H.265', loop: 'OFF', img: 'https://picsum.photos/seed/p2/200/300' },
    { id: '3', status: 'QUEUED', name: 'CIRCUIT_BOARD_MACRO.MOV', meta: '00:30 | 1080P | ProRes', loop: 'ON', img: 'https://picsum.photos/seed/p3/200/300' },
    { id: '4', status: 'DOWNLOAD PENDING', name: 'METRO_SURVEILLANCE_B.MP4', meta: '01:20 | 4K | Downloading...', loop: 'OFF', progress: 30, img: 'https://picsum.photos/seed/p4/200/300' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-surface-container-lowest/50 p-4 rounded-sm border-b border-outline-variant/10">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Totem ID</span>
            <span className="text-sm font-headline font-bold text-primary">T-800-ALPHA-9</span>
          </div>
          <div className="h-8 w-px bg-outline-variant/20"></div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-label text-on-surface uppercase tracking-widest">Live: Terminal 4 South</span>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Core Temp</span>
            <span className="text-sm font-label font-medium">42.4°C</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Connectivity</span>
            <span className="text-sm font-label font-medium text-primary">942 Mbps</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Disk Usage</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-surface-container-highest overflow-hidden">
                <div className="w-[64%] h-full bg-primary"></div>
              </div>
              <span className="text-sm font-label font-medium">64%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-light tracking-tight">Playlist <span className="font-bold text-primary">Sequence</span></h2>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant/30 text-primary hover:bg-primary/10 transition-colors"><PlusSquare className="w-5 h-5" /></button>
              <button className="p-2 border border-outline-variant/30 text-primary hover:bg-primary/10 transition-all"><Upload className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto pr-2 max-h-[calc(100vh-320px)]">
            {playlistItems.map((item) => (
              <div key={item.id} className={`group flex items-center gap-4 p-3 border-l-2 transition-all ${item.active ? 'bg-surface-container-low border-primary' : 'bg-surface-container-lowest border-transparent hover:border-outline-variant/50 hover:bg-surface-container-low'}`}>
                <div className="cursor-grab text-on-surface-variant/40 hover:text-primary"><GripVertical className="w-5 h-5" /></div>
                <div className="w-16 h-24 flex-shrink-0 overflow-hidden bg-black">
                  <img src={item.img} alt="Thumb" className={`w-full h-full object-cover ${item.active ? 'opacity-80' : 'opacity-60'}`} referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <span className={`text-xs font-label uppercase tracking-tighter mb-1 ${item.active ? 'text-primary' : 'text-on-surface-variant'}`}>{item.status}</span>
                  <h3 className={`text-sm font-headline truncate uppercase ${item.active ? 'font-semibold' : 'font-medium'}`}>{item.name}</h3>
                  <span className="text-[10px] font-label text-on-surface-variant">{item.meta}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {item.progress !== undefined ? (
                    <div className="w-12 h-1 bg-surface-container-highest">
                      <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  ) : (
                    <span className="text-[10px] font-label text-on-surface-variant">LOOP: {item.loop}</span>
                  )}
                  <button className="text-on-surface-variant hover:text-error transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border border-primary/20 text-primary font-label text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all">
              <CloudDownload className="w-4 h-4" /> Sync Library
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-primary text-on-primary font-bold font-label text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
              <PlayCircle className="w-4 h-4" /> Publish Live
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="bg-surface-container-lowest p-1 border border-outline-variant/10 flex">
            <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden group">
              <div className="h-[500px] aspect-[9/16] bg-surface-container-low shadow-2xl relative">
                <img src="https://picsum.photos/seed/live/450/800" alt="Live" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <div className="bg-error px-2 py-0.5 text-[8px] font-label text-white uppercase font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> REC
                  </div>
                  <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 text-[8px] font-label text-on-surface uppercase tracking-widest">CAM_01_SOUTH</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-highest">
                  <div className="h-full bg-primary w-[35%]"></div>
                </div>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 text-right font-label uppercase">
                <div>
                  <span className="text-[8px] text-on-surface-variant block">Frame Rate</span>
                  <span className="text-xs text-primary font-bold">60.00 FPS</span>
                </div>
                <div>
                  <span className="text-[8px] text-on-surface-variant block">Resolution</span>
                  <span className="text-xs text-on-surface font-bold">2160 X 3840</span>
                </div>
                <div>
                  <span className="text-[8px] text-on-surface-variant block">Bitrate</span>
                  <span className="text-xs text-on-surface font-bold">45.2 MBPS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-6 flex flex-col border-l-2 border-primary/30">
              <span className="text-[10px] font-label text-primary uppercase tracking-[0.2em] mb-2">Location Meta</span>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-xl font-headline font-bold">SOUTH TERMINAL</h4>
                  <p className="text-xs text-on-surface-variant font-label uppercase">Gate A-12 Cluster</p>
                </div>
                <MapPin className="text-primary/40 w-8 h-8" />
              </div>
            </div>
            <div className="bg-surface-container-low p-6 flex flex-col border-l-2 border-outline-variant">
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.2em] mb-2">Hardware Specs</span>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-xl font-headline font-bold uppercase">KNTIC-R3</h4>
                  <p className="text-xs text-on-surface-variant font-label uppercase">Rev 4.2 Chassis</p>
                </div>
                <Cpu className="text-on-surface-variant/40 w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-outline-variant/10">
            <div className="flex gap-4">
              <button className="text-xs font-label uppercase tracking-widest flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all">
                <History className="w-4 h-4" /> Play History
              </button>
              <button className="text-xs font-label uppercase tracking-widest flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-all">
                <BarChart3 className="w-4 h-4" /> Analytics
              </button>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-error/30 text-error font-label text-[10px] uppercase tracking-widest hover:bg-error/10 transition-all">Emergency Kill</button>
              <button className="px-6 py-2 bg-surface-container-highest text-on-surface font-label text-[10px] uppercase tracking-widest hover:bg-surface-container-high transition-all">Remote Restart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
