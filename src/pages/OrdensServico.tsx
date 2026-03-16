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
  Calendar,
  Hash,
  ChevronRight
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
  aguardando: { label: "Aguardando", color: "status-muted", icon: Clock, dot: "bg-muted-foreground" },
  em_andamento: { label: "Em Andamento", color: "status-info", icon: Wrench, dot: "bg-info" },
  aguardando_peca: { label: "Aguard. Peça", color: "status-warning", icon: AlertCircle, dot: "bg-warning" },
  concluida: { label: "Concluída", color: "status-success", icon: CheckCircle2, dot: "bg-success" },
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

  const totalValor = ordensServico
    .filter(os => os.status !== "concluida")
    .reduce((sum, os) => sum + os.valor, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header — clean hierarchy */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Ordens de Serviço
              </h1>
              <p className="text-sm text-muted-foreground">
                {counts.total} ordens · {counts.total - counts.concluida} em aberto · R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} pendente
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setServicoModalOpen(true)}
                className="h-9 px-3 text-muted-foreground hover:text-foreground"
              >
                <Settings2 size={15} className="mr-1.5" />
                Serviços
              </Button>
              <Button
                size="sm"
                onClick={() => setModalOpen(true)}
                className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus size={15} className="mr-1.5" />
                Criar OS
              </Button>
            </div>
          </div>

          {/* Compact Stats Row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Em aberto", value: counts.total - counts.concluida, icon: Wrench, accent: "text-foreground" },
              { label: "Em andamento", value: counts.em_andamento, icon: Clock, accent: "text-info" },
              { label: "Aguard. peça", value: counts.aguardando_peca, icon: AlertCircle, accent: "text-warning" },
              { label: "Concluídas", value: counts.concluida, icon: CheckCircle2, accent: "text-success" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
                    <stat.icon size={16} className={stat.accent} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xl font-bold leading-none mb-0.5 ${stat.accent}`}>{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground font-medium truncate">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search + Status Tabs + Filters — unified toolbar */}
          <div className="mb-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <Input
                  placeholder="Buscar OS, cliente, placa..."
                  className="pl-9 h-9 bg-card border-border/50 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenFilters}
                className="h-9 px-3 text-muted-foreground hover:text-foreground shrink-0"
              >
                <Filter size={14} className="mr-1.5" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Status tabs — quick filter */}
            <div className="flex items-center gap-1">
              {statusTabs.map((tab) => {
                const isActive = statusFilter === tab.key;
                const count = tab.key ? counts[tab.key as keyof typeof counts] : counts.total;
                return (
                  <button
                    key={tab.key ?? "all"}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`
                      relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    {tab.dot && (
                      <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
                    )}
                    {tab.label}
                    <span className={`text-[10px] ${isActive ? "text-primary/70" : "text-muted-foreground/60"}`}>
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

          {/* Orders Table */}
          <Card className="bg-card border border-border/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Hash size={11} />
                        Ordem
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Cliente</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Serviço</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Mecânico</th>
                    <th className="text-right px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Previsão</th>
                    <th className="w-10 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredOrdens.map((os, index) => {
                      const statusStyle = statusConfig[os.status as keyof typeof statusConfig] || statusConfig.aguardando;
                      return (
                        <motion.tr 
                          key={os.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="border-b border-border/30 group hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-xs font-semibold text-primary">{os.id}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
                                <Bike size={14} className="text-muted-foreground" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{os.cliente}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{os.moto} · {os.placa}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-sm text-foreground/80">{os.servico}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium ${statusStyle.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                              {statusStyle.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-sm text-muted-foreground">{os.mecanico}</span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="text-sm font-semibold text-foreground tabular-nums">
                              R$ {os.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar size={12} />
                              <span className="text-xs">{os.previsao}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                              <ChevronRight size={14} className="text-muted-foreground" />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredOrdens.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                    <Search size={20} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Nenhuma ordem encontrada</p>
                  <p className="text-xs text-muted-foreground mb-4">Ajuste os filtros ou crie uma nova OS</p>
                  <Button size="sm" onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus size={14} className="mr-1.5" />
                    Criar OS
                  </Button>
                </div>
              )}
            </div>

            {/* Table Footer */}
            {filteredOrdens.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  {filteredOrdens.length} de {ordensServico.length} ordens
                </p>
                <p className="text-xs text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">R$ {filteredOrdens.reduce((s, os) => s + os.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </p>
              </div>
            )}
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
