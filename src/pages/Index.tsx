import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DailyEvolutionChart } from "@/components/dashboard/DailyEvolutionChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { DollarSign, ShoppingCart, TrendingUp, Users, Clock, Package } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Quick Actions */}
          <QuickActions />

          {/* Status Overview */}
          <StatusOverview />

          {/* Section Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Métricas do Período</h2>
              <p className="text-xs text-muted-foreground">Comparativo com período anterior</p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline">
              Ver relatório completo
            </button>
          </div>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Vendas Totais"
              value="R$ 80.317,20"
              change={{ value: "-41,9%", isPositive: false }}
              previousValue="R$ 138.209,15"
              accentColor="blue"
              icon={<DollarSign size={18} />}
              index={0}
            />
            <MetricCard
              title="Lucro Líquido"
              value="R$ 34.330,28"
              change={{ value: "-51,1%", isPositive: false }}
              previousValue="R$ 70.178,66"
              accentColor="green"
              icon={<TrendingUp size={18} />}
              index={1}
            />
            <MetricCard
              title="Ordens Concluídas"
              value="129"
              change={{ value: "-71", isPositive: false }}
              previousValue="200"
              accentColor="yellow"
              icon={<Package size={18} />}
              index={2}
            />
            <MetricCard
              title="Margem de Lucro"
              value="42,7%"
              change={{ value: "+8%", isPositive: true }}
              previousValue="50,8%"
              accentColor="purple"
              icon={<TrendingUp size={18} />}
              index={3}
            />
          </div>

          {/* Second Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Custos"
              value="R$ 45.986,92"
              change={{ value: "-32,4%", isPositive: true }}
              previousValue="R$ 68.011,49"
              accentColor="blue"
              icon={<ShoppingCart size={18} />}
              index={4}
            />
            <MetricCard
              title="Ticket Médio"
              value="R$ 622,61"
              change={{ value: "-9,9%", isPositive: false }}
              previousValue="R$ 691,04"
              accentColor="green"
              icon={<DollarSign size={18} />}
              index={5}
            />
            <MetricCard
              title="Tempo Médio OS"
              value="1,0 dias"
              change={{ value: "-44,4%", isPositive: true }}
              previousValue="1,8 dias"
              accentColor="yellow"
              icon={<Clock size={18} />}
              index={6}
            />
            <MetricCard
              title="Novos Clientes"
              value="87"
              change={{ value: "-39%", isPositive: false }}
              previousValue="146"
              accentColor="purple"
              icon={<Users size={18} />}
              index={7}
            />
          </div>

          {/* Chart and Summary Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="xl:col-span-2">
              <DailyEvolutionChart />
            </div>
            
            <div className="space-y-3">
              <SummaryCard
                label="Vendas"
                value="R$ 80.317,20"
                change={{ value: "-41,9%", isPositive: false }}
                icon={<DollarSign size={22} className="text-success" />}
                iconBg="bg-success/10"
                index={0}
              />
              <SummaryCard
                label="Custo"
                value="R$ 45.986,92"
                change={{ value: "-32,4%", isPositive: true }}
                icon={<ShoppingCart size={22} className="text-info" />}
                iconBg="bg-info/10"
                index={1}
              />
              <SummaryCard
                label="Retorno"
                value="R$ 34.330,28"
                change={{ value: "-51,1%", isPositive: false }}
                icon={<TrendingUp size={22} className="text-warning" />}
                iconBg="bg-warning/10"
                index={2}
              />
            </div>
          </div>

          {/* Bottom Section - 3 Columns */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <TopProducts />
            <RecentActivity />
            <NotificationPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;