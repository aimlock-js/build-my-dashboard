import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  FileText, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  Wrench,
  DollarSign,
  Package,
  Bike,
  PieChart,
  LineChart
} from "lucide-react";
import { motion } from "framer-motion";

const relatorios = [
  { 
    id: 1, 
    titulo: "Faturamento Mensal", 
    descricao: "Análise detalhada de receitas e despesas",
    icon: DollarSign,
    categoria: "Financeiro",
    ultimaGeracao: "10/01/2024"
  },
  { 
    id: 2, 
    titulo: "Ordens de Serviço", 
    descricao: "Relatório de OS por período, status e mecânico",
    icon: Wrench,
    categoria: "Operacional",
    ultimaGeracao: "09/01/2024"
  },
  { 
    id: 3, 
    titulo: "Movimentação de Estoque", 
    descricao: "Entradas, saídas e giro de peças",
    icon: Package,
    categoria: "Estoque",
    ultimaGeracao: "08/01/2024"
  },
  { 
    id: 4, 
    titulo: "Clientes por Período", 
    descricao: "Novos clientes, recorrência e ticket médio",
    icon: Users,
    categoria: "Comercial",
    ultimaGeracao: "10/01/2024"
  },
  { 
    id: 5, 
    titulo: "Veículos Atendidos", 
    descricao: "Motos por marca, modelo e tipo de serviço",
    icon: Bike,
    categoria: "Operacional",
    ultimaGeracao: "07/01/2024"
  },
  { 
    id: 6, 
    titulo: "Performance de Mecânicos", 
    descricao: "Produtividade, tempo médio e qualidade",
    icon: TrendingUp,
    categoria: "RH",
    ultimaGeracao: "05/01/2024"
  },
  { 
    id: 7, 
    titulo: "Análise de Lucro", 
    descricao: "Margem por serviço e categoria de peça",
    icon: PieChart,
    categoria: "Financeiro",
    ultimaGeracao: "10/01/2024"
  },
  { 
    id: 8, 
    titulo: "Tendências e Projeções", 
    descricao: "Previsões baseadas em histórico",
    icon: LineChart,
    categoria: "Estratégico",
    ultimaGeracao: "01/01/2024"
  },
];

const categoriaColors: Record<string, string> = {
  "Financeiro": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Operacional": "bg-blue-100 text-blue-700 border-blue-200",
  "Estoque": "bg-amber-100 text-amber-700 border-amber-200",
  "Comercial": "bg-purple-100 text-purple-700 border-purple-200",
  "RH": "bg-pink-100 text-pink-700 border-pink-200",
  "Estratégico": "bg-slate-100 text-slate-700 border-slate-200",
};

const Relatorios = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
              <p className="text-sm text-muted-foreground">Gere e exporte relatórios do sistema</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Período
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Relatórios Gerados", value: "124", sublabel: "Este mês", icon: FileText },
              { label: "Downloads", value: "89", sublabel: "Este mês", icon: Download },
              { label: "Relatórios Agendados", value: "5", sublabel: "Ativos", icon: Calendar },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <stat.icon size={24} className="text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {relatorios.map((relatorio, index) => (
              <motion.div
                key={relatorio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50 hover:shadow-md transition-all hover:border-orange-500/30 cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform">
                        <relatorio.icon size={20} className="text-orange-500" />
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${categoriaColors[relatorio.categoria]}`}>
                        {relatorio.categoria}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-1">{relatorio.titulo}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{relatorio.descricao}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-[11px] text-muted-foreground">
                        Última: {relatorio.ultimaGeracao}
                      </span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-500/10">
                        <Download size={12} />
                        Gerar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
