import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function VisitorsCard() {
  const visitors = 47;
  const growth = 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6 flex flex-col"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Clientes Atendidos</h3>
        <p className="text-sm text-muted-foreground">Estes dados são calculados uma vez por dia</p>
      </div>

      {/* Circular Progress */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={440}
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (440 * 0.75) }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="text-4xl font-bold text-foreground"
            >
              {visitors}
            </motion.span>
            <span className="text-sm text-muted-foreground">clientes</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-success">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">Crescimento de mais de {growth}% em comparação</span>
        </div>
        <p className="text-xs text-muted-foreground">Mostrando clientes totais do mês atual</p>
      </div>
    </motion.div>
  );
}
