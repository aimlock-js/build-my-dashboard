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
}

export function SummaryCard({ label, value, change, icon, iconBg }: SummaryCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow flex items-center gap-4 border border-border/50 hover:card-shadow-hover transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-0.5">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
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
    </div>
  );
}
