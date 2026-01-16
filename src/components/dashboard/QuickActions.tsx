import { motion } from "framer-motion";
import { Plus, Users, Package, Calculator, Download, Bike, Wrench } from "lucide-react";

const actions = [
  { icon: Plus, label: "Nova OS", shortcut: "N", accent: true },
  { icon: Bike, label: "Nova Moto", shortcut: "M" },
  { icon: Package, label: "Peça", shortcut: "P" },
  { icon: Users, label: "Cliente", shortcut: "C" },
  { icon: Calculator, label: "Orçamento", shortcut: "O" },
  { icon: Download, label: "Exportar", shortcut: "E" },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
        Ações Rápidas
      </span>
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 group ${
            action.accent 
              ? "gradient-primary text-white border-transparent glow-primary hover:opacity-90" 
              : "bg-card border-border hover:border-primary/30 hover:bg-primary/5"
          }`}
        >
          <action.icon size={15} className={action.accent ? "text-white" : "text-muted-foreground group-hover:text-primary transition-colors"} />
          <span className={`text-sm font-medium ${action.accent ? "text-white" : "text-foreground"}`}>{action.label}</span>
          <span className={`hidden md:inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold ${
            action.accent 
              ? "bg-white/20 text-white" 
              : "bg-muted text-muted-foreground"
          }`}>
            {action.shortcut}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
