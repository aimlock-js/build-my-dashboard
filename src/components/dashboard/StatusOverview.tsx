import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertTriangle, Wrench, Package } from "lucide-react";

const statuses = [
  { 
    label: "Aguardando", 
    count: 12, 
    icon: Clock, 
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30"
  },
  { 
    label: "Em Andamento", 
    count: 8, 
    icon: Wrench, 
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30"
  },
  { 
    label: "Aguard. Peça", 
    count: 5, 
    icon: Package, 
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30"
  },
  { 
    label: "Prontas", 
    count: 15, 
    icon: CheckCircle2, 
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30"
  },
  { 
    label: "Atrasadas", 
    count: 3, 
    icon: AlertTriangle, 
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30"
  },
];

export function StatusOverview() {
  const total = statuses.reduce((acc, s) => acc + s.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl p-5 card-shadow border border-border/50 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Status das Ordens
        </h3>
        <span className="text-sm text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{total}</span>
        </span>
      </div>

      <div className="flex gap-2">
        {statuses.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            className={`flex-1 p-3 rounded-xl ${status.bgColor} border ${status.borderColor} cursor-pointer hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <status.icon size={18} className={status.color} />
              <span className={`text-2xl font-bold ${status.color}`}>{status.count}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground truncate">{status.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden flex">
        {statuses.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ width: 0 }}
            animate={{ width: `${(status.count / total) * 100}%` }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`h-full ${status.bgColor.replace('/10', '')}`}
            style={{ backgroundColor: `hsl(var(--${status.color.replace('text-', '')}))` }}
          />
        ))}
      </div>
    </motion.div>
  );
}
