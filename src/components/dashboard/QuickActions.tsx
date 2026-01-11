import { motion } from "framer-motion";
import { Plus, FileText, Users, Package, Calculator, Download } from "lucide-react";

const actions = [
  { icon: Plus, label: "Nova OS", shortcut: "N" },
  { icon: Users, label: "Novo Cliente", shortcut: "C" },
  { icon: Package, label: "Produto", shortcut: "P" },
  { icon: FileText, label: "Orçamento", shortcut: "O" },
  { icon: Calculator, label: "Financeiro", shortcut: "F" },
  { icon: Download, label: "Exportar", shortcut: "E" },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
        Ações Rápidas
      </span>
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-150 group"
        >
          <action.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium text-foreground">{action.label}</span>
          <span className="hidden md:inline-flex items-center justify-center w-5 h-5 rounded bg-muted text-[10px] font-bold text-muted-foreground">
            {action.shortcut}
          </span>
        </motion.button>
      ))}
    </div>
  );
}