import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertTriangle, Wrench, Package } from "lucide-react";

const statuses = [
  { 
    label: "Aguardando", 
    count: 8, 
    icon: Clock, 
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    glowColor: "hover:shadow-[0_0_20px_hsl(38_92%_50%/0.15)]"
  },
  { 
    label: "Em Reparo", 
    count: 12, 
    icon: Wrench, 
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30",
    glowColor: "hover:shadow-[0_0_20px_hsl(217_91%_60%/0.15)]"
  },
  { 
    label: "Aguard. Peça", 
    count: 4, 
    icon: Package, 
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "hover:shadow-[0_0_20px_hsl(262_83%_58%/0.15)]"
  },
  { 
    label: "Prontas", 
    count: 15, 
    icon: CheckCircle2, 
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    glowColor: "hover:shadow-[0_0_20px_hsl(142_71%_45%/0.15)]"
  },
  { 
    label: "Atrasadas", 
    count: 2, 
    icon: AlertTriangle, 
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    glowColor: "hover:shadow-[0_0_20px_hsl(0_72%_51%/0.15)]"
  },
];

export function StatusOverview() {
  const total = statuses.reduce((acc, s) => acc + s.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl p-6 card-shadow border border-border mb-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Status das Ordens
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {total} ordens em acompanhamento
          </p>
        </div>
        <button className="text-xs text-primary font-semibold hover:underline">
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {statuses.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -2 }}
            className={`p-4 rounded-xl ${status.bgColor} border ${status.borderColor} cursor-pointer transition-all duration-300 ${status.glowColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <status.icon size={18} className={status.color} />
              <span className={`text-2xl font-bold ${status.color}`}>{status.count}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground truncate">{status.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
