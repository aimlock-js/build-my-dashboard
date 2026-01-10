import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp } from "lucide-react";

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
  { label: "Vendas", color: "hsl(152, 70%, 40%)" },
  { label: "Custos", color: "hsl(217, 91%, 60%)" },
  { label: "Lucro", color: "hsl(45, 100%, 55%)" },
];

export function DailyEvolutionChart() {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center">
            <TrendingUp size={20} className="text-success-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Evolução Diária</h3>
            <p className="text-sm text-muted-foreground">
              Comparativo de Vendas, Custos e Lucro
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 70%, 40%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(152, 70%, 40%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="custos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lucro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45, 100%, 55%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(45, 100%, 55%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 88%)" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(230, 10%, 45%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(230, 10%, 45%)", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(230, 15%, 88%)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px -4px rgb(0 0 0 / 0.15)",
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
              stroke="hsl(152, 70%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#vendas)"
            />
            <Area
              type="monotone"
              dataKey="custos"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#custos)"
            />
            <Area
              type="monotone"
              dataKey="lucro"
              stroke="hsl(45, 100%, 55%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#lucro)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
