import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Wrench, ArrowLeft, Plus, ExternalLink } from "lucide-react";

interface CadastroServicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (servico: { nome: string; valor: number; descricao: string }) => void;
}

export function CadastroServicoModal({
  open,
  onOpenChange,
  onSave,
}: CadastroServicoModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    descricao: "",
  });

  const handleSubmit = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "Digite o nome do serviço",
        variant: "destructive",
      });
      return;
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      toast({
        title: "Erro",
        description: "Digite um valor válido",
        variant: "destructive",
      });
      return;
    }

    onSave?.({
      nome: formData.nome.trim(),
      valor: parseFloat(formData.valor),
      descricao: formData.descricao.trim(),
    });

    toast({
      title: "Sucesso!",
      description: `Serviço "${formData.nome}" cadastrado com sucesso`,
    });

    setFormData({ nome: "", valor: "", descricao: "" });
    onOpenChange(false);
  };

  const handleGoToManage = () => {
    onOpenChange(false);
    navigate("/ordens-servico/servicos");
  };

  const handleClose = () => {
    setFormData({ nome: "", valor: "", descricao: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            Cadastrar Serviço
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Nome do Serviço */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium">
              Nome do Serviço <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Troca de Óleo, Revisão Completa..."
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="valor" className="text-sm font-medium">
              Valor <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                R$
              </span>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="h-11 pl-10"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              placeholder="Descreva detalhes do serviço (opcional)..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <button
            onClick={handleGoToManage}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
          >
            <ExternalLink size={14} className="group-hover:text-primary transition-colors" />
            Ver todos os serviços
          </button>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClose} className="gap-2">
              <ArrowLeft size={14} />
              Voltar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2"
            >
              <Plus size={14} />
              Cadastrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
