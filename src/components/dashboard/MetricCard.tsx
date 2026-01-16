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
    iconBg: "bg-info/15",
    iconColor: "text-info",
    indicator: "bg-info",
    glow: "group-hover:shadow-[0_0_20px_hsl(217_91%_60%/0.15)]",
  },
  green: {
    iconBg: "bg-success/15",
    iconColor: "text-success",
    indicator: "bg-success",
    glow: "group-hover:shadow-[0_0_20px_hsl(142_71%_45%/0.15)]",
  },
  yellow: {
    iconBg: "bg-warning/15",
    iconColor: "text-warning",
    indicator: "bg-warning",
    glow: "group-hover:shadow-[0_0_20px_hsl(38_92%_50%/0.15)]",
  },
  purple: {
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    indicator: "bg-primary",
    glow: "group-hover:shadow-[0_0_20px_hsl(262_83%_58%/0.15)]",
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
      whileHover={{ y: -3 }}
      className={`group bg-card rounded-2xl p-5 card-shadow relative overflow-hidden border border-border transition-all duration-300 ${colors.glow}`}
    >
      {/* Left accent indicator */}
      <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${colors.indicator}`} />

      <div className="pl-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                <span className={colors.iconColor}>{icon}</span>
              </div>
            )}
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{title}</span>
          </div>
          <TrendingUp size={14} className="text-muted-foreground/30" />
        </div>

        {/* Value */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {change && (
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
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
          )}

          {previousValue && (
            <p className="text-xs text-muted-foreground">
              Anterior: <span className="font-medium text-foreground/70">{previousValue}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
