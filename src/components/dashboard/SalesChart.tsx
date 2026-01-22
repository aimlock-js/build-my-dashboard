import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data3Months = [
  { name: "Jan", vendas: 45000, custos: 28000, lucro: 17000 },
  { name: "Fev", vendas: 52000, custos: 31000, lucro: 21000 },
  { name: "Mar", vendas: 48000, custos: 29000, lucro: 19000 },
  { name: "Abr", vendas: 61000, custos: 35000, lucro: 26000 },
  { name: "Mai", vendas: 55000, custos: 32000, lucro: 23000 },
  { name: "Jun", vendas: 67000, custos: 38000, lucro: 29000 },
  { name: "Jul", vendas: 72000, custos: 41000, lucro: 31000 },
  { name: "Ago", vendas: 69000, custos: 39000, lucro: 30000 },
  { name: "Set", vendas: 78000, custos: 44000, lucro: 34000 },
  { name: "Out", vendas: 85000, custos: 48000, lucro: 37000 },
  { name: "Nov", vendas: 92000, custos: 52000, lucro: 40000 },
  { name: "Dez", vendas: 127850, custos: 79610, lucro: 48240 },
];

const data30Days = [
  { name: "Sem 1", vendas: 28000, custos: 17500, lucro: 10500 },
  { name: "Sem 2", vendas: 32000, custos: 19800, lucro: 12200 },
  { name: "Sem 3", vendas: 35000, custos: 21500, lucro: 13500 },
  { name: "Sem 4", vendas: 32850, custos: 20810, lucro: 12040 },
];

const data7Days = [
  { name: "Seg", vendas: 4200, custos: 2600, lucro: 1600 },
  { name: "Ter", vendas: 5100, custos: 3100, lucro: 2000 },
  { name: "Qua", vendas: 4800, custos: 2900, lucro: 1900 },
  { name: "Qui", vendas: 6200, custos: 3800, lucro: 2400 },
  { name: "Sex", vendas: 7500, custos: 4600, lucro: 2900 },
  { name: "Sáb", vendas: 8200, custos: 5000, lucro: 3200 },
  { name: "Dom", vendas: 3100, custos: 1900, lucro: 1200 },
];

const periods = [
  { label: "3 meses", data: data3Months },
  { label: "30 dias", data: data30Days },
  { label: "7 dias", data: data7Days },
];

const legendItems = [
  { key: "vendas", label: "Vendas", color: "hsl(142, 71%, 45%)" },
  { key: "custos", label: "Custos", color: "hsl(0, 84%, 60%)" },
  { key: "lucro", label: "Lucro", color: "hsl(262, 83%, 58%)" },
];

export function SalesChart() {
  const [activePeriod, setActivePeriod] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Desempenho Financeiro</h3>
          <p className="text-sm text-muted-foreground">Vendas, custos e lucro do período</p>
        </div>
        
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {periods.map((period, index) => (
            <button
              key={period.label}
              onClick={() => setActivePeriod(index)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePeriod === index
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        {legendItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={periods[activePeriod].data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCustos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              formatter={(value: number) => [
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value),
                ''
              ]}
            />
            <Area
              type="monotone"
              dataKey="vendas"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              fill="url(#colorVendas)"
              name="Vendas"
            />
            <Area
              type="monotone"
              dataKey="custos"
              stroke="hsl(0, 84%, 60%)"
              strokeWidth={2}
              fill="url(#colorCustos)"
              name="Custos"
            />
            <Area
              type="monotone"
              dataKey="lucro"
              stroke="hsl(262, 83%, 58%)"
              strokeWidth={2.5}
              fill="url(#colorLucro)"
              name="Lucro"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
