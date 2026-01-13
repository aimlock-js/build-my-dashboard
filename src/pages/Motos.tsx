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
  Bike,
  MoreHorizontal,
  Calendar,
  User,
  Wrench,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

const motos = [
  { 
    id: 1, 
    modelo: "Honda CG 160 Titan", 
    placa: "ABC-1234",
    ano: "2023",
    cor: "Vermelha",
    km: "12.450",
    cliente: "João Silva",
    telefone: "(11) 99999-1234",
    ultimaOS: "10/01/2024",
    totalOS: 5
  },
  { 
    id: 2, 
    modelo: "Yamaha Fazer 250", 
    placa: "XYZ-5678",
    ano: "2022",
    cor: "Azul",
    km: "28.320",
    cliente: "Maria Santos",
    telefone: "(11) 99999-5678",
    ultimaOS: "09/01/2024",
    totalOS: 8
  },
  { 
    id: 3, 
    modelo: "Honda CB 300R", 
    placa: "DEF-9012",
    ano: "2021",
    cor: "Preta",
    km: "45.670",
    cliente: "Pedro Oliveira",
    telefone: "(11) 99999-9012",
    ultimaOS: "08/01/2024",
    totalOS: 12
  },
  { 
    id: 4, 
    modelo: "Kawasaki Ninja 400", 
    placa: "GHI-3456",
    ano: "2024",
    cor: "Verde",
    km: "3.200",
    cliente: "Ana Costa",
    telefone: "(11) 99999-3456",
    ultimaOS: "11/01/2024",
    totalOS: 2
  },
  { 
    id: 5, 
    modelo: "BMW G 310 R", 
    placa: "JKL-7890",
    ano: "2023",
    cor: "Branca",
    km: "18.900",
    cliente: "Lucas Mendes",
    telefone: "(11) 99999-7890",
    ultimaOS: "10/01/2024",
    totalOS: 4
  },
  { 
    id: 6, 
    modelo: "Suzuki GSX-S750", 
    placa: "MNO-1357",
    ano: "2022",
    cor: "Preta",
    km: "22.100",
    cliente: "Carlos Ferreira",
    telefone: "(11) 99999-1357",
    ultimaOS: "05/01/2024",
    totalOS: 6
  },
];

const Motos = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Motos / Veículos</h1>
              <p className="text-sm text-muted-foreground">Cadastro de motos e veículos dos clientes</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2">
              <Plus size={16} />
              Nova Moto
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Cadastradas", value: "156", icon: Bike },
              { label: "Atendidas este Mês", value: "47", icon: Wrench },
              { label: "Novos Cadastros", value: "12", icon: Plus },
              { label: "Com OS Aberta", value: "8", icon: FileText },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <stat.icon size={20} className="text-orange-500" />
                      </div>
                    </div>
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
                      placeholder="Buscar por placa, modelo, cliente..." 
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Marca
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar size={16} />
                  Ano
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Motos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {motos.map((moto, index) => (
              <motion.div
                key={moto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                          <Bike size={24} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{moto.modelo}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {moto.placa}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{moto.ano}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cor</span>
                        <span className="font-medium">{moto.cor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Quilometragem</span>
                        <span className="font-medium">{moto.km} km</span>
                      </div>
                      
                      <div className="pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <User size={14} className="text-muted-foreground" />
                          <span className="text-sm font-medium">{moto.cliente}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{moto.telefone}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          <span>Última OS: {moto.ultimaOS}</span>
                        </div>
                        <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/30">
                          {moto.totalOS} OS
                        </Badge>
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

export default Motos;
