import { HelpCircle, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
}

const accentColors = {
  blue: {
    bg: "bg-gradient-to-br from-info/20 to-info/5",
    bar: "bg-gradient-to-r from-info to-info/70",
    iconBg: "bg-info/15",
    iconColor: "text-info",
  },
  green: {
    bg: "bg-gradient-to-br from-success/20 to-success/5",
    bar: "bg-gradient-to-r from-success to-success/70",
    iconBg: "bg-success/15",
    iconColor: "text-success",
  },
  yellow: {
    bg: "bg-gradient-to-br from-warning/20 to-warning/5",
    bar: "bg-gradient-to-r from-warning to-warning/70",
    iconBg: "bg-warning/15",
    iconColor: "text-warning",
  },
  purple: {
    bg: "bg-gradient-to-br from-primary/20 to-primary/5",
    bar: "bg-gradient-to-r from-primary to-primary/70",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
};

export function MetricCard({
  title,
  value,
  change,
  previousValue,
  accentColor,
  icon,
}: MetricCardProps) {
  const colors = accentColors[accentColor];

  return (
    <div className="group bg-card rounded-2xl p-5 card-shadow relative overflow-hidden border border-border/50 hover:card-shadow-hover hover:border-border transition-all duration-300">
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bar}`} />
      
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                <span className={`${colors.iconColor}`}>{icon}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{title}</span>
              <HelpCircle size={12} className="text-muted-foreground/40" />
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="mb-3">
          <span className="text-3xl font-extrabold text-foreground tracking-tight">{value}</span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center justify-between">
          {change && (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
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
            </div>
          )}

          {/* Previous value */}
          {previousValue && (
            <p className="text-xs text-muted-foreground">
              Ant: <span className="font-medium">{previousValue}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
