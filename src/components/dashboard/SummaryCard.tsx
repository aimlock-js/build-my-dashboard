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
      className="bg-card rounded-xl p-4 card-shadow flex items-center gap-4 border border-border hover:shadow-md transition-all duration-200 group"
    >
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
        change.isPositive 
          ? "bg-success/10 text-success" 
          : "bg-destructive/10 text-destructive"
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