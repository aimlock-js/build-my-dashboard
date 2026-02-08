import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Settings2
} from "lucide-react";
import { motion } from "framer-motion";
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
  aguardando: { label: "Aguardando", color: "bg-slate-100 text-slate-700 border-slate-200", icon: Clock },
  em_andamento: { label: "Em Andamento", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Wrench },
  aguardando_peca: { label: "Aguard. Peça", color: "bg-amber-100 text-amber-700 border-amber-200", icon: AlertCircle },
  concluida: { label: "Concluída", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
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
    { label: "Total Abertas", value: ordensServico.filter(os => os.status !== "concluida").length.toString(), color: "text-foreground" },
    { label: "Em Andamento", value: ordensServico.filter(os => os.status === "em_andamento").length.toString(), color: "text-blue-600" },
    { label: "Aguard. Peças", value: ordensServico.filter(os => os.status === "aguardando_peca").length.toString(), color: "text-amber-600" },
    { label: "Concluídas", value: ordensServico.filter(os => os.status === "concluida").length.toString(), color: "text-emerald-600" },
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ordens de Serviço</h1>
              <p className="text-sm text-muted-foreground">Acompanhe o status, prazos e valores de cada atendimento</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setServicoModalOpen(true)}
              className="gap-2"
            >
              <Settings2 size={16} />
              Gerenciar Serviços
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-[220px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Buscar por OS, cliente, placa..."
                      className="pl-10 bg-background"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2" onClick={handleOpenFilters}>
                    <Filter size={16} />
                    Filtros
                  </Button>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFiltersCount} ativo{activeFiltersCount > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Refine a lista de ordens de serviço com filtros rápidos.</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={draftStatus ?? "all"}
                    onValueChange={(v) => setDraftStatus(v === "all" ? null : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="aguardando">Aguardando</SelectItem>
                      <SelectItem value="em_andamento">Em andamento</SelectItem>
                      <SelectItem value="aguardando_peca">Aguardando peça</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mecânico</Label>
                  <Select
                    value={draftMecanico ?? "all"}
                    onValueChange={(v) => setDraftMecanico(v === "all" ? null : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {mecanicos.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Faixa de valor (R$)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      inputMode="decimal"
                      placeholder="Mínimo"
                      value={draftValorMin}
                      onChange={(e) => setDraftValorMin(e.target.value)}
                    />
                    <Input
                      inputMode="decimal"
                      placeholder="Máximo"
                      value={draftValorMax}
                      onChange={(e) => setDraftValorMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-8">
                <Button variant="outline" onClick={handleClearFilters}>
                  Limpar
                </Button>
                <Button onClick={handleApplyFilters}>Aplicar</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Orders Table */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Lista de Ordens ({filteredOrdens.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">OS</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Cliente / Moto</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Serviço</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Mecânico</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Previsão</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrdens.map((os, index) => {
                      const StatusIcon = statusConfig[os.status as keyof typeof statusConfig]?.icon || Clock;
                      const statusStyle = statusConfig[os.status as keyof typeof statusConfig] || statusConfig.aguardando;
                      return (
                        <motion.tr 
                          key={os.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4">
                            <span className="font-mono text-sm font-semibold text-primary">{os.id}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <Bike size={16} className="text-orange-500" />
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
                            <Badge variant="outline" className={`gap-1 ${statusStyle.color}`}>
                              <StatusIcon size={12} />
                              {statusStyle.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-muted-foreground" />
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* FAB - Nova OS */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-200"
      >
        <Plus size={20} />
        <span className="font-semibold">Nova OS</span>
      </motion.button>

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
