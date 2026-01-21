import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Sem 1", vendas: 4200, lucro: 2100 },
  { name: "Sem 2", vendas: 3800, lucro: 1900 },
  { name: "Sem 3", vendas: 5200, lucro: 2800 },
  { name: "Sem 4", vendas: 4800, lucro: 2400 },
  { name: "Sem 5", vendas: 6100, lucro: 3200 },
  { name: "Sem 6", vendas: 5400, lucro: 2700 },
  { name: "Sem 7", vendas: 7200, lucro: 3800 },
  { name: "Sem 8", vendas: 6800, lucro: 3400 },
  { name: "Sem 9", vendas: 7500, lucro: 4000 },
  { name: "Sem 10", vendas: 8100, lucro: 4300 },
  { name: "Sem 11", vendas: 7800, lucro: 4100 },
  { name: "Sem 12", vendas: 8900, lucro: 4800 },
];

const periods = ["Últimos 3 meses", "Últimos 30 dias", "Últimos 7 dias"];

export function SalesChart() {
  const [activePeriod, setActivePeriod] = useState("Últimos 3 meses");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Gráfico de vendas</h3>
          <p className="text-sm text-muted-foreground">Total para os últimos 3 meses</p>
        </div>
        
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePeriod === period
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
              tickFormatter={(value) => `R$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
            />
            <Area
              type="monotone"
              dataKey="vendas"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorVendas)"
              name="Vendas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
