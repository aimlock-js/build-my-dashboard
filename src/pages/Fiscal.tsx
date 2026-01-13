import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Receipt, 
  FileText, 
  Download,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const notasFiscais = [
  { 
    id: "NF-001234", 
    cliente: "João Silva", 
    valor: 890.00,
    tipo: "NFSe",
    status: "emitida",
    dataEmissao: "10/01/2024",
    osRef: "OS-2024-003"
  },
  { 
    id: "NF-001233", 
    cliente: "Maria Santos", 
    valor: 680.00,
    tipo: "NFSe",
    status: "pendente",
    dataEmissao: "-",
    osRef: "OS-2024-002"
  },
  { 
    id: "NF-001232", 
    cliente: "Pedro Oliveira", 
    valor: 1250.00,
    tipo: "NFe",
    status: "emitida",
    dataEmissao: "09/01/2024",
    osRef: "OS-2024-001"
  },
  { 
    id: "NF-001231", 
    cliente: "Ana Costa", 
    valor: 320.00,
    tipo: "NFSe",
    status: "cancelada",
    dataEmissao: "08/01/2024",
    osRef: "OS-2024-000"
  },
  { 
    id: "NF-001230", 
    cliente: "Lucas Mendes", 
    valor: 2150.00,
    tipo: "NFe",
    status: "emitida",
    dataEmissao: "08/01/2024",
    osRef: "OS-2023-998"
  },
];

const statusConfig = {
  emitida: { label: "Emitida", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  pendente: { label: "Pendente", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  cancelada: { label: "Cancelada", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

const Fiscal = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Fiscal</h1>
              <p className="text-sm text-muted-foreground">Notas fiscais e documentos fiscais</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar size={16} />
                Janeiro 2024
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2">
                <Send size={16} />
                Emitir NF
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Notas Emitidas", value: "156", sublabel: "Este mês", color: "text-emerald-600" },
              { label: "Valor Total", value: "R$ 89.450", sublabel: "Faturado", color: "text-blue-600" },
              { label: "Pendentes", value: "8", sublabel: "Aguardando", color: "text-amber-600" },
              { label: "Canceladas", value: "3", sublabel: "Este mês", color: "text-red-600" },
            ].map((stat, i) => (
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
                    <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-6 border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      placeholder="Buscar por número, cliente, OS..." 
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Tipo
                </Button>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Status
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* NFe Table */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Notas Fiscais</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Número</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Cliente</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Tipo</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Valor</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">Emissão</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">OS Ref.</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {notasFiscais.map((nf, index) => {
                      const StatusIcon = statusConfig[nf.status as keyof typeof statusConfig].icon;
                      return (
                        <motion.tr 
                          key={nf.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Receipt size={16} className="text-orange-500" />
                              <span className="font-mono text-sm font-semibold">{nf.id}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-foreground">{nf.cliente}</span>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="font-mono text-xs">
                              {nf.tipo}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-sm text-foreground">
                              R$ {nf.valor.toFixed(2).replace('.', ',')}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={`gap-1 ${statusConfig[nf.status as keyof typeof statusConfig].color}`}>
                              <StatusIcon size={12} />
                              {statusConfig[nf.status as keyof typeof statusConfig].label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-muted-foreground">{nf.dataEmissao}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-primary font-mono">{nf.osRef}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal size={16} />
                              </Button>
                            </div>
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
    </div>
  );
};

export default Fiscal;
