import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StatusItem {
  label: string;
  value: number;
  color?: string;
}

const statusItems: StatusItem[] = [
  { label: "Pendentes", value: 3 },
  { label: "Em Conserto", value: 5 },
  { label: "Aguard. Peças", value: 2 },
  { label: "Prontas", value: 8 },
];

const totalOrders = statusItems.reduce((sum, item) => sum + item.value, 0);
const atrasadas = 1;

export function OrderSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl border border-border p-6 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-foreground">Resumo das Ordens de Serviço</h3>
        <Link 
          to="/ordens-servico"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver todas <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {statusItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="border-r border-border last:border-0 pr-4"
            >
              <p className="text-muted-foreground text-sm mb-2">{item.label}</p>
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          {statusItems.map((item, index) => {
            const percentage = totalOrders > 0 ? (item.value / totalOrders) * 100 : 0;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 truncate">{item.label}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-24 truncate">Atrasadas</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(atrasadas / totalOrders) * 100}%` }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="h-full bg-destructive rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Atrasadas Warning */}
      {atrasadas > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-between py-4 px-5 rounded-xl bg-destructive/10 border border-destructive/20"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-destructive" />
            <span className="text-destructive font-medium">Atrasadas</span>
          </div>
          <span className="text-2xl font-bold text-destructive">{atrasadas}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
