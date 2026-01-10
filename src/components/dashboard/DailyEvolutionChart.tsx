import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "1", vendas: 12000, vendasAnt: 8000, custos: 6000, custosAnt: 5000, lucro: 6000, lucroAnt: 3000 },
  { day: "2", vendas: 15000, vendasAnt: 10000, custos: 7000, custosAnt: 6000, lucro: 8000, lucroAnt: 4000 },
  { day: "3", vendas: 8000, vendasAnt: 12000, custos: 4000, custosAnt: 7000, lucro: 4000, lucroAnt: 5000 },
  { day: "4", vendas: 22000, vendasAnt: 15000, custos: 10000, custosAnt: 8000, lucro: 12000, lucroAnt: 7000 },
  { day: "5", vendas: 18000, vendasAnt: 14000, custos: 8000, custosAnt: 7000, lucro: 10000, lucroAnt: 7000 },
  { day: "6", vendas: 25000, vendasAnt: 18000, custos: 12000, custosAnt: 9000, lucro: 13000, lucroAnt: 9000 },
  { day: "7", vendas: 20000, vendasAnt: 16000, custos: 9000, custosAnt: 8000, lucro: 11000, lucroAnt: 8000 },
  { day: "8", vendas: 16000, vendasAnt: 13000, custos: 7000, custosAnt: 6000, lucro: 9000, lucroAnt: 7000 },
  { day: "9", vendas: 28000, vendasAnt: 20000, custos: 13000, custosAnt: 10000, lucro: 15000, lucroAnt: 10000 },
  { day: "10", vendas: 24000, vendasAnt: 18000, custos: 11000, custosAnt: 9000, lucro: 13000, lucroAnt: 9000 },
  { day: "11", vendas: 30000, vendasAnt: 22000, custos: 14000, custosAnt: 11000, lucro: 16000, lucroAnt: 11000 },
  { day: "12", vendas: 26000, vendasAnt: 19000, custos: 12000, custosAnt: 9000, lucro: 14000, lucroAnt: 10000 },
  { day: "13", vendas: 22000, vendasAnt: 17000, custos: 10000, custosAnt: 8000, lucro: 12000, lucroAnt: 9000 },
  { day: "14", vendas: 35000, vendasAnt: 25000, custos: 16000, custosAnt: 12000, lucro: 19000, lucroAnt: 13000 },
  { day: "15", vendas: 32000, vendasAnt: 23000, custos: 15000, custosAnt: 11000, lucro: 17000, lucroAnt: 12000 },
  { day: "16", vendas: 28000, vendasAnt: 21000, custos: 13000, custosAnt: 10000, lucro: 15000, lucroAnt: 11000 },
  { day: "17", vendas: 38000, vendasAnt: 28000, custos: 18000, custosAnt: 14000, lucro: 20000, lucroAnt: 14000 },
  { day: "18", vendas: 42000, vendasAnt: 30000, custos: 20000, custosAnt: 15000, lucro: 22000, lucroAnt: 15000 },
  { day: "19", vendas: 36000, vendasAnt: 26000, custos: 17000, custosAnt: 13000, lucro: 19000, lucroAnt: 13000 },
  { day: "20", vendas: 40000, vendasAnt: 29000, custos: 19000, custosAnt: 14000, lucro: 21000, lucroAnt: 15000 },
  { day: "21", vendas: 45000, vendasAnt: 32000, custos: 21000, custosAnt: 16000, lucro: 24000, lucroAnt: 16000 },
  { day: "22", vendas: 50000, vendasAnt: 35000, custos: 24000, custosAnt: 17000, lucro: 26000, lucroAnt: 18000 },
];

const legendItems = [
  { label: "Vendas", color: "#22c55e" },
  { label: "Vendas Anterior", color: "#86efac" },
  { label: "Custos", color: "#3b82f6" },
  { label: "Custos Anterior", color: "#93c5fd" },
  { label: "Lucro", color: "#eab308" },
  { label: "Lucro Anterior", color: "#fef08a" },
];

export function DailyEvolutionChart() {
  return (
    <div className="bg-card rounded-xl p-6 metric-card-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Evolução Diária</h3>
        <p className="text-sm text-muted-foreground">
          Comparativo diário de Vendas, Custos e Lucro
        </p>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0} barCategoryGap="15%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)
              }
            />
            <Bar dataKey="vendas" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="custos" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="lucro" stackId="a" fill="#eab308" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
