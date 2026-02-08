import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  User,
  Bike,
  Settings2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NovaOSModal, OrdemServico } from "@/components/modals/NovaOSModal";
import { CadastroServicoModal } from "@/components/modals/CadastroServicoModal";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialOrdensServico: OrdemServico[] = [
  { 
    id: "OS-2024-001", 
    cliente: "João Silva", 
    moto: "Honda CG 160 Titan", 
    placa: "ABC-1234",
    servico: "Troca de Kit Relação", 
    status: "em_andamento", 
    mecanico: "Carlos",
    valor: 450.00,
    dataEntrada: "10/01/2024",
    previsao: "12/01/2024"
  },
  { 
    id: "OS-2024-002", 
    cliente: "Maria Santos", 
    moto: "Yamaha Fazer 250", 
    placa: "XYZ-5678",
    servico: "Revisão Completa 10.000km", 
    status: "aguardando_peca", 
    mecanico: "Roberto",
    valor: 680.00,
    dataEntrada: "09/01/2024",
    previsao: "14/01/2024"
  },
  { 
    id: "OS-2024-003", 
    cliente: "Pedro Oliveira", 
    moto: "Honda CB 300R", 
    placa: "DEF-9012",
    servico: "Troca de Pneus", 
    status: "concluida", 
    mecanico: "Carlos",
    valor: 890.00,
    dataEntrada: "08/01/2024",
    previsao: "08/01/2024"
  },
  { 
    id: "OS-2024-004", 
    cliente: "Ana Costa", 
    moto: "Kawasaki Ninja 400", 
    placa: "GHI-3456",
    servico: "Diagnóstico Injeção", 
    status: "aguardando", 
    mecanico: "-",
    valor: 150.00,
    dataEntrada: "11/01/2024",
    previsao: "11/01/2024"
  },
  { 
    id: "OS-2024-005", 
    cliente: "Lucas Mendes", 
    moto: "BMW G 310 R", 
    placa: "JKL-7890",
    servico: "Troca de Óleo + Filtros", 
    status: "em_andamento", 
    mecanico: "Roberto",
    valor: 320.00,
    dataEntrada: "10/01/2024",
    previsao: "10/01/2024"
  },
];

const statusConfig = {
  aguardando: { label: "Aguardando", color: "status-muted", icon: Clock },
  em_andamento: { label: "Em Andamento", color: "status-info", icon: Wrench },
  aguardando_peca: { label: "Aguard. Peça", color: "status-warning", icon: AlertCircle },
  concluida: { label: "Concluída", color: "status-success", icon: CheckCircle2 },
};

const OrdensServico = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>(initialOrdensServico);
  const [modalOpen, setModalOpen] = useState(false);
  const [servicoModalOpen, setServicoModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [mecanicoFilter, setMecanicoFilter] = useState<string | null>(null);
  const [valorMin, setValorMin] = useState<string>("");
  const [valorMax, setValorMax] = useState<string>("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState<string | null>(null);
  const [draftMecanico, setDraftMecanico] = useState<string | null>(null);
  const [draftValorMin, setDraftValorMin] = useState<string>("");
  const [draftValorMax, setDraftValorMax] = useState<string>("");
  
  const servicos = [
    { id: "serv-1", nome: "Troca de Óleo", valorBase: 80, tempoEstimado: "30min" },
    { id: "serv-2", nome: "Troca de Kit Relação", valorBase: 450, tempoEstimado: "2h" },
    { id: "serv-3", nome: "Revisão Completa 10.000km", valorBase: 680, tempoEstimado: "4h" },
    { id: "serv-4", nome: "Troca de Pneus", valorBase: 350, tempoEstimado: "1h" },
    { id: "serv-5", nome: "Balanceamento", valorBase: 60, tempoEstimado: "30min" },
    { id: "serv-6", nome: "Troca de Pastilhas de Freio", valorBase: 180, tempoEstimado: "1h" },
    { id: "serv-7", nome: "Diagnóstico Injeção", valorBase: 150, tempoEstimado: "1h" },
    { id: "serv-8", nome: "Troca de Filtro de Ar", valorBase: 100, tempoEstimado: "30min" },
  ];

  const handleSaveOS = (novaOS: OrdemServico) => {
    setOrdensServico([novaOS, ...ordensServico]);
  };

  const mecanicos = Array.from(
    new Set(ordensServico.map((os) => os.mecanico).filter((m) => m && m !== "-")),
  ).sort();

  const filteredOrdens = ordensServico.filter(os => {
    const matchesSearch = os.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.moto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || os.status === statusFilter;

    const matchesMecanico = !mecanicoFilter || os.mecanico === mecanicoFilter;

    const min = valorMin ? Number(valorMin.replace(",", ".")) : null;
    const max = valorMax ? Number(valorMax.replace(",", ".")) : null;
    const matchesValor =
      (min === null || Number.isNaN(min) || os.valor >= min) &&
      (max === null || Number.isNaN(max) || os.valor <= max);
    
    return matchesSearch && matchesStatus && matchesMecanico && matchesValor;
  });

  const stats = [
    { 
      label: "Total Abertas", 
      value: ordensServico.filter(os => os.status !== "concluida").length,
      trend: "+12%",
      trendUp: true,
      icon: Wrench,
      color: "text-foreground",
      bgColor: "bg-muted"
    },
    { 
      label: "Em Andamento", 
      value: ordensServico.filter(os => os.status === "em_andamento").length,
      trend: "+5%",
      trendUp: true,
      icon: Clock,
      color: "text-info",
      bgColor: "bg-info/10"
    },
    { 
      label: "Aguard. Peças", 
      value: ordensServico.filter(os => os.status === "aguardando_peca").length,
      trend: "-2%",
      trendUp: false,
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    { 
      label: "Concluídas", 
      value: ordensServico.filter(os => os.status === "concluida").length,
      trend: "+18%",
      trendUp: true,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10"
    },
  ];

  const activeFiltersCount =
    (statusFilter ? 1 : 0) + (mecanicoFilter ? 1 : 0) + (valorMin ? 1 : 0) + (valorMax ? 1 : 0);

  const handleOpenFilters = () => {
    setDraftStatus(statusFilter);
    setDraftMecanico(mecanicoFilter);
    setDraftValorMin(valorMin);
    setDraftValorMax(valorMax);
    setFiltersOpen(true);
  };

  const handleApplyFilters = () => {
    setStatusFilter(draftStatus);
    setMecanicoFilter(draftMecanico);
    setValorMin(draftValorMin);
    setValorMax(draftValorMax);
    setFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setDraftStatus(null);
    setDraftMecanico(null);
    setDraftValorMin("");
    setDraftValorMax("");

    setStatusFilter(null);
    setMecanicoFilter(null);
    setValorMin("");
    setValorMax("");
    setFiltersOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Ordens de Serviço</h1>
              <p className="text-sm text-muted-foreground">Gerencie todas as ordens de serviço da oficina</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setServicoModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted/50 text-sm font-medium text-foreground transition-colors"
              >
                <Settings2 size={16} className="text-muted-foreground" />
                Gerenciar Serviços
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold shadow-lg glow-primary-subtle hover:glow-primary transition-all"
              >
                <Plus size={16} />
                Nova OS
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="premium-card group cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon size={18} className={stat.color} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                        {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="premium-card mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Buscar por OS, cliente, placa ou moto..."
                      className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted/50 text-sm font-medium text-foreground transition-colors"
                  >
                    <Filter size={16} className="text-muted-foreground" />
                    Filtros
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="right" className="w-[400px] sm:max-w-[400px] bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Filtros</SheetTitle>
                <SheetDescription className="text-muted-foreground">Refine a lista de ordens de serviço</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={draftStatus ?? "all"}
                    onValueChange={(v) => setDraftStatus(v === "all" ? null : v)}
                  >
                    <SelectTrigger className="h-11 bg-background/50">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="aguardando">Aguardando</SelectItem>
                      <SelectItem value="em_andamento">Em andamento</SelectItem>
                      <SelectItem value="aguardando_peca">Aguardando peça</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mecânico</Label>
                  <Select
                    value={draftMecanico ?? "all"}
                    onValueChange={(v) => setDraftMecanico(v === "all" ? null : v)}
                  >
                    <SelectTrigger className="h-11 bg-background/50">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os mecânicos</SelectItem>
                      {mecanicos.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Faixa de valor (R$)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      inputMode="decimal"
                      placeholder="Mínimo"
                      className="h-11 bg-background/50"
                      value={draftValorMin}
                      onChange={(e) => setDraftValorMin(e.target.value)}
                    />
                    <Input
                      inputMode="decimal"
                      placeholder="Máximo"
                      className="h-11 bg-background/50"
                      value={draftValorMax}
                      onChange={(e) => setDraftValorMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-8 gap-3">
                <Button variant="outline" onClick={handleClearFilters} className="flex-1">
                  Limpar
                </Button>
                <Button onClick={handleApplyFilters} className="flex-1 gradient-primary text-white hover:opacity-90">
                  Aplicar Filtros
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Orders Table */}
          <Card className="premium-card overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary-subtle flex items-center justify-center">
                  <Sparkles size={14} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Lista de Ordens</h3>
                  <p className="text-xs text-muted-foreground">{filteredOrdens.length} ordens encontradas</p>
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">OS</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Cliente / Moto</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Serviço</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Mecânico</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Previsão</th>
                      <th className="text-left p-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredOrdens.map((os, index) => {
                        const StatusIcon = statusConfig[os.status as keyof typeof statusConfig]?.icon || Clock;
                        const statusStyle = statusConfig[os.status as keyof typeof statusConfig] || statusConfig.aguardando;
                        return (
                          <motion.tr 
                            key={os.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="border-b border-border/30 table-row-hover group"
                          >
                            <td className="p-4">
                              <span className="font-mono text-sm font-semibold text-primary">{os.id}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <Bike size={18} className="text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm text-foreground">{os.cliente}</p>
                                  <p className="text-xs text-muted-foreground">{os.moto} • {os.placa}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-sm text-foreground">{os.servico}</span>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className={`gap-1.5 px-2.5 py-1 text-xs font-medium ${statusStyle.color}`}>
                                <StatusIcon size={12} />
                                {statusStyle.label}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                  <User size={12} className="text-muted-foreground" />
                                </div>
                                <span className="text-sm text-foreground">{os.mecanico}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-sm text-foreground">
                                R$ {os.valor.toFixed(2).replace('.', ',')}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="text-sm text-muted-foreground">{os.previsao}</span>
                            </td>
                            <td className="p-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <MoreHorizontal size={16} className="text-muted-foreground" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>

                {filteredOrdens.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Search size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Nenhuma ordem encontrada</h3>
                    <p className="text-sm text-muted-foreground mb-4">Tente ajustar os filtros ou criar uma nova OS</p>
                    <Button onClick={() => setModalOpen(true)} className="gradient-primary text-white">
                      <Plus size={16} className="mr-2" />
                      Criar Nova OS
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <NovaOSModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        onSave={handleSaveOS}
        servicos={servicos}
      />

      <CadastroServicoModal
        open={servicoModalOpen}
        onOpenChange={setServicoModalOpen}
      />
    </div>
  );
};

export default OrdensServico;