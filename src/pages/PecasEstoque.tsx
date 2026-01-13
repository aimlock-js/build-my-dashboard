import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Filter, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react";
import { motion } from "framer-motion";

const pecas = [
  { 
    id: "PEC-001", 
    nome: "Óleo Motor 10W40 1L", 
    categoria: "Lubrificantes",
    estoque: 45,
    estoqueMin: 20,
    estoqueMax: 100,
    custo: 32.50,
    venda: 55.00,
    fornecedor: "Castrol"
  },
  { 
    id: "PEC-002", 
    nome: "Kit Relação CG 160", 
    categoria: "Transmissão",
    estoque: 8,
    estoqueMin: 10,
    estoqueMax: 30,
    custo: 89.00,
    venda: 145.00,
    fornecedor: "Cofap"
  },
  { 
    id: "PEC-003", 
    nome: "Pastilha Freio Dianteira CB 300", 
    categoria: "Freios",
    estoque: 24,
    estoqueMin: 15,
    estoqueMax: 50,
    custo: 45.00,
    venda: 85.00,
    fornecedor: "Cobreq"
  },
  { 
    id: "PEC-004", 
    nome: "Pneu Traseiro 130/70-17", 
    categoria: "Pneus",
    estoque: 3,
    estoqueMin: 5,
    estoqueMax: 20,
    custo: 280.00,
    venda: 420.00,
    fornecedor: "Pirelli"
  },
  { 
    id: "PEC-005", 
    nome: "Filtro de Ar Fazer 250", 
    categoria: "Filtros",
    estoque: 18,
    estoqueMin: 10,
    estoqueMax: 40,
    custo: 28.00,
    venda: 55.00,
    fornecedor: "Fram"
  },
  { 
    id: "PEC-006", 
    nome: "Corrente 520H 120L", 
    categoria: "Transmissão",
    estoque: 12,
    estoqueMin: 8,
    estoqueMax: 25,
    custo: 75.00,
    venda: 125.00,
    fornecedor: "RK"
  },
];

const PecasEstoque = () => {
  const estoqueStatus = (estoque: number, min: number, max: number) => {
    const percent = (estoque / max) * 100;
    if (estoque <= min) return { color: "bg-red-500", text: "Crítico", variant: "destructive" as const };
    if (percent < 40) return { color: "bg-amber-500", text: "Baixo", variant: "warning" as const };
    return { color: "bg-emerald-500", text: "Normal", variant: "success" as const };
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Peças e Estoque</h1>
              <p className="text-sm text-muted-foreground">Controle de peças, produtos e estoque da oficina</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <TrendingDown size={16} />
                Entrada
              </Button>
              <Button variant="outline" className="gap-2">
                <TrendingUp size={16} />
                Saída
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2">
                <Plus size={16} />
                Nova Peça
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total de Itens", value: "324", icon: Package, color: "text-foreground" },
              { label: "Valor em Estoque", value: "R$ 45.280", icon: TrendingUp, color: "text-emerald-600" },
              { label: "Estoque Crítico", value: "8", icon: AlertTriangle, color: "text-red-600" },
              { label: "Pedidos Pendentes", value: "3", icon: TrendingDown, color: "text-amber-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                        <stat.icon size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-6 border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      placeholder="Buscar peça por nome, código..." 
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Categoria
                </Button>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown size={16} />
                  Ordenar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pecas.map((peca, index) => {
              const status = estoqueStatus(peca.estoque, peca.estoqueMin, peca.estoqueMax);
              const percentEstoque = (peca.estoque / peca.estoqueMax) * 100;
              
              return (
                <motion.div
                  key={peca.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <Package size={18} className="text-orange-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{peca.nome}</p>
                            <p className="text-xs text-muted-foreground">{peca.categoria} • {peca.fornecedor}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Estoque</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{peca.estoque} un</span>
                            <Badge variant="outline" className={`text-[10px] ${
                              status.text === "Crítico" ? "bg-red-100 text-red-700 border-red-200" :
                              status.text === "Baixo" ? "bg-amber-100 text-amber-700 border-amber-200" :
                              "bg-emerald-100 text-emerald-700 border-emerald-200"
                            }`}>
                              {status.text}
                            </Badge>
                          </div>
                        </div>
                        
                        <Progress value={percentEstoque} className="h-2" />
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Min: {peca.estoqueMin}</span>
                          <span>Max: {peca.estoqueMax}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Custo</p>
                            <p className="text-sm font-medium">R$ {peca.custo.toFixed(2).replace('.', ',')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Venda</p>
                            <p className="text-sm font-semibold text-emerald-600">R$ {peca.venda.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PecasEstoque;
