import { HelpCircle, TrendingDown, TrendingUp } from "lucide-react";

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
  blue: "bg-metric-blue",
  green: "bg-metric-green",
  yellow: "bg-metric-yellow",
  purple: "bg-metric-purple",
};

export function MetricCard({
  title,
  value,
  change,
  previousValue,
  accentColor,
  icon,
}: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 metric-card-shadow relative overflow-hidden">
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColors[accentColor]}`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={`w-6 h-6 rounded-full ${accentColors[accentColor]} flex items-center justify-center`}>
              <span className="text-white text-xs">{icon}</span>
            </div>
          )}
          <span className="text-muted-foreground text-sm font-medium">{title}</span>
          <HelpCircle size={14} className="text-muted-foreground/50" />
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>

      {/* Change indicator */}
      {change && (
        <div className="flex items-center gap-1 mb-2">
          {change.isPositive ? (
            <TrendingUp size={14} className="text-success" />
          ) : (
            <TrendingDown size={14} className="text-destructive" />
          )}
          <span
            className={`text-sm font-medium ${
              change.isPositive ? "text-success" : "text-destructive"
            }`}
          >
            {change.value}
          </span>
        </div>
      )}

      {/* Previous value */}
      {previousValue && (
        <p className="text-xs text-muted-foreground">
          Período anterior: {previousValue}
        </p>
      )}
    </div>
  );
}
