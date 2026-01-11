import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertTriangle, Wrench, Package } from "lucide-react";

const statuses = [
  { 
    label: "Aguardando", 
    count: 8, 
    icon: Clock, 
    color: "text-warning",
    bgColor: "bg-warning/5",
    borderColor: "border-warning/20"
  },
  { 
    label: "Em Reparo", 
    count: 12, 
    icon: Wrench, 
    color: "text-info",
    bgColor: "bg-info/5",
    borderColor: "border-info/20"
  },
  { 
    label: "Aguard. Peça", 
    count: 4, 
    icon: Package, 
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20"
  },
  { 
    label: "Prontas", 
    count: 15, 
    icon: CheckCircle2, 
    color: "text-success",
    bgColor: "bg-success/5",
    borderColor: "border-success/20"
  },
  { 
    label: "Atrasadas", 
    count: 2, 
    icon: AlertTriangle, 
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20"
  },
];

export function StatusOverview() {
  const total = statuses.reduce((acc, s) => acc + s.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl p-5 card-shadow border border-border mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Status das Ordens
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {total} ordens em acompanhamento
          </p>
        </div>
        <button className="text-xs text-primary font-medium hover:underline">
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {statuses.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className={`p-3 rounded-lg ${status.bgColor} border ${status.borderColor} cursor-pointer hover:shadow-sm transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <status.icon size={16} className={status.color} />
              <span className={`text-xl font-bold ${status.color}`}>{status.count}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground truncate">{status.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}