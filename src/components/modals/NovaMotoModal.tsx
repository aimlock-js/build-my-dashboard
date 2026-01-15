import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface NovaMotoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (moto: Moto) => void;
}

export interface Moto {
  id: number;
  modelo: string;
  placa: string;
  ano: string;
  cor: string;
  km: string;
  cliente: string;
  telefone: string;
  ultimaOS: string;
  totalOS: number;
}

export function NovaMotoModal({ open, onOpenChange, onSave }: NovaMotoModalProps) {
  const [formData, setFormData] = useState({
    modelo: "",
    placa: "",
    ano: "",
    cor: "",
    km: "",
    cliente: "",
    telefone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.modelo || !formData.placa || !formData.cliente) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novaMoto: Moto = {
      id: Date.now(),
      modelo: formData.modelo,
      placa: formData.placa.toUpperCase(),
      ano: formData.ano || new Date().getFullYear().toString(),
      cor: formData.cor || "Não informada",
      km: formData.km || "0",
      cliente: formData.cliente,
      telefone: formData.telefone || "-",
      ultimaOS: "-",
      totalOS: 0,
    };

    onSave(novaMoto);
    toast({
      title: "Sucesso!",
      description: `Moto "${novaMoto.modelo}" cadastrada com sucesso`,
    });
    
    setFormData({
      modelo: "",
      placa: "",
      ano: "",
      cor: "",
      km: "",
      cliente: "",
      telefone: "",
    });
    onOpenChange(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova Moto / Veículo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo *</Label>
            <Input
              id="modelo"
              placeholder="Ex: Honda CG 160 Titan"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placa">Placa *</Label>
              <Input
                id="placa"
                placeholder="ABC-1234"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                maxLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ano">Ano</Label>
              <Select
                value={formData.ano}
                onValueChange={(value) => setFormData({ ...formData, ano: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cor">Cor</Label>
              <Select
                value={formData.cor}
                onValueChange={(value) => setFormData({ ...formData, cor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preta">Preta</SelectItem>
                  <SelectItem value="Branca">Branca</SelectItem>
                  <SelectItem value="Vermelha">Vermelha</SelectItem>
                  <SelectItem value="Azul">Azul</SelectItem>
                  <SelectItem value="Verde">Verde</SelectItem>
                  <SelectItem value="Amarela">Amarela</SelectItem>
                  <SelectItem value="Prata">Prata</SelectItem>
                  <SelectItem value="Cinza">Cinza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="km">Quilometragem Atual</Label>
            <Input
              id="km"
              type="number"
              placeholder="Ex: 15000"
              value={formData.km}
              onChange={(e) => setFormData({ ...formData, km: e.target.value })}
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Dados do Proprietário</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Nome do Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nome completo"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              Cadastrar Moto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
