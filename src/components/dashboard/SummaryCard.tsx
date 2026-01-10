import { TrendingDown, TrendingUp } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBg: string;
}

export function SummaryCard({ label, value, change, icon, iconBg }: SummaryCardProps) {
  return (
    <div className="bg-card rounded-xl p-4 metric-card-shadow flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
      <div className="flex items-center gap-1">
        {change.isPositive ? (
          <TrendingUp size={16} className="text-success" />
        ) : (
          <TrendingDown size={16} className="text-destructive" />
        )}
        <span
          className={`text-sm font-medium ${
            change.isPositive ? "text-success" : "text-destructive"
          }`}
        >
          {change.value}
        </span>
      </div>
    </div>
  );
}
