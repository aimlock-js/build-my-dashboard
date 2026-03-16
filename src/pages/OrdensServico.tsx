import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Bike,
  Settings2,
  Calendar,
  ChevronRight,
  TrendingUp
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
  aguardando: { label: "Aguardando", color: "bg-muted-foreground/10 text-muted-foreground", icon: Clock, dot: "bg-muted-foreground" },
  em_andamento: { label: "Em Andamento", color: "bg-info/10 text-info", icon: Wrench, dot: "bg-info" },
  aguardando_peca: { label: "Aguard. Peça", color: "bg-warning/10 text-warning", icon: AlertCircle, dot: "bg-warning" },
  concluida: { label: "Concluída", color: "bg-success/10 text-success", icon: CheckCircle2, dot: "bg-success" },
};

const statusTabs = [
  { key: null, label: "Todas" },
  { key: "em_andamento", label: "Em Andamento", dot: "bg-info" },
  { key: "aguardando", label: "Aguardando", dot: "bg-muted-foreground" },
  { key: "aguardando_peca", label: "Aguard. Peça", dot: "bg-warning" },
  { key: "concluida", label: "Concluídas", dot: "bg-success" },
];

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

  const counts = {
    total: ordensServico.length,
    em_andamento: ordensServico.filter(os => os.status === "em_andamento").length,
    aguardando: ordensServico.filter(os => os.status === "aguardando").length,
    aguardando_peca: ordensServico.filter(os => os.status === "aguardando_peca").length,
    concluida: ordensServico.filter(os => os.status === "concluida").length,
  };

  const activeFiltersCount =
    (mecanicoFilter ? 1 : 0) + (valorMin ? 1 : 0) + (valorMax ? 1 : 0);

  const handleOpenFilters = () => {
    setDraftMecanico(mecanicoFilter);
    setDraftValorMin(valorMin);
    setDraftValorMax(valorMax);
    setFiltersOpen(true);
  };

  const handleApplyFilters = () => {
    setMecanicoFilter(draftMecanico);
    setValorMin(draftValorMin);
    setValorMax(draftValorMax);
    setFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setDraftMecanico(null);
    setDraftValorMin("");
    setDraftValorMax("");
    setStatusFilter(null);
    setMecanicoFilter(null);
    setValorMin("");
    setValorMax("");
    setFiltersOpen(false);
  };

  const totalValor = ordensServico
    .filter(os => os.status !== "concluida")
    .reduce((sum, os) => sum + os.valor, 0);

  const stats = [
    { 
      label: "Em aberto", 
      value: counts.total - counts.concluida, 
      icon: Wrench, 
      accent: "text-primary",
      bgAccent: "bg-primary/8",
      borderAccent: "border-primary/15",
    },
    { 
      label: "Em andamento", 
      value: counts.em_andamento, 
      icon: Clock, 
      accent: "text-info",
      bgAccent: "bg-info/8",
      borderAccent: "border-info/15",
    },
    { 
      label: "Aguard. peça", 
      value: counts.aguardando_peca, 
      icon: AlertCircle, 
      accent: "text-warning",
      bgAccent: "bg-warning/8",
      borderAccent: "border-warning/15",
    },
    { 
      label: "Concluídas", 
      value: counts.concluida, 
      icon: CheckCircle2, 
      accent: "text-success",
      bgAccent: "bg-success/8",
      borderAccent: "border-success/15",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                Ordens de Serviço
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{counts.total} ordens</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-primary font-medium">{counts.total - counts.concluida} em aberto</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-success" />
                  R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setServicoModalOpen(true)}
                className="h-9 px-3 border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50 transition-all"
              >
                <Settings2 size={14} className="mr-1.5" />
                Serviços
              </Button>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus size={15} strokeWidth={2.5} />
                Criar OS
              </motion.button>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={`group relative rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${stat.borderAccent} hover:border-border`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg ${stat.bgAccent} flex items-center justify-center`}>
                    <stat.icon size={15} className={stat.accent} strokeWidth={2} />
                  </div>
                  {stat.value > 0 && (
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${stat.accent} opacity-60`}>
                      ativo
                    </span>
                  )}
                </div>
                <p className={`text-2xl font-bold tracking-tight leading-none mb-1 ${stat.accent}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mb-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={15} />
                <Input
                  placeholder="Buscar por OS, cliente, placa ou moto..."
                  className="pl-9 h-9 bg-card border-border/40 text-sm placeholder:text-muted-foreground/40 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenFilters}
                className="h-9 px-3 border-border/40 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/40 transition-all"
              >
                <Filter size={13} className="mr-1.5" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-muted/30 w-fit">
              {statusTabs.map((tab) => {
                const isActive = statusFilter === tab.key;
                const count = tab.key ? counts[tab.key as keyof typeof counts] : counts.total;
                return (
                  <button
                    key={tab.key ?? "all"}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`
                      relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                      ${isActive 
                        ? "bg-card text-foreground shadow-sm shadow-black/10" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {tab.dot && (
                      <span className={`w-1.5 h-1.5 rounded-full ${tab.dot} ${isActive ? '' : 'opacity-50'}`} />
                    )}
                    {tab.label}
                    <span className={`text-[10px] tabular-nums ${isActive ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Sheet */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="right" className="w-[380px] sm:max-w-[380px] bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-base font-semibold">Filtros avançados</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Refine a lista de ordens de serviço
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Mecânico</Label>
                  <Select
                    value={draftMecanico ?? "all"}
                    onValueChange={(v) => setDraftMecanico(v === "all" ? null : v)}
                  >
                    <SelectTrigger className="h-10 bg-background/50">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os mecânicos</SelectItem>
                      {mecanicos.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Faixa de valor (R$)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      inputMode="decimal"
                      placeholder="Min"
                      className="h-10 bg-background/50"
                      value={draftValorMin}
                      onChange={(e) => setDraftValorMin(e.target.value)}
                    />
                    <Input
                      inputMode="decimal"
                      placeholder="Max"
                      className="h-10 bg-background/50"
                      value={draftValorMax}
                      onChange={(e) => setDraftValorMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-8 gap-2">
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="flex-1">
                  Limpar tudo
                </Button>
                <Button size="sm" onClick={handleApplyFilters} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Aplicar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-xl border border-border/40 bg-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/20">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Ordem</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Cliente / Veículo</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Serviço</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Mecânico</th>
                    <th className="text-right px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Valor</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">Previsão</th>
                    <th className="w-10 px-2 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <AnimatePresence mode="popLayout">
                    {filteredOrdens.map((os, index) => {
                      const statusStyle = statusConfig[os.status as keyof typeof statusConfig] || statusConfig.aguardando;
                      return (
                        <motion.tr 
                          key={os.id}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 4 }}
                          transition={{ delay: index * 0.03, duration: 0.25 }}
                          className="group hover:bg-muted/20 transition-colors duration-150 cursor-pointer"
                        >
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-xs font-semibold text-primary/80 tracking-wide">{os.id}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0 ring-1 ring-border/30">
                                <span className="text-[11px] font-bold text-muted-foreground">
                                  {os.cliente.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">{os.cliente}</p>
                                <p className="text-[11px] text-muted-foreground/60 truncate flex items-center gap-1 mt-0.5">
                                  <Bike size={10} />
                                  {os.moto} · <span className="font-mono">{os.placa}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-sm text-foreground/70">{os.servico}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${statusStyle.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                              {statusStyle.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-sm text-muted-foreground">
                              {os.mecanico === "-" ? (
                                <span className="text-muted-foreground/40 italic text-xs">Não atribuído</span>
                              ) : os.mecanico}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="text-sm font-semibold text-foreground tabular-nums">
                              R$ {os.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 text-muted-foreground/60">
                              <Calendar size={11} />
                              <span className="text-[11px] tabular-nums">{os.previsao}</span>
                            </div>
                          </td>
                          <td className="px-2 py-3.5">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted/50 transition-all">
                              <ChevronRight size={14} className="text-muted-foreground" />
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredOrdens.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                    <Search size={18} className="text-muted-foreground/50" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 mb-1">Nenhuma ordem encontrada</p>
                  <p className="text-xs text-muted-foreground/60 mb-5 max-w-[240px]">
                    Tente ajustar os filtros ou crie uma nova ordem de serviço
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => setModalOpen(true)} 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus size={14} className="mr-1.5" />
                    Criar OS
                  </Button>
                </div>
              )}
            </div>

            {/* Table Footer */}
            {filteredOrdens.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 bg-muted/10">
                <p className="text-[11px] text-muted-foreground/60">
                  Exibindo <span className="text-foreground/70 font-medium">{filteredOrdens.length}</span> de {ordensServico.length} ordens
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  Total: <span className="font-semibold text-foreground tabular-nums">
                    R$ {filteredOrdens.reduce((s, os) => s + os.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            )}
          </motion.div>
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
