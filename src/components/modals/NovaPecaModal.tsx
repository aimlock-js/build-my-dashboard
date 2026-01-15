import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface NovaPecaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (peca: Peca) => void;
}

export interface Peca {
  id: string;
  nome: string;
  categoria: string;
  estoque: number;
  estoqueMin: number;
  estoqueMax: number;
  custo: number;
  venda: number;
  fornecedor: string;
}

export function NovaPecaModal({ open, onOpenChange, onSave }: NovaPecaModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    estoque: "",
    estoqueMin: "",
    estoqueMax: "",
    custo: "",
    venda: "",
    fornecedor: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.categoria || !formData.estoque) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novaPeca: Peca = {
      id: `PEC-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      nome: formData.nome,
      categoria: formData.categoria,
      estoque: parseInt(formData.estoque) || 0,
      estoqueMin: parseInt(formData.estoqueMin) || 5,
      estoqueMax: parseInt(formData.estoqueMax) || 50,
      custo: parseFloat(formData.custo) || 0,
      venda: parseFloat(formData.venda) || 0,
      fornecedor: formData.fornecedor || "Não informado",
    };

    onSave(novaPeca);
    toast({
      title: "Sucesso!",
      description: `Peça "${novaPeca.nome}" cadastrada com sucesso`,
    });
    
    setFormData({
      nome: "",
      categoria: "",
      estoque: "",
      estoqueMin: "",
      estoqueMax: "",
      custo: "",
      venda: "",
      fornecedor: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova Peça / Produto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Peça *</Label>
            <Input
              id="nome"
              placeholder="Ex: Óleo Motor 10W40 1L"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData({ ...formData, categoria: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lubrificantes">Lubrificantes</SelectItem>
                  <SelectItem value="Transmissão">Transmissão</SelectItem>
                  <SelectItem value="Freios">Freios</SelectItem>
                  <SelectItem value="Pneus">Pneus</SelectItem>
                  <SelectItem value="Filtros">Filtros</SelectItem>
                  <SelectItem value="Elétrica">Elétrica</SelectItem>
                  <SelectItem value="Suspensão">Suspensão</SelectItem>
                  <SelectItem value="Motor">Motor</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input
                id="fornecedor"
                placeholder="Nome do fornecedor"
                value={formData.fornecedor}
                onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estoque">Qtd. Atual *</Label>
              <Input
                id="estoque"
                type="number"
                placeholder="0"
                value={formData.estoque}
                onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estoqueMin">Estoque Mín.</Label>
              <Input
                id="estoqueMin"
                type="number"
                placeholder="5"
                value={formData.estoqueMin}
                onChange={(e) => setFormData({ ...formData, estoqueMin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estoqueMax">Estoque Máx.</Label>
              <Input
                id="estoqueMax"
                type="number"
                placeholder="50"
                value={formData.estoqueMax}
                onChange={(e) => setFormData({ ...formData, estoqueMax: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="custo">Preço de Custo (R$)</Label>
              <Input
                id="custo"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.custo}
                onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venda">Preço de Venda (R$)</Label>
              <Input
                id="venda"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.venda}
                onChange={(e) => setFormData({ ...formData, venda: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              Cadastrar Peça
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
