import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Check, X, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Servico {
  id: string;
  nome: string;
  valorBase: number;
  tempoEstimado: string;
}

interface GerenciarServicosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  servicos: Servico[];
  onServicosChange: (servicos: Servico[]) => void;
}

export function GerenciarServicosModal({ 
  open, 
  onOpenChange, 
  servicos, 
  onServicosChange 
}: GerenciarServicosModalProps) {
  const [novoServico, setNovoServico] = useState({ nome: "", valorBase: "", tempoEstimado: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({ nome: "", valorBase: "", tempoEstimado: "" });

  const handleAddServico = () => {
    if (!novoServico.nome.trim()) {
      toast({
        title: "Erro",
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
    };

    onServicosChange([...servicos, novo]);
    setNovoServico({ nome: "", valorBase: "", tempoEstimado: "" });
    toast({
      title: "Sucesso!",
      description: `Serviço "${novo.nome}" cadastrado`,
    });
  };

  const handleDelete = (id: string) => {
    onServicosChange(servicos.filter(s => s.id !== id));
    toast({
      title: "Serviço removido",
      description: "O serviço foi excluído com sucesso",
    });
  };

  const handleStartEdit = (servico: Servico) => {
    setEditingId(servico.id);
    setEditingData({
      nome: servico.nome,
      valorBase: servico.valorBase.toString(),
      tempoEstimado: servico.tempoEstimado,
    });
  };

  const handleSaveEdit = () => {
    if (!editingData.nome.trim()) return;
    
    onServicosChange(servicos.map(s => 
      s.id === editingId 
        ? { 
            ...s, 
            nome: editingData.nome.trim(),
            valorBase: parseFloat(editingData.valorBase) || 0,
            tempoEstimado: editingData.tempoEstimado || "1h",
          }
        : s
    ));
    setEditingId(null);
    toast({
      title: "Serviço atualizado",
      description: "As alterações foram salvas",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Gerenciar Serviços
          </DialogTitle>
        </DialogHeader>
        
        {/* Form to add new service */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-3">Cadastrar Novo Serviço</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nome" className="text-xs">Nome do Serviço *</Label>
              <Input
                id="nome"
                placeholder="Ex: Troca de Óleo"
                value={novoServico.nome}
                onChange={(e) => setNovoServico({ ...novoServico, nome: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="valor" className="text-xs">Valor Base (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={novoServico.valorBase}
                onChange={(e) => setNovoServico({ ...novoServico, valorBase: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tempo" className="text-xs">Tempo Estimado</Label>
              <Input
                id="tempo"
                placeholder="Ex: 2h"
                value={novoServico.tempoEstimado}
                onChange={(e) => setNovoServico({ ...novoServico, tempoEstimado: e.target.value })}
                className="h-9"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddServico}
            className="mt-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2"
            size="sm"
          >
            <Plus size={14} />
            Adicionar Serviço
          </Button>
        </div>

        {/* List of services */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Serviços Cadastrados ({servicos.length})
          </p>
          
          <AnimatePresence mode="popLayout">
            {servicos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wrench className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhum serviço cadastrado</p>
                <p className="text-xs">Adicione serviços acima para agilizar a criação de OS</p>
              </div>
            ) : (
              servicos.map((servico) => (
                <motion.div
                  key={servico.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-3 p-3 bg-background border border-border/50 rounded-lg hover:border-border transition-colors"
                >
                  {editingId === servico.id ? (
                    <>
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <Input
                          value={editingData.nome}
                          onChange={(e) => setEditingData({ ...editingData, nome: e.target.value })}
                          className="h-8 text-sm"
                        />
                        <Input
                          type="number"
                          value={editingData.valorBase}
                          onChange={(e) => setEditingData({ ...editingData, valorBase: e.target.value })}
                          className="h-8 text-sm"
                        />
                        <Input
                          value={editingData.tempoEstimado}
                          onChange={(e) => setEditingData({ ...editingData, tempoEstimado: e.target.value })}
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600" onClick={handleSaveEdit}>
                        <Check size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setEditingId(null)}>
                        <X size={14} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{servico.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          R$ {servico.valorBase.toFixed(2).replace('.', ',')} • {servico.tempoEstimado}
                        </p>
                      </div>
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
      </DialogContent>
    </Dialog>
  );
}
