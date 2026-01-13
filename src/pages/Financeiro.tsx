import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  PiggyBank,
  Calendar,
  Download
} from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const receitaData = [
  { name: "Jan", receita: 65000, despesa: 42000 },
  { name: "Fev", receita: 72000, despesa: 45000 },
  { name: "Mar", receita: 68000, despesa: 41000 },
  { name: "Abr", receita: 85000, despesa: 52000 },
  { name: "Mai", receita: 78000, despesa: 48000 },
  { name: "Jun", receita: 89450, despesa: 51210 },
];

const transacoes = [
  { id: 1, descricao: "OS-2024-003 - Honda CB 300R", tipo: "entrada", valor: 890.00, data: "10/01/2024", metodo: "PIX" },
  { id: 2, descricao: "Compra Peças - Fornecedor Cofap", tipo: "saida", valor: 1250.00, data: "10/01/2024", metodo: "Boleto" },
  { id: 3, descricao: "OS-2024-005 - BMW G 310 R", tipo: "entrada", valor: 320.00, data: "10/01/2024", metodo: "Cartão" },
  { id: 4, descricao: "Aluguel do Galpão", tipo: "saida", valor: 3500.00, data: "09/01/2024", metodo: "Boleto" },
  { id: 5, descricao: "OS-2024-001 - Honda CG 160", tipo: "entrada", valor: 450.00, data: "09/01/2024", metodo: "Dinheiro" },
];

const Financeiro = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
              <p className="text-sm text-muted-foreground">Controle financeiro da oficina</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar size={16} />
                Janeiro 2024
              </Button>
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Exportar
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
              <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Receita Total</p>
                      <p className="text-2xl font-bold text-emerald-600">R$ 89.450,00</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight size={14} className="text-emerald-500" />
                        <span className="text-xs text-emerald-600">+18,5% vs mês anterior</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp size={24} className="text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border/50 bg-gradient-to-br from-red-500/10 to-red-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Despesas</p>
                      <p className="text-2xl font-bold text-red-600">R$ 51.210,00</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowDownRight size={14} className="text-emerald-500" />
                        <span className="text-xs text-emerald-600">-8,4% vs mês anterior</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <TrendingDown size={24} className="text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                      <p className="text-2xl font-bold text-blue-600">R$ 38.240,00</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight size={14} className="text-emerald-500" />
                        <span className="text-xs text-emerald-600">+22,3% vs mês anterior</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <PiggyBank size={24} className="text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">A Receber</p>
                      <p className="text-2xl font-bold text-purple-600">R$ 12.580,00</p>
                      <p className="text-xs text-muted-foreground mt-1">8 faturas pendentes</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <Wallet size={24} className="text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Chart */}
          <Card className="mb-6 border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Evolução Financeira</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={receitaData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `R$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                    />
                    <Area type="monotone" dataKey="receita" stroke="#22c55e" fillOpacity={1} fill="url(#colorReceita)" name="Receita" />
                    <Area type="monotone" dataKey="despesa" stroke="#ef4444" fillOpacity={1} fill="url(#colorDespesa)" name="Despesa" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Últimas Transações</CardTitle>
              <Button variant="outline" size="sm">Ver todas</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {transacoes.map((transacao, index) => (
                  <motion.div
                    key={transacao.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transacao.tipo === 'entrada' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                      }`}>
                        {transacao.tipo === 'entrada' ? (
                          <ArrowUpRight size={18} className="text-emerald-600" />
                        ) : (
                          <ArrowDownRight size={18} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{transacao.descricao}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{transacao.data}</span>
                          <span>•</span>
                          <span>{transacao.metodo}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      transacao.tipo === 'entrada' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transacao.tipo === 'entrada' ? '+' : '-'} R$ {transacao.valor.toFixed(2).replace('.', ',')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Financeiro;
