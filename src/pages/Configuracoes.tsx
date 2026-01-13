import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Building2, 
  Bell, 
  Palette,
  Shield,
  Database,
  Mail,
  Printer,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const configSections = [
  {
    id: "empresa",
    titulo: "Dados da Empresa",
    descricao: "Informações da oficina, logo e dados fiscais",
    icon: Building2,
  },
  {
    id: "notificacoes",
    titulo: "Notificações",
    descricao: "Alertas, lembretes e comunicações",
    icon: Bell,
  },
  {
    id: "aparencia",
    titulo: "Aparência",
    descricao: "Tema, cores e personalização visual",
    icon: Palette,
  },
  {
    id: "seguranca",
    titulo: "Segurança",
    descricao: "Senhas, autenticação e permissões",
    icon: Shield,
  },
  {
    id: "backup",
    titulo: "Backup e Dados",
    descricao: "Backup automático e exportação",
    icon: Database,
  },
  {
    id: "email",
    titulo: "E-mail e SMS",
    descricao: "Configurações de envio de mensagens",
    icon: Mail,
  },
  {
    id: "impressao",
    titulo: "Impressão",
    descricao: "Impressoras e modelos de documentos",
    icon: Printer,
  },
  {
    id: "pagamento",
    titulo: "Formas de Pagamento",
    descricao: "Métodos de pagamento aceitos",
    icon: CreditCard,
  },
];

const Configuracoes = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
            <p className="text-sm text-muted-foreground">Personalize o sistema conforme suas necessidades</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Config Sections */}
            <div className="xl:col-span-2 space-y-4">
              {configSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 hover:shadow-md hover:border-orange-500/30 transition-all cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform">
                          <section.icon size={20} className="text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{section.titulo}</h3>
                          <p className="text-sm text-muted-foreground">{section.descricao}</p>
                        </div>
                        <ChevronRight size={20} className="text-muted-foreground group-hover:text-orange-500 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Settings */}
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Configurações Rápidas</CardTitle>
                  <CardDescription>Ajustes mais utilizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Notificações Push</Label>
                      <p className="text-xs text-muted-foreground">Receber alertas do sistema</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Backup Automático</Label>
                      <p className="text-xs text-muted-foreground">Backup diário às 00:00</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Email de OS</Label>
                      <p className="text-xs text-muted-foreground">Enviar email ao finalizar OS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Modo Escuro</Label>
                      <p className="text-xs text-muted-foreground">Tema escuro do sistema</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Informações do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Versão</span>
                    <span className="font-medium">2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última atualização</span>
                    <span className="font-medium">10/01/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Licença</span>
                    <span className="font-medium text-emerald-600">Ativa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validade</span>
                    <span className="font-medium">15/12/2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
