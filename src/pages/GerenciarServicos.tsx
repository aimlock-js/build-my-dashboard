import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Wrench,
  Search,
  Clock,
  DollarSign,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Servico {
  id: string;
  nome: string;
  valorBase: number;
  tempoEstimado: string;
  descricao?: string;
  ativo: boolean;
}

const GerenciarServicos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Servico>>({});
  
  const [novoServico, setNovoServico] = useState({
    nome: "",
    valorBase: "",
    tempoEstimado: "",
    descricao: "",
    ativo: true
  });

  const [servicos, setServicos] = useState<Servico[]>([
    { id: "serv-1", nome: "Troca de Óleo", valorBase: 80, tempoEstimado: "30min", ativo: true, descricao: "Troca de óleo do motor com filtro" },
    { id: "serv-2", nome: "Troca de Kit Relação", valorBase: 450, tempoEstimado: "2h", ativo: true, descricao: "Substituição completa do kit de relação" },
    { id: "serv-3", nome: "Revisão Completa 10.000km", valorBase: 680, tempoEstimado: "4h", ativo: true, descricao: "Revisão completa conforme manual do fabricante" },
    { id: "serv-4", nome: "Troca de Pneus", valorBase: 350, tempoEstimado: "1h", ativo: true },
    { id: "serv-5", nome: "Balanceamento", valorBase: 60, tempoEstimado: "30min", ativo: true },
    { id: "serv-6", nome: "Troca de Pastilhas de Freio", valorBase: 180, tempoEstimado: "1h", ativo: true },
    { id: "serv-7", nome: "Diagnóstico Injeção", valorBase: 150, tempoEstimado: "1h", ativo: true },
    { id: "serv-8", nome: "Troca de Filtro de Ar", valorBase: 100, tempoEstimado: "30min", ativo: false },
  ]);

  const handleAddServico = () => {
    if (!novoServico.nome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite o nome do serviço",
        variant: "destructive",
      });
      return;
    }

    const novo: Servico = {
      id: `serv-${Date.now()}`,
      nome: novoServico.nome.trim(),
      valorBase: parseFloat(novoServico.valorBase) || 0,
      tempoEstimado: novoServico.tempoEstimado || "1h",
      descricao: novoServico.descricao,
      ativo: novoServico.ativo,
    };

    setServicos([novo, ...servicos]);
    setNovoServico({ nome: "", valorBase: "", tempoEstimado: "", descricao: "", ativo: true });
    toast({
      title: "Serviço cadastrado!",
      description: `"${novo.nome}" foi adicionado com sucesso`,
    });
  };

  const handleDelete = (id: string) => {
    const servico = servicos.find(s => s.id === id);
    setServicos(servicos.filter(s => s.id !== id));
    toast({
      title: "Serviço removido",
      description: `"${servico?.nome}" foi excluído`,
    });
  };

  const handleStartEdit = (servico: Servico) => {
    setEditingId(servico.id);
    setEditingData({
      nome: servico.nome,
      valorBase: servico.valorBase,
      tempoEstimado: servico.tempoEstimado,
      descricao: servico.descricao,
      ativo: servico.ativo,
    });
  };

  const handleSaveEdit = () => {
    if (!editingData.nome?.trim()) return;
    
    setServicos(servicos.map(s => 
      s.id === editingId 
        ? { 
            ...s, 
            nome: editingData.nome!.trim(),
            valorBase: Number(editingData.valorBase) || 0,
            tempoEstimado: editingData.tempoEstimado || "1h",
            descricao: editingData.descricao,
            ativo: editingData.ativo ?? s.ativo,
          }
        : s
    ));
    setEditingId(null);
    toast({
      title: "Serviço atualizado",
      description: "As alterações foram salvas",
    });
  };

  const handleToggleAtivo = (id: string) => {
    setServicos(servicos.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ));
  };

  const filteredServicos = servicos.filter(s =>
    s.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const servicosAtivos = servicos.filter(s => s.ativo).length;
  const servicosInativos = servicos.filter(s => !s.ativo).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/ordens-servico")}
              className="gap-2 mb-3 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Voltar para Ordens de Serviço
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Gerenciar Serviços</h1>
            <p className="text-sm text-muted-foreground">Ambiente dedicado à gestão e organização dos serviços da operação</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <Card className="border-border/50 h-fit">
              <CardHeader className="pb-6">
                <CardTitle className="text-lg font-semibold flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Plus size={18} className="text-white" />
                  </div>
                  Cadastrar novo serviço
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Preencha os dados abaixo para adicionar um novo serviço ao catálogo
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Serviço *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Troca de Óleo"
                    value={novoServico.nome}
                    onChange={(e) => setNovoServico({ ...novoServico, nome: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Base (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={novoServico.valorBase}
                      onChange={(e) => setNovoServico({ ...novoServico, valorBase: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tempo">Tempo Estimado</Label>
                    <Input
                      id="tempo"
                      placeholder="Ex: 2h"
                      value={novoServico.tempoEstimado}
                      onChange={(e) => setNovoServico({ ...novoServico, tempoEstimado: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva os detalhes do serviço..."
                    value={novoServico.descricao}
                    onChange={(e) => setNovoServico({ ...novoServico, descricao: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <Switch
                    id="ativo"
                    checked={novoServico.ativo}
                    onCheckedChange={(checked) => setNovoServico({ ...novoServico, ativo: checked })}
                  />
                  <Label htmlFor="ativo" className="cursor-pointer flex-1">
                    <span className="font-medium">Serviço ativo</span>
                    <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                      Serviços inativos não aparecem na criação de OS
                    </span>
                  </Label>
                </div>

                <Button 
                  onClick={handleAddServico}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2 h-12 text-base"
                >
                  <Plus size={20} />
                  Cadastrar Serviço
                </Button>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Sparkles size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Dica:</span> Serviços cadastrados podem ser selecionados rapidamente durante a criação de OS, preenchendo automaticamente os valores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Services List */}
            <Card className="border-border/50">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Wrench size={18} className="text-primary" />
                      </div>
                      Serviços Cadastrados
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      {servicos.length} {servicos.length === 1 ? 'serviço' : 'serviços'} • {servicosAtivos} {servicosAtivos === 1 ? 'ativo' : 'ativos'}
                    </p>
                  </div>
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Buscar serviço..."
                      className="pl-11 h-11"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-400px)] min-h-[450px] overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {filteredServicos.length === 0 ? (
                      <div className="text-center py-20 text-muted-foreground">
                        <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-5">
                          <Wrench className="h-10 w-10 opacity-40" />
                        </div>
                        <p className="text-base font-medium">Nenhum serviço encontrado</p>
                        <p className="text-sm mt-1.5">Cadastre serviços para agilizar a criação de OS</p>
                      </div>
                    ) : (
                      filteredServicos.map((servico, index) => (
                        <motion.div
                          key={servico.id}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ delay: index * 0.02 }}
                          className={`group flex items-center gap-5 px-6 py-5 border-b border-border/30 hover:bg-muted/30 transition-all ${!servico.ativo ? 'opacity-50 bg-muted/10' : ''}`}
                        >
                          {editingId === servico.id ? (
                            <>
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Input
                                  value={editingData.nome || ""}
                                  onChange={(e) => setEditingData({ ...editingData, nome: e.target.value })}
                                  className="h-9"
                                  placeholder="Nome"
                                />
                                <Input
                                  type="number"
                                  value={editingData.valorBase || ""}
                                  onChange={(e) => setEditingData({ ...editingData, valorBase: Number(e.target.value) })}
                                  className="h-9"
                                  placeholder="Valor"
                                />
                                <Input
                                  value={editingData.tempoEstimado || ""}
                                  onChange={(e) => setEditingData({ ...editingData, tempoEstimado: e.target.value })}
                                  className="h-9"
                                  placeholder="Tempo"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10" onClick={handleSaveEdit}>
                                  <Check size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setEditingId(null)}>
                                  <X size={16} />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-base">{servico.nome}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <DollarSign size={14} className="text-emerald-500" />
                                    R$ {servico.valorBase.toFixed(2).replace('.', ',')}
                                  </span>
                                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Clock size={14} className="text-blue-500" />
                                    {servico.tempoEstimado}
                                  </span>
                                </div>
                                {servico.descricao && (
                                  <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{servico.descricao}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 mr-3">
                                  <Switch
                                    checked={servico.ativo}
                                    onCheckedChange={() => handleToggleAtivo(servico.id)}
                                  />
                                  <span className={`text-sm ${servico.ativo ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                                    {servico.ativo ? 'Ativo' : 'Inativo'}
                                  </span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleStartEdit(servico)}>
                                  <Edit2 size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(servico.id)}>
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GerenciarServicos;
