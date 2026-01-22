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

          {/* Metrics Row 1 - Financial */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Receita Bruta"
              value="R$ 127.850"
              description="Faturamento total antes de deduções"
              change={{ value: "+18,5%", isPositive: true }}
              index={0}
            />
            <MetricCard
              title="Lucro Líquido"
              value="R$ 48.240"
              description="Resultado após custos e impostos"
              change={{ value: "+22,3%", isPositive: true }}
              index={1}
            />
            <MetricCard
              title="Margem de Lucro"
              value="37,7%"
              description="Eficiência da operação"
              change={{ value: "+3,2%", isPositive: true }}
              index={2}
            />
            <MetricCard
              title="Custo Operacional"
              value="R$ 79.610"
              description="Despesas totais do período"
              change={{ value: "-5,4%", isPositive: true }}
              index={3}
            />
          </div>

          {/* Metrics Row 2 - Operational */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Ordens de Serviço"
              value="186"
              description="Total de OS abertas no período"
              change={{ value: "+24", isPositive: true }}
              index={4}
            />
            <MetricCard
              title="Ticket Médio"
              value="R$ 687,50"
              description="Valor médio por serviço"
              change={{ value: "+12,8%", isPositive: true }}
              index={5}
            />
            <MetricCard
              title="Taxa de Conversão"
              value="78,4%"
              description="Orçamentos convertidos em OS"
              change={{ value: "+5,6%", isPositive: true }}
              index={6}
            />
            <MetricCard
              title="Tempo Médio"
              value="2.4 dias"
              description="Prazo médio de conclusão"
              change={{ value: "-0.3d", isPositive: true }}
              index={7}
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
