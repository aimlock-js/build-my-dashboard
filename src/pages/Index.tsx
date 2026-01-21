import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { OrderSummary } from "@/components/dashboard/OrderSummary";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { VisitorsCard } from "@/components/dashboard/VisitorsCard";
import { QuickLinks } from "@/components/dashboard/QuickLinks";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Order Summary */}
          <OrderSummary />

          {/* Section Title - Métricas */}
          <h2 className="text-base font-semibold text-foreground mb-4">Métricas do Período</h2>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Vendas Totais"
              value="R$ 89.450,00"
              description="Valor total movimentado na loja, sem custos"
              change={{ value: "+18,5%", isPositive: true }}
              index={0}
            />
            <MetricCard
              title="Lucro Líquido"
              value="R$ 38.240,00"
              description="Lucro após dedução de todos os custos"
              change={{ value: "+22,3%", isPositive: true }}
              index={1}
            />
            <MetricCard
              title="Ordens Concluídas"
              value="156"
              description="Total de ordens finalizadas no período"
              change={{ value: "+24", isPositive: true }}
              index={2}
            />
            <MetricCard
              title="Margem de Lucro"
              value="42,7%"
              description="Percentual de lucro sobre vendas"
              change={{ value: "+3,2%", isPositive: true }}
              index={3}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <VisitorsCard />
          </div>

          {/* Quick Links */}
          <QuickLinks />
        </main>
      </div>
    </div>
  );
};

export default Index;
