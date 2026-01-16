import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBg: string;
  index?: number;
}

export function SummaryCard({ label, value, change, icon, iconBg, index = 0 }: SummaryCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
      className="bg-card rounded-2xl p-5 card-shadow flex items-center gap-4 border border-border hover:border-primary/20 transition-all duration-300 group hover-glow"
    >
      <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-1">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
        change.isPositive 
          ? "bg-success/15 text-success" 
          : "bg-destructive/15 text-destructive"
      }`}>
        {change.isPositive ? (
          <ArrowUpRight size={12} />
        ) : (
          <ArrowDownRight size={12} />
        )}
        {change.value}
      </div>
    </motion.div>
  );
}
