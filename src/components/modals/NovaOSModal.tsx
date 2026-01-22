import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Servico } from "./GerenciarServicosModal";

interface NovaOSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (os: OrdemServico) => void;
  servicos: Servico[];
}

export interface OrdemServico {
  id: string;
  cliente: string;
  moto: string;
  placa: string;
  servico: string;
  status: string;
  mecanico: string;
  valor: number;
  dataEntrada: string;
  previsao: string;
  observacoes?: string;
}

export function NovaOSModal({ open, onOpenChange, onSave, servicos }: NovaOSModalProps) {
  const [formData, setFormData] = useState({
    cliente: "",
    moto: "",
    placa: "",
    servico: "",
    mecanico: "",
    valor: "",
    previsao: "",
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cliente || !formData.moto || !formData.placa || !formData.servico) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novaOS: OrdemServico = {
      id: `OS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      cliente: formData.cliente,
      moto: formData.moto,
      placa: formData.placa.toUpperCase(),
      servico: formData.servico,
      status: "aguardando",
      mecanico: formData.mecanico || "-",
      valor: parseFloat(formData.valor) || 0,
      dataEntrada: new Date().toLocaleDateString('pt-BR'),
      previsao: formData.previsao || new Date().toLocaleDateString('pt-BR'),
      observacoes: formData.observacoes,
    };

    onSave(novaOS);
    toast({
      title: "Sucesso!",
      description: `Ordem de Serviço ${novaOS.id} criada com sucesso`,
    });
    
    setFormData({
      cliente: "",
      moto: "",
      placa: "",
      servico: "",
      mecanico: "",
      valor: "",
      previsao: "",
      observacoes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova Ordem de Serviço</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Input
                id="cliente"
                placeholder="Nome do cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moto">Moto / Veículo *</Label>
              <Input
                id="moto"
                placeholder="Ex: Honda CG 160 Titan"
                value={formData.moto}
                onChange={(e) => setFormData({ ...formData, moto: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="mecanico">Mecânico Responsável</Label>
              <Select
                value={formData.mecanico}
                onValueChange={(value) => setFormData({ ...formData, mecanico: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mecânico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Carlos">Carlos</SelectItem>
                  <SelectItem value="Roberto">Roberto</SelectItem>
                  <SelectItem value="Fernando">Fernando</SelectItem>
                  <SelectItem value="Marcos">Marcos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Serviço a Realizar *</Label>
            {servicos.length > 0 ? (
              <Select
                value={formData.servico}
                onValueChange={(value) => {
                  const servicoSelecionado = servicos.find(s => s.nome === value);
                  setFormData({ 
                    ...formData, 
                    servico: value,
                    valor: servicoSelecionado ? servicoSelecionado.valorBase.toString() : formData.valor
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicos.map((servico) => (
                    <SelectItem key={servico.id} value={servico.nome}>
                      {servico.nome} - R$ {servico.valorBase.toFixed(2).replace('.', ',')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="servico"
                placeholder="Ex: Troca de Kit Relação"
                value={formData.servico}
                onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor Estimado (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previsao">Previsão de Entrega</Label>
              <Input
                id="previsao"
                type="date"
                value={formData.previsao}
                onChange={(e) => setFormData({ ...formData, previsao: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Informações adicionais sobre o serviço..."
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              Criar OS
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
