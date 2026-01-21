import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { name: "Sem 1", vendas: 18200, custos: 10800, lucro: 7400 },
  { name: "Sem 2", vendas: 16800, custos: 9600, lucro: 7200 },
  { name: "Sem 3", vendas: 22500, custos: 12400, lucro: 10100 },
  { name: "Sem 4", vendas: 19800, custos: 11200, lucro: 8600 },
  { name: "Sem 5", vendas: 25100, custos: 14200, lucro: 10900 },
  { name: "Sem 6", vendas: 23400, custos: 13100, lucro: 10300 },
  { name: "Sem 7", vendas: 28200, custos: 15800, lucro: 12400 },
  { name: "Sem 8", vendas: 26800, custos: 14900, lucro: 11900 },
  { name: "Sem 9", vendas: 31500, custos: 17200, lucro: 14300 },
  { name: "Sem 10", vendas: 34100, custos: 18400, lucro: 15700 },
  { name: "Sem 11", vendas: 32800, custos: 17800, lucro: 15000 },
  { name: "Sem 12", vendas: 38900, custos: 20100, lucro: 18800 },
];

const periods = ["Últimos 3 meses", "Últimos 30 dias", "Últimos 7 dias"];

const legendItems = [
  { key: "vendas", label: "Vendas", color: "hsl(142, 71%, 45%)" },
  { key: "custos", label: "Custos", color: "hsl(0, 84%, 60%)" },
  { key: "lucro", label: "Lucro", color: "hsl(var(--primary))" },
];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Desempenho Financeiro</h3>
          <p className="text-sm text-muted-foreground">Vendas, custos e lucro do período</p>
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
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
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
              stroke="hsl(var(--primary))"
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
