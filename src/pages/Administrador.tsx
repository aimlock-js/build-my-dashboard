import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Key,
  Activity,
  Clock,
  UserPlus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

const usuarios = [
  { 
    id: 1, 
    nome: "Ricardo Costa", 
    email: "ricardo@mototech.com",
    cargo: "Gerente",
    status: "ativo",
    ultimoAcesso: "10/01/2024 14:32",
    permissoes: ["admin", "financeiro", "estoque"]
  },
  { 
    id: 2, 
    nome: "Carlos Mecânico", 
    email: "carlos@mototech.com",
    cargo: "Mecânico",
    status: "ativo",
    ultimoAcesso: "10/01/2024 13:45",
    permissoes: ["os", "estoque"]
  },
  { 
    id: 3, 
    nome: "Roberto Santos", 
    email: "roberto@mototech.com",
    cargo: "Mecânico",
    status: "ativo",
    ultimoAcesso: "10/01/2024 12:20",
    permissoes: ["os"]
  },
  { 
    id: 4, 
    nome: "Ana Financeiro", 
    email: "ana@mototech.com",
    cargo: "Financeiro",
    status: "inativo",
    ultimoAcesso: "05/01/2024 18:00",
    permissoes: ["financeiro", "fiscal"]
  },
  { 
    id: 5, 
    nome: "Lucas Recepção", 
    email: "lucas@mototech.com",
    cargo: "Recepcionista",
    status: "ativo",
    ultimoAcesso: "10/01/2024 14:00",
    permissoes: ["clientes", "os"]
  },
];

const logsAtividade = [
  { id: 1, usuario: "Ricardo Costa", acao: "Atualizou configurações do sistema", tempo: "2 min atrás", tipo: "config" },
  { id: 2, usuario: "Carlos Mecânico", acao: "Finalizou OS-2024-003", tempo: "15 min atrás", tipo: "os" },
  { id: 3, usuario: "Lucas Recepção", acao: "Cadastrou novo cliente: João Silva", tempo: "32 min atrás", tipo: "cliente" },
  { id: 4, usuario: "Roberto Santos", acao: "Atualizou estoque: Óleo 10W40", tempo: "1 hora atrás", tipo: "estoque" },
  { id: 5, usuario: "Ricardo Costa", acao: "Exportou relatório financeiro", tempo: "2 horas atrás", tipo: "relatorio" },
];

const Administrador = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Administrador</h1>
              <p className="text-sm text-muted-foreground">Gestão de usuários, permissões e logs do sistema</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2">
              <UserPlus size={16} />
              Novo Usuário
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Usuários Ativos", value: "4", icon: Users, color: "text-emerald-600" },
              { label: "Usuários Inativos", value: "1", icon: Users, color: "text-red-600" },
              { label: "Sessões Ativas", value: "3", icon: Activity, color: "text-blue-600" },
              { label: "Logs Hoje", value: "47", icon: Clock, color: "text-purple-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <stat.icon size={20} className="text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Users List */}
            <div className="xl:col-span-2">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Usuários do Sistema</CardTitle>
                    <CardDescription>Gerenciar acessos e permissões</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Key size={14} />
                    Permissões
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {usuarios.map((usuario, index) => (
                      <motion.div
                        key={usuario.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                            <span className="text-sm font-bold text-orange-600">
                              {usuario.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-foreground">{usuario.nome}</p>
                              {usuario.status === 'ativo' ? (
                                <CheckCircle2 size={14} className="text-emerald-500" />
                              ) : (
                                <XCircle size={14} className="text-red-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{usuario.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden md:block">
                            <Badge variant="outline" className="mb-1">{usuario.cargo}</Badge>
                            <p className="text-[10px] text-muted-foreground">{usuario.ultimoAcesso}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Logs */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Logs de Atividade</CardTitle>
                <CardDescription>Últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {logsAtividade.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{log.usuario}</p>
                          <p className="text-xs text-muted-foreground truncate">{log.acao}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{log.tempo}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Administrador;
