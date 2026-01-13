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
  Users,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Star,
  Bike
} from "lucide-react";
import { motion } from "framer-motion";

const clientes = [
  { 
    id: 1, 
    nome: "João Silva", 
    email: "joao.silva@email.com",
    telefone: "(11) 99999-1234",
    endereco: "Rua das Flores, 123 - São Paulo",
    motos: 2,
    totalGasto: 4580.00,
    ultimaVisita: "10/01/2024",
    fidelidade: "gold"
  },
  { 
    id: 2, 
    nome: "Maria Santos", 
    email: "maria.santos@email.com",
    telefone: "(11) 99999-5678",
    endereco: "Av. Paulista, 456 - São Paulo",
    motos: 1,
    totalGasto: 8920.00,
    ultimaVisita: "09/01/2024",
    fidelidade: "platinum"
  },
  { 
    id: 3, 
    nome: "Pedro Oliveira", 
    email: "pedro.oliveira@email.com",
    telefone: "(11) 99999-9012",
    endereco: "Rua Augusta, 789 - São Paulo",
    motos: 3,
    totalGasto: 12450.00,
    ultimaVisita: "08/01/2024",
    fidelidade: "platinum"
  },
  { 
    id: 4, 
    nome: "Ana Costa", 
    email: "ana.costa@email.com",
    telefone: "(11) 99999-3456",
    endereco: "Rua Oscar Freire, 321 - São Paulo",
    motos: 1,
    totalGasto: 1250.00,
    ultimaVisita: "11/01/2024",
    fidelidade: "bronze"
  },
  { 
    id: 5, 
    nome: "Lucas Mendes", 
    email: "lucas.mendes@email.com",
    telefone: "(11) 99999-7890",
    endereco: "Av. Brasil, 654 - São Paulo",
    motos: 2,
    totalGasto: 3680.00,
    ultimaVisita: "10/01/2024",
    fidelidade: "silver"
  },
  { 
    id: 6, 
    nome: "Carlos Ferreira", 
    email: "carlos.ferreira@email.com",
    telefone: "(11) 99999-1357",
    endereco: "Rua Consolação, 987 - São Paulo",
    motos: 1,
    totalGasto: 5890.00,
    ultimaVisita: "05/01/2024",
    fidelidade: "gold"
  },
];

const fidelidadeConfig = {
  bronze: { label: "Bronze", color: "bg-amber-700/20 text-amber-700 border-amber-700/30" },
  silver: { label: "Prata", color: "bg-slate-400/20 text-slate-600 border-slate-400/30" },
  gold: { label: "Ouro", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  platinum: { label: "Platina", color: "bg-purple-500/20 text-purple-600 border-purple-500/30" },
};

const Clientes = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
              <p className="text-sm text-muted-foreground">Gestão de clientes da oficina</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2">
              <Plus size={16} />
              Novo Cliente
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total de Clientes", value: "248", color: "text-foreground" },
              { label: "Clientes Ativos", value: "186", color: "text-emerald-600" },
              { label: "Novos este Mês", value: "23", color: "text-blue-600" },
              { label: "Clientes VIP", value: "42", color: "text-purple-600" },
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
                      placeholder="Buscar por nome, telefone, email..." 
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Fidelidade
                </Button>
                <Button variant="outline" className="gap-2">
                  <Star size={16} />
                  VIP
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {clientes.map((cliente, index) => (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                          <span className="text-lg font-bold text-orange-600">
                            {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{cliente.nome}</p>
                          <Badge variant="outline" className={`text-[10px] ${fidelidadeConfig[cliente.fidelidade as keyof typeof fidelidadeConfig].color}`}>
                            <Star size={10} className="mr-1" />
                            {fidelidadeConfig[cliente.fidelidade as keyof typeof fidelidadeConfig].label}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={14} />
                        <span>{cliente.telefone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} />
                        <span className="truncate">{cliente.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={14} />
                        <span className="truncate">{cliente.endereco}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bike size={14} className="text-orange-500" />
                        <span className="text-sm font-medium">{cliente.motos} moto{cliente.motos > 1 ? 's' : ''}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total gasto</p>
                        <p className="text-sm font-bold text-emerald-600">
                          R$ {cliente.totalGasto.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clientes;
