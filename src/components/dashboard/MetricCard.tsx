import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  previousValue?: string;
  accentColor: "blue" | "green" | "yellow" | "purple";
  icon?: React.ReactNode;
  index?: number;
}

const accentColors = {
  blue: {
    iconBg: "bg-info/10",
    iconColor: "text-info",
    indicator: "bg-info",
  },
  green: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    indicator: "bg-success",
  },
  yellow: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    indicator: "bg-warning",
  },
  purple: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    indicator: "bg-primary",
  },
};

export function MetricCard({
  title,
  value,
  change,
  previousValue,
  accentColor,
  icon,
  index = 0,
}: MetricCardProps) {
  const colors = accentColors[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="group bg-card rounded-xl p-5 card-shadow relative overflow-hidden border border-border hover:shadow-lg transition-all duration-200"
    >
      {/* Left accent indicator */}
      <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${colors.indicator}`} />

      <div className="pl-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                <span className={colors.iconColor}>{icon}</span>
              </div>
            )}
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{title}</span>
          </div>
          <TrendingUp size={14} className="text-muted-foreground/40" />
        </div>

        {/* Value */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {change && (
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
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
          )}

          {previousValue && (
            <p className="text-xs text-muted-foreground">
              Anterior: <span className="font-medium">{previousValue}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}