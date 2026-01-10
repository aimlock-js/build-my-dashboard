import { motion } from "framer-motion";
import { Plus, FileText, Users, Package, Calculator, Zap } from "lucide-react";

const actions = [
  { icon: Plus, label: "Nova OS", color: "from-primary to-primary/80", description: "Criar ordem" },
  { icon: Users, label: "Cliente", color: "from-info to-info/80", description: "Novo cadastro" },
  { icon: Package, label: "Produto", color: "from-success to-success/80", description: "Adicionar" },
  { icon: FileText, label: "Orçamento", color: "from-warning to-warning/80", description: "Gerar novo" },
  { icon: Calculator, label: "Financeiro", color: "from-destructive to-destructive/80", description: "Lançamento" },
  { icon: Zap, label: "Atalhos", color: "from-primary to-info", description: "Mais ações" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function QuickActions() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6"
    >
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          variants={item}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <action.icon size={22} className="text-white" />
          </div>
          <div className="text-center">
            <span className="block text-sm font-semibold text-foreground">{action.label}</span>
            <span className="block text-xs text-muted-foreground">{action.description}</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
