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
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Servico {
  id: string;
  nome: string;
  valorBase: number;
  tempoEstimado: string;
  descricao?: string;
  categoria: string;
  ativo: boolean;
}

const categorias = [
  "Motor",
  "Suspensão",
  "Freios",
  "Elétrica",
  "Transmissão",
  "Pneus e Rodas",
  "Manutenção Preventiva",
  "Outros"
];

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
    categoria: "Manutenção Preventiva",
    ativo: true
  });

  const [servicos, setServicos] = useState<Servico[]>([
    { id: "serv-1", nome: "Troca de Óleo", valorBase: 80, tempoEstimado: "30min", categoria: "Manutenção Preventiva", ativo: true, descricao: "Troca de óleo do motor com filtro" },
    { id: "serv-2", nome: "Troca de Kit Relação", valorBase: 450, tempoEstimado: "2h", categoria: "Transmissão", ativo: true, descricao: "Substituição completa do kit de relação" },
    { id: "serv-3", nome: "Revisão Completa 10.000km", valorBase: 680, tempoEstimado: "4h", categoria: "Manutenção Preventiva", ativo: true, descricao: "Revisão completa conforme manual do fabricante" },
    { id: "serv-4", nome: "Troca de Pneus", valorBase: 350, tempoEstimado: "1h", categoria: "Pneus e Rodas", ativo: true },
    { id: "serv-5", nome: "Balanceamento", valorBase: 60, tempoEstimado: "30min", categoria: "Pneus e Rodas", ativo: true },
    { id: "serv-6", nome: "Troca de Pastilhas de Freio", valorBase: 180, tempoEstimado: "1h", categoria: "Freios", ativo: true },
    { id: "serv-7", nome: "Diagnóstico Injeção", valorBase: 150, tempoEstimado: "1h", categoria: "Elétrica", ativo: true },
    { id: "serv-8", nome: "Troca de Filtro de Ar", valorBase: 100, tempoEstimado: "30min", categoria: "Motor", ativo: false },
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
      categoria: novoServico.categoria,
      ativo: novoServico.ativo,
    };

    setServicos([novo, ...servicos]);
    setNovoServico({ nome: "", valorBase: "", tempoEstimado: "", descricao: "", categoria: "Manutenção Preventiva", ativo: true });
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
      categoria: servico.categoria,
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
            categoria: editingData.categoria || s.categoria,
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
    s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.categoria.toLowerCase().includes(searchTerm.toLowerCase())
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add New Service Card */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Plus size={18} className="text-primary" />
                    Cadastrar novo serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome do Serviço *</Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Troca de Óleo"
                        value={novoServico.nome}
                        onChange={(e) => setNovoServico({ ...novoServico, nome: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select
                        value={novoServico.categoria}
                        onValueChange={(v) => setNovoServico({ ...novoServico, categoria: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor Base (R$)</Label>
                      <Input
                        id="valor"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={novoServico.valorBase}
                        onChange={(e) => setNovoServico({ ...novoServico, valorBase: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tempo">Tempo Estimado</Label>
                      <Input
                        id="tempo"
                        placeholder="Ex: 2h"
                        value={novoServico.tempoEstimado}
                        onChange={(e) => setNovoServico({ ...novoServico, tempoEstimado: e.target.value })}
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
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="ativo"
                        checked={novoServico.ativo}
                        onCheckedChange={(checked) => setNovoServico({ ...novoServico, ativo: checked })}
                      />
                      <Label htmlFor="ativo" className="cursor-pointer">
                        Serviço ativo
                        <span className="block text-xs text-muted-foreground font-normal">
                          Serviços inativos não aparecem na criação de OS
                        </span>
                      </Label>
                    </div>
                    <Button 
                      onClick={handleAddServico}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2"
                    >
                      <Plus size={16} />
                      Cadastrar Serviço
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Services List */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Wrench size={18} className="text-primary" />
                      Serviços Cadastrados ({servicos.length})
                    </CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        placeholder="Buscar serviço..."
                        className="pl-10 h-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                      {filteredServicos.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Wrench className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm font-medium">Nenhum serviço encontrado</p>
                          <p className="text-xs">Cadastre serviços para agilizar a criação de OS</p>
                        </div>
                      ) : (
                        filteredServicos.map((servico, index) => (
                          <motion.div
                            key={servico.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.03 }}
                            className={`flex items-center gap-4 p-4 border-b border-border/30 hover:bg-muted/20 transition-colors ${!servico.ativo ? 'opacity-60' : ''}`}
                          >
                            {editingId === servico.id ? (
                              <>
                                <div className="flex-1 grid grid-cols-4 gap-3">
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
                                  <Select
                                    value={editingData.categoria || ""}
                                    onValueChange={(v) => setEditingData({ ...editingData, categoria: v })}
                                  >
                                    <SelectTrigger className="h-9">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categorias.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600" onClick={handleSaveEdit}>
                                  <Check size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setEditingId(null)}>
                                  <X size={16} />
                                </Button>
                              </>
                            ) : (
                              <>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">{servico.nome}</p>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                      {servico.categoria}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                      <DollarSign size={12} />
                                      R$ {servico.valorBase.toFixed(2).replace('.', ',')}
                                    </span>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Clock size={12} />
                                      {servico.tempoEstimado}
                                    </span>
                                  </div>
                                  {servico.descricao && (
                                    <p className="text-xs text-muted-foreground mt-1">{servico.descricao}</p>
                                  )}
                                </div>
                                <Switch
                                  checked={servico.ativo}
                                  onCheckedChange={() => handleToggleAtivo(servico.id)}
                                />
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStartEdit(servico)}>
                                  <Edit2 size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(servico.id)}>
                                  <Trash2 size={14} />
                                </Button>
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

            {/* Right Column - Stats & Info */}
            <div className="space-y-6">
              {/* Stats */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Total de Serviços</span>
                    <span className="text-lg font-bold text-foreground">{servicos.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10">
                    <span className="text-sm text-muted-foreground">Serviços Ativos</span>
                    <span className="text-lg font-bold text-emerald-600">{servicosAtivos}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Serviços Inativos</span>
                    <span className="text-lg font-bold text-muted-foreground">{servicosInativos}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Categories Overview */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categorias.map((cat) => {
                    const count = servicos.filter(s => s.categoria === cat).length;
                    if (count === 0) return null;
                    return (
                      <div key={cat} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                        <span className="text-sm text-foreground">{cat}</span>
                        <span className="text-sm font-medium text-muted-foreground">{count}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="border-border/50 bg-gradient-to-br from-orange-500/5 to-red-600/5">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">💡 Dica</p>
                  <p className="text-xs text-muted-foreground">
                    Mantenha seus serviços organizados por categoria para facilitar a busca durante a criação de ordens de serviço. Serviços inativos não aparecerão nas opções.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GerenciarServicos;
