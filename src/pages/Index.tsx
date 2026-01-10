import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DailyEvolutionChart } from "@/components/dashboard/DailyEvolutionChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { DollarSign, ShoppingCart, TrendingUp, Users, Clock, Package } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Resumo</h1>
          </div>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="VENDAS TOTAIS"
              value="R$ 80.317,20"
              change={{ value: "-41,9%", isPositive: false }}
              previousValue="R$ 138.209,15"
              accentColor="blue"
              icon={<DollarSign size={12} />}
            />
            <MetricCard
              title="LUCRO LÍQUIDO"
              value="R$ 34.330,28"
              change={{ value: "-51,1%", isPositive: false }}
              previousValue="R$ 70.178,66"
              accentColor="green"
              icon={<TrendingUp size={12} />}
            />
            <MetricCard
              title="ORDENS CONCLUÍDAS"
              value="129"
              change={{ value: "-71 ordens", isPositive: false }}
              previousValue="200"
              accentColor="yellow"
              icon={<Package size={12} />}
            />
            <MetricCard
              title="MARGEM DE LUCRO"
              value="42,7%"
              change={{ value: "+8%", isPositive: true }}
              previousValue="50,8%"
              accentColor="purple"
              icon={<TrendingUp size={12} />}
            />
          </div>

          {/* Second Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="CUSTOS"
              value="R$ 45.986,92"
              change={{ value: "-32,4%", isPositive: true }}
              previousValue="R$ 68.011,49"
              accentColor="blue"
              icon={<ShoppingCart size={12} />}
            />
            <MetricCard
              title="TICKET MÉDIO"
              value="R$ 622,61"
              change={{ value: "-9,9%", isPositive: false }}
              previousValue="R$ 691,04"
              accentColor="green"
              icon={<DollarSign size={12} />}
            />
            <MetricCard
              title="TEMPO MÉDIO OS"
              value="1,0 dias"
              change={{ value: "-44,4%", isPositive: true }}
              previousValue="1,8 dias"
              accentColor="yellow"
              icon={<Clock size={12} />}
            />
            <MetricCard
              title="NOVOS CLIENTES"
              value="87"
              change={{ value: "-39%", isPositive: false }}
              previousValue="146"
              accentColor="purple"
              icon={<Users size={12} />}
            />
          </div>

          {/* Chart and Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DailyEvolutionChart />
            </div>
            
            <div className="space-y-4">
              <SummaryCard
                label="Vendas"
                value="R$ 80.317,20"
                change={{ value: "-41,9%", isPositive: false }}
                icon={<DollarSign size={20} className="text-success" />}
                iconBg="bg-success/10"
              />
              <SummaryCard
                label="Custo"
                value="R$ 45.986,92"
                change={{ value: "-32,4%", isPositive: true }}
                icon={<ShoppingCart size={20} className="text-info" />}
                iconBg="bg-info/10"
              />
              <SummaryCard
                label="Retorno"
                value="R$ 34.330,28"
                change={{ value: "-51,1%", isPositive: false }}
                icon={<TrendingUp size={20} className="text-warning" />}
                iconBg="bg-warning/10"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
