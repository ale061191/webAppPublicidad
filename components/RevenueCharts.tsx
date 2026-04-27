'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Users, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
  const [realPayments, setRealPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('status', 'paid')
          .order('payment_date', { ascending: true });
        
        if (data && data.length > 0) {
          setRealPayments(data);
        }
      } catch (e) {
        console.log('Usando datos demo');
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const filteredData = useMemo(() => {
    // Si hay datos reales de Supabase, usarlos
    if (realPayments.length > 0) {
      const dataMap = new Map<string, { date: string; revenue: number; clients: number }>();
      
      realPayments.forEach((payment: any) => {
        const paymentDate = new Date(payment.payment_date);
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
        existing.revenue += Number(payment.amount);
        existing.clients += 1;
        dataMap.set(key, existing);
      });
      
      return Array.from(dataMap.values()).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    
    // Si no hay datos reales, mostrar vacío
    return [];
  }, [filter, realPayments]);

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalClients = filteredData.reduce((sum, d) => sum + d.clients, 0);
  
  const trend = 12.5;

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
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-on-surface-variant font-label uppercase">Tendencia</span>
          </div>
          <p className="font-headline text-2xl font-bold text-primary">
            0%
          </p>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-on-surface-variant">
          <div className="text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No hay ingresos registrados</p>
            <p className="text-[10px] opacity-50">Registra el primer pago de un cliente</p>
          </div>
        </div>
      ) : (
      <div style={{ height: 220 }}>
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
      )}
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
  const [activeTab, setActiveTab] = useState<'alto' | 'medio' | 'bajo'>('alto');

  const totemWithClients = useMemo(() => {
    if (totems.length === 0) {
      return [];
    }
    return totems.map((totem) => ({
      ...totem,
      clientCount: totem.clientCount || 0,
      revenue: totem.revenue || 0,
    }));
  }, [totems]);

  const maxRevenue = Math.max(...totemWithClients.map((t) => t.revenue), 1);
  const minRevenue = Math.min(...totemWithClients.map((t) => t.revenue), 0);
  const midRevenue = (maxRevenue + minRevenue) / 2;

  const getHeatColor = (revenue: number) => {
    if (revenue === 0) return { color: 'text-red-500', bg: 'bg-red-500', label: 'Bajo' };
    if (revenue >= midRevenue * 1.3 && revenue > 0) return { color: 'text-green-500', bg: 'bg-green-500', label: 'Alto' };
    if (revenue >= midRevenue && revenue > 0) return { color: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Medio' };
    return { color: 'text-red-500', bg: 'bg-red-500', label: 'Bajo' };
  };

  const highIncomeTotems = totemWithClients.filter((t) => t.revenue >= midRevenue * 1.3 && t.revenue > 0).sort((a, b) => b.revenue - a.revenue);
  const mediumIncomeTotems = totemWithClients.filter((t) => t.revenue >= midRevenue && t.revenue < midRevenue * 1.3 && t.revenue > 0).sort((a, b) => b.revenue - a.revenue);
  const lowIncomeTotems = totemWithClients.filter((t) => t.revenue < midRevenue || t.revenue === 0).sort((a, b) => b.revenue - a.revenue);

  const activeTotemsList = activeTab === 'alto' ? highIncomeTotems : activeTab === 'medio' ? mediumIncomeTotems : lowIncomeTotems;

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="mb-3">
        <h3 className="font-headline font-bold text-lg text-on-surface">Ingresos por Ubicación</h3>
        <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">
          Tótems por nivel de ingresos
        </p>
      </div>

      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setActiveTab('alto')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'alto' 
              ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' 
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-green-500/20'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'alto' ? 'bg-white' : 'bg-green-500'}`}></span>
          Alto ({highIncomeTotems.length})
        </button>
        <button
          onClick={() => setActiveTab('medio')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'medio' 
              ? 'bg-yellow-500 text-white shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-yellow-500/20'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'medio' ? 'bg-white' : 'bg-yellow-500'}`}></span>
          Medio ({mediumIncomeTotems.length})
        </button>
        <button
          onClick={() => setActiveTab('bajo')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'bajo' 
              ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-red-500/20'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'bajo' ? 'bg-white' : 'bg-red-500'}`}></span>
          Bajo ({lowIncomeTotems.length})
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {activeTotemsList.length === 0 ? (
          <p className="text-center text-on-surface-variant text-sm py-4">No hay tótems en esta categoría</p>
        ) : (
          activeTotemsList.map((totem) => {
            const heatInfo = getHeatColor(totem.revenue);
            return (
              <div
                key={totem.id || totem.name}
                className="flex items-center justify-between p-2 bg-surface-container-low/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${heatInfo.bg}`}></div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">{totem.location}</p>
                    <p className="text-[10px] text-on-surface-variant">{totem.clientCount} clientes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${heatInfo.color}`}>${totem.revenue.toLocaleString()}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}