import { motion } from "framer-motion";
import { HelpCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
    bg: "bg-gradient-to-br from-info/20 to-info/5",
    bar: "bg-gradient-to-r from-info via-info to-info/50",
    iconBg: "bg-gradient-to-br from-info to-info/70",
    iconColor: "text-white",
    ring: "ring-info/20",
  },
  green: {
    bg: "bg-gradient-to-br from-success/20 to-success/5",
    bar: "bg-gradient-to-r from-success via-success to-success/50",
    iconBg: "bg-gradient-to-br from-success to-success/70",
    iconColor: "text-white",
    ring: "ring-success/20",
  },
  yellow: {
    bg: "bg-gradient-to-br from-warning/20 to-warning/5",
    bar: "bg-gradient-to-r from-warning via-warning to-warning/50",
    iconBg: "bg-gradient-to-br from-warning to-warning/70",
    iconColor: "text-white",
    ring: "ring-warning/20",
  },
  purple: {
    bg: "bg-gradient-to-br from-primary/20 to-primary/5",
    bar: "bg-gradient-to-r from-primary via-primary to-primary/50",
    iconBg: "bg-gradient-to-br from-primary to-primary/70",
    iconColor: "text-white",
    ring: "ring-primary/20",
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
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-card rounded-2xl p-5 card-shadow relative overflow-hidden border border-border/50 hover:border-border hover:shadow-xl transition-all duration-300"
    >
      {/* Top accent bar with glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bar}`} />
      <div className={`absolute top-0 left-0 right-0 h-8 ${colors.bar} opacity-10 blur-xl`} />
      
      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center shadow-lg ring-4 ${colors.ring}`}
              >
                <span className={`${colors.iconColor}`}>{icon}</span>
              </motion.div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{title}</span>
              <HelpCircle size={12} className="text-muted-foreground/40 hover:text-muted-foreground cursor-help transition-colors" />
            </div>
          </div>
        </div>

        {/* Value with number animation effect */}
        <div className="mb-3">
          <span className="text-3xl font-extrabold text-foreground tracking-tight">{value}</span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center justify-between">
          {change && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              change.isPositive 
                ? "bg-success/15 text-success" 
                : "bg-destructive/15 text-destructive"
            }`}>
              {change.isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {change.value}
            </motion.div>
          )}

          {/* Previous value */}
          {previousValue && (
            <p className="text-xs text-muted-foreground">
              Ant: <span className="font-medium">{previousValue}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
