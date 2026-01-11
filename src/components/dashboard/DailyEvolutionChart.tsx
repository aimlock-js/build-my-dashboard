import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, MoreHorizontal } from "lucide-react";

const data = [
  { day: "01", vendas: 12000, custos: 6000, lucro: 6000 },
  { day: "02", vendas: 15000, custos: 7000, lucro: 8000 },
  { day: "03", vendas: 8000, custos: 4000, lucro: 4000 },
  { day: "04", vendas: 22000, custos: 10000, lucro: 12000 },
  { day: "05", vendas: 18000, custos: 8000, lucro: 10000 },
  { day: "06", vendas: 25000, custos: 12000, lucro: 13000 },
  { day: "07", vendas: 20000, custos: 9000, lucro: 11000 },
  { day: "08", vendas: 16000, custos: 7000, lucro: 9000 },
  { day: "09", vendas: 28000, custos: 13000, lucro: 15000 },
  { day: "10", vendas: 24000, custos: 11000, lucro: 13000 },
  { day: "11", vendas: 30000, custos: 14000, lucro: 16000 },
  { day: "12", vendas: 26000, custos: 12000, lucro: 14000 },
  { day: "13", vendas: 22000, custos: 10000, lucro: 12000 },
  { day: "14", vendas: 35000, custos: 16000, lucro: 19000 },
  { day: "15", vendas: 32000, custos: 15000, lucro: 17000 },
  { day: "16", vendas: 28000, custos: 13000, lucro: 15000 },
  { day: "17", vendas: 38000, custos: 18000, lucro: 20000 },
  { day: "18", vendas: 42000, custos: 20000, lucro: 22000 },
  { day: "19", vendas: 36000, custos: 17000, lucro: 19000 },
  { day: "20", vendas: 40000, custos: 19000, lucro: 21000 },
  { day: "21", vendas: 45000, custos: 21000, lucro: 24000 },
  { day: "22", vendas: 50000, custos: 24000, lucro: 26000 },
];

const legendItems = [
  { label: "Vendas", color: "hsl(160, 65%, 40%)" },
  { label: "Custos", color: "hsl(210, 90%, 55%)" },
  { label: "Lucro", color: "hsl(38, 92%, 50%)" },
];

export function DailyEvolutionChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 card-shadow border border-border h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Evolução Diária</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Comparativo de receitas e despesas
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-4">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <MoreHorizontal size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 65%, 40%)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="hsl(160, 65%, 40%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="custos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210, 90%, 55%)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="hsl(210, 90%, 55%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lucro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 92%)" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
              }
              width={45}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 15%, 90%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="vendas"
              stroke="hsl(160, 65%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#vendas)"
            />
            <Area
              type="monotone"
              dataKey="custos"
              stroke="hsl(210, 90%, 55%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#custos)"
            />
            <Area
              type="monotone"
              dataKey="lucro"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#lucro)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}