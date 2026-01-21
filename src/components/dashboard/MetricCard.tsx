import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  index?: number;
}

export function MetricCard({
  title,
  value,
  description,
  change,
  index = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group bg-card rounded-2xl p-5 border border-border hover:border-border/80 transition-all duration-300"
    >
      {/* Header with title and badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        
        {change && (
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-success/15 text-success">
            <TrendingUp size={12} />
            {change.value}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-3">
        <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
