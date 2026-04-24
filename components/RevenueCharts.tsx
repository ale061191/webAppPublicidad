'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Users, Filter } from 'lucide-react';

type FilterType = 'day' | 'week' | 'month';

interface Payment {
  id: number;
  clientId: number;
  clientName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'cancelled';
}

interface RevenueChartProps {
  payments?: Payment[];
  clients?: any[];
}

const COLORS = ['#75ff9e', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function RevenueChart({ payments = [], clients = [] }: RevenueChartProps) {
  const [filter, setFilter] = useState<FilterType>('month');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredData = useMemo(() => {
    if (!mounted) return generateDemoData(filter);

    const now = new Date();
    const dataMap = new Map<string, { date: string; revenue: number; clients: number }>();

    payments.forEach((payment) => {
      if (payment.status !== 'paid') return;
      
      const paymentDate = new Date(payment.date);
      let key: string;

      if (filter === 'day') {
        key = paymentDate.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
      } else if (filter === 'week') {
        const weekNum = Math.ceil((paymentDate.getDate() - paymentDate.getDay() + 1) / 7);
        key = `${paymentDate.toLocaleDateString('es-MX', { month: 'short' })} S${weekNum}`;
      } else {
        key = paymentDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
      }

      const existing = dataMap.get(key) || { date: key, revenue: 0, clients: 0 };
      existing.revenue += payment.amount;
      existing.clients += 1;
      dataMap.set(key, existing);
    });

    const sortedData = Array.from(dataMap.values()).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    if (sortedData.length === 0) {
      return generateDemoData(filter);
    }

    return sortedData;
  }, [payments, filter, mounted]);

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalClients = filteredData.reduce((sum, d) => sum + d.clients, 0);
  const avgRevenue = totalClients > 0 ? totalRevenue / totalClients : 0;

  const previousData = filteredData.slice(0, -1);
  const previousTotal = previousData.reduce((sum, d) => sum + d.revenue, 0);
  const trend = previousTotal > 0 ? ((totalRevenue - previousTotal) / previousTotal * 100) : 0;

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">Ingresos por Cliente</h3>
          <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">
            Pagos registrados en la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          {(['day', 'week', 'month'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-[10px] font-label uppercase tracking-wider transition-all ${
                filter === f
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
              }`}
            >
              {f === 'day' ? 'Día' : f === 'week' ? 'Semana' : 'Mes'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Ingresos Totales</span>
          </div>
          <p className="font-headline text-2xl font-bold text-on-surface">
            ${totalRevenue.toLocaleString('es-MX')}
          </p>
        </div>
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Clientes</span>
          </div>
          <p className="font-headline text-2xl font-bold text-on-surface">
            {totalClients}
          </p>
        </div>
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-primary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-error" />
            )}
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Tendencia</span>
          </div>
          <p className={`font-headline text-2xl font-bold ${trend >= 0 ? 'text-primary' : 'text-error'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#75ff9e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#75ff9e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.4)" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.4)" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value >= 1000 ? `${value / 1000}k` : value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(10,10,10,0.9)',
                border: '1px solid rgba(117,255,158,0.2)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => [`$${Number(value).toLocaleString('es-MX')}`, 'Ingresos']}
              labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#75ff9e"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function generateDemoData(filter: FilterType) {
  const data = [];
  const now = new Date();

  if (filter === 'day') {
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const seed = i * 7 + 1;
      const randomClients = Math.floor(seededRandom(seed) * 5) + 1;
      const revenue = randomClients * (seededRandom(seed + 100) * 15000 + 5000);
      data.push({
        date: date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
        revenue: Math.round(revenue),
        clients: randomClients,
      });
    }
  } else if (filter === 'week') {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i * 7);
      const weekNum = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
      const seed = i * 11 + 5;
      const randomClients = Math.floor(seededRandom(seed) * 6) + 2;
      const revenue = randomClients * (seededRandom(seed + 200) * 20000 + 8000);
      data.push({
        date: `${date.toLocaleDateString('es-MX', { month: 'short' })} S${weekNum}`,
        revenue: Math.round(revenue),
        clients: randomClients,
      });
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const seed = i * 13 + 3;
      const randomClients = Math.floor(seededRandom(seed) * 8) + 3;
      const revenue = randomClients * (seededRandom(seed + 300) * 25000 + 10000);
      data.push({
        date: date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }),
        revenue: Math.round(revenue),
        clients: randomClients,
      });
    }
  }

  return data;
}

export function TotemHeatmap({ totems = [], clients = [] }: { totems?: any[]; clients?: any[] }) {
  const [selectedTotem, setSelectedTotem] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totemWithClients = useMemo(() => {
    if (!mounted) {
      return totems.slice(0, 8).map((totem, idx) => ({
        ...totem,
        clientCount: Math.floor(seededRandom(idx * 17) * 10) + 1,
        revenue: Math.floor(seededRandom(idx * 23) * 50000) + 5000,
        lat: 19.4326 + (seededRandom(idx * 31) - 0.5) * 0.1,
        lng: -99.1332 + (seededRandom(idx * 37) - 0.5) * 0.1,
      }));
    }
    return totems.map((totem, idx) => ({
      ...totem,
      clientCount: Math.floor(seededRandom(idx * 17) * 10) + 1,
      revenue: Math.floor(seededRandom(idx * 23) * 50000) + 5000,
      lat: 19.4326 + (seededRandom(idx * 31) - 0.5) * 0.1,
      lng: -99.1332 + (seededRandom(idx * 37) - 0.5) * 0.1,
    }));
  }, [totems, mounted]);

  const maxClients = Math.max(...totemWithClients.map((t) => t.clientCount), 1);

  const getHeatIntensity = (clientCount: number) => {
    const intensity = clientCount / maxClients;
    if (intensity > 0.75) return 'bg-primary shadow-[0_0_20px_rgba(117,255,158,0.6)]';
    if (intensity > 0.5) return 'bg-primary/70 shadow-[0_0_15px_rgba(117,255,158,0.4)]';
    if (intensity > 0.25) return 'bg-primary/50 shadow-[0_0_10px_rgba(117,255,158,0.3)]';
    return 'bg-primary/30';
  };

  const totalRevenue = totemWithClients.reduce((sum, t) => sum + t.revenue, 0);
  const totalClients = totemWithClients.reduce((sum, t) => sum + t.clientCount, 0);
  const activeTotems = totems.filter((t) => t.status === 'online').length;

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">Mapa de Calor - Tótems</h3>
          <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">
            Clientes por ubicación
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-primary/30"></span>
            <span>1-3</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-primary/50"></span>
            <span>4-6</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-primary/70"></span>
            <span>7-9</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span>10+</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Ingresos</span>
          </div>
          <p className="font-headline text-xl font-bold text-on-surface">
            ${totalRevenue.toLocaleString('es-MX')}
          </p>
        </div>
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Clientes</span>
          </div>
          <p className="font-headline text-xl font-bold text-on-surface">
            {totalClients}
          </p>
        </div>
        <div className="bg-surface-container-low/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Activos</span>
          </div>
          <p className="font-headline text-xl font-bold text-on-surface">
            {activeTotems} / {totems.length}
          </p>
        </div>
      </div>

      <div className="relative h-80 bg-surface-container-low/30 rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(117,255,158,0.1) 1px, transparent 0)', 
            backgroundSize: '20px 20px' 
          }}>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] text-on-surface-variant/60 font-label uppercase tracking-wider">Ciudad de México</p>
            <p className="text-xs text-primary font-headline">Centro</p>
          </div>
        </div>

        {totemWithClients.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-on-surface-variant">No hay tótems registrados</p>
              <p className="text-[10px] text-on-surface-variant/60 mt-2">Agrega tótems para ver el mapa de calor</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            {totemWithClients.slice(0, 12).map((totem, index) => {
              const angle = (index / 12) * 2 * Math.PI;
              const radius = 80 + (Math.random() * 60);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <button
                  key={totem.id || index}
                  onClick={() => setSelectedTotem(totem)}
                  className={`absolute w-6 h-6 rounded-full transition-all hover:scale-150 flex items-center justify-center
                    ${getHeatIntensity(totem.clientCount)}
                    ${selectedTotem?.id === totem.id ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
                  style={{
                    left: `calc(50% + ${x}px - 12px)`,
                    top: `calc(50% + ${y}px - 12px)`,
                  }}
                  title={`${totem.name}: ${totem.clientCount} clientes`}
                >
                  <span className="text-[8px] font-bold text-black">{totem.clientCount}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedTotem && (
        <div className="mt-4 p-4 bg-surface-container-low/50 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-headline font-bold text-on-surface">{selectedTotem.name}</p>
            <p className="text-[10px] text-on-surface-variant">{selectedTotem.location}</p>
          </div>
          <div className="text-right">
            <p className="text-primary font-headline font-bold">${selectedTotem.revenue.toLocaleString()}</p>
            <p className="text-[10px] text-on-surface-variant">{selectedTotem.clientCount} clientes</p>
          </div>
        </div>
      )}
    </div>
  );
}