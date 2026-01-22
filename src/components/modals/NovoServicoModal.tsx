import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface NovoServicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (servico: Servico) => void;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  valorBase: number;
  tempoEstimado: string;
  categoria: string;
}

export function NovoServicoModal({ open, onOpenChange, onSave }: NovoServicoModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    valorBase: "",
    tempoEstimado: "",
    categoria: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome) {
      toast({
        title: "Erro",
        description: "O nome do serviço é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const novoServico: Servico = {
      id: `SRV-${Date.now()}`,
      nome: formData.nome,
      descricao: formData.descricao,
      valorBase: parseFloat(formData.valorBase) || 0,
      tempoEstimado: formData.tempoEstimado || "1h",
      categoria: formData.categoria || "Geral",
    };

    onSave(novoServico);
    toast({
      title: "Serviço cadastrado!",
      description: `"${novoServico.nome}" foi adicionado à lista de serviços`,
    });
    
    setFormData({
      nome: "",
      descricao: "",
      valorBase: "",
      tempoEstimado: "",
      categoria: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Novo Serviço</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Serviço *</Label>
            <Input
              id="nome"
              placeholder="Ex: Troca de Óleo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição detalhada do serviço..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorBase">Valor Base (R$)</Label>
              <Input
                id="valorBase"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valorBase}
                onChange={(e) => setFormData({ ...formData, valorBase: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempoEstimado">Tempo Estimado</Label>
              <Input
                id="tempoEstimado"
                placeholder="Ex: 2h"
                value={formData.tempoEstimado}
                onChange={(e) => setFormData({ ...formData, tempoEstimado: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Input
              id="categoria"
              placeholder="Ex: Manutenção, Reparo, Revisão"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              Salvar Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
