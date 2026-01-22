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
          <h2 className="text-base font-semibold text-foreground mb-4">Indicadores de Performance</h2>

          {/* Metrics Row 1 - Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Receita Bruta"
              value="R$ 127.850"
              description="Faturamento total do período"
              change={{ value: "+18,5%", isPositive: true }}
              index={0}
            />
            <MetricCard
              title="Lucro Líquido"
              value="R$ 48.240"
              description="Resultado após despesas e impostos"
              change={{ value: "+22,3%", isPositive: true }}
              index={1}
            />
            <MetricCard
              title="Margem de Lucro"
              value="37,7%"
              description="Rentabilidade operacional"
              change={{ value: "+3,2pp", isPositive: true }}
              index={2}
            />
            <MetricCard
              title="CAC"
              value="R$ 89,50"
              description="Custo de aquisição por cliente"
              change={{ value: "-12,4%", isPositive: true }}
              index={3}
            />
          </div>

          {/* Metrics Row 2 - Operational KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Ordens de Serviço"
              value="186"
              description="Total de OS no período"
              change={{ value: "+24", isPositive: true }}
              index={4}
            />
            <MetricCard
              title="Ticket Médio"
              value="R$ 687,50"
              description="Receita média por serviço"
              change={{ value: "+12,8%", isPositive: true }}
              index={5}
            />
            <MetricCard
              title="Taxa de Conversão"
              value="78,4%"
              description="Orçamentos que viraram OS"
              change={{ value: "+5,6pp", isPositive: true }}
              index={6}
            />
            <MetricCard
              title="LTV"
              value="R$ 2.450"
              description="Valor vitalício do cliente"
              change={{ value: "+8,2%", isPositive: true }}
              index={7}
            />
          </div>

          {/* Metrics Row 3 - Performance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="NPS Score"
              value="72"
              description="Índice de satisfação do cliente"
              change={{ value: "+8", isPositive: true }}
              index={8}
            />
            <MetricCard
              title="Tempo Médio OS"
              value="2.4 dias"
              description="Prazo de conclusão de serviço"
              change={{ value: "-0.3d", isPositive: true }}
              index={9}
            />
            <MetricCard
              title="Churn Rate"
              value="2,8%"
              description="Taxa de perda de clientes"
              change={{ value: "-0,5pp", isPositive: true }}
              index={10}
            />
            <MetricCard
              title="MRR"
              value="R$ 32.400"
              description="Receita recorrente mensal"
              change={{ value: "+15,3%", isPositive: true }}
              index={11}
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
