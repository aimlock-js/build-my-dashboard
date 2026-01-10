import { FileText, User, CheckCircle, Clock, AlertCircle, Package } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "order" | "customer" | "completed" | "pending" | "alert";
  title: string;
  description: string;
  time: string;
  value?: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "completed",
    title: "OS #2847 Finalizada",
    description: "Reparo de iPhone 14 Pro Max - Tela",
    time: "Há 5 minutos",
    value: "R$ 890,00",
  },
  {
    id: "2",
    type: "customer",
    title: "Novo cliente cadastrado",
    description: "Maria Santos - (11) 99876-5432",
    time: "Há 15 minutos",
  },
  {
    id: "3",
    type: "order",
    title: "Nova OS #2848 criada",
    description: "Manutenção Notebook Dell - Formatação",
    time: "Há 32 minutos",
    value: "R$ 150,00",
  },
  {
    id: "4",
    type: "pending",
    title: "OS #2845 aguardando peça",
    description: "Display Samsung Galaxy S23",
    time: "Há 1 hora",
  },
  {
    id: "5",
    type: "completed",
    title: "OS #2844 Finalizada",
    description: "Troca de bateria MacBook Pro",
    time: "Há 2 horas",
    value: "R$ 650,00",
  },
  {
    id: "6",
    type: "alert",
    title: "Estoque baixo",
    description: "Tela iPhone 13 - Apenas 2 unidades",
    time: "Há 3 horas",
  },
];

const typeConfig = {
  order: {
    icon: FileText,
    iconBg: "bg-info/15",
    iconColor: "text-info",
    dotColor: "bg-info",
  },
  customer: {
    icon: User,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    dotColor: "bg-primary",
  },
  completed: {
    icon: CheckCircle,
    iconBg: "bg-success/15",
    iconColor: "text-success",
    dotColor: "bg-success",
  },
  pending: {
    icon: Clock,
    iconBg: "bg-warning/15",
    iconColor: "text-warning",
    dotColor: "bg-warning",
  },
  alert: {
    icon: AlertCircle,
    iconBg: "bg-destructive/15",
    iconColor: "text-destructive",
    dotColor: "bg-destructive",
  },
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Package size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Atividade Recente</h3>
            <p className="text-sm text-muted-foreground">Últimas atualizações do sistema</p>
          </div>
        </div>
        <button className="text-sm text-primary font-medium hover:underline transition-all">
          Ver tudo
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="group relative flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer"
            >
              {/* Timeline connector */}
              {index < activities.length - 1 && (
                <div className="absolute left-[26px] top-14 w-0.5 h-8 bg-border" />
              )}

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={config.iconColor} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  </div>
                  {activity.value && (
                    <span className="text-sm font-semibold text-success shrink-0">
                      {activity.value}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
