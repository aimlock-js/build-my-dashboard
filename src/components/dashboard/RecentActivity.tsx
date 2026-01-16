import { motion } from "framer-motion";
import { FileText, User, CheckCircle, Clock, AlertCircle, MoreHorizontal } from "lucide-react";

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
    title: "OS #1847 Finalizada",
    description: "Honda CG 160 - Troca de Kit Relação",
    time: "5 min",
    value: "R$ 380,00",
  },
  {
    id: "2",
    type: "customer",
    title: "Novo cliente cadastrado",
    description: "Carlos Mendes - Honda Bros 160",
    time: "15 min",
  },
  {
    id: "3",
    type: "order",
    title: "Nova OS #1848",
    description: "Yamaha Fazer 250 - Revisão Completa",
    time: "32 min",
    value: "R$ 450,00",
  },
  {
    id: "4",
    type: "pending",
    title: "OS #1845 aguardando peça",
    description: "Kit Carenagem CB 300",
    time: "1h",
  },
  {
    id: "5",
    type: "alert",
    title: "Estoque baixo",
    description: "Óleo 10W40 - Apenas 3 litros",
    time: "3h",
  },
];

const typeConfig = {
  order: {
    icon: FileText,
    iconBg: "bg-info/15",
    iconColor: "text-info",
  },
  customer: {
    icon: User,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  completed: {
    icon: CheckCircle,
    iconBg: "bg-success/15",
    iconColor: "text-success",
  },
  pending: {
    icon: Clock,
    iconBg: "bg-warning/15",
    iconColor: "text-warning",
  },
  alert: {
    icon: AlertCircle,
    iconBg: "bg-destructive/15",
    iconColor: "text-destructive",
  },
};

export function RecentActivity() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 card-shadow border border-border h-full"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Atividade Recente</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Últimas atualizações</p>
        </div>
        <button className="p-2 rounded-xl hover:bg-muted transition-colors">
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={config.iconColor} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {activity.title}
                  </p>
                  {activity.value && (
                    <span className="text-xs font-semibold text-success shrink-0">
                      {activity.value}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                  <span className="text-xs text-muted-foreground/50">• {activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-xl transition-colors">
        Ver todas as atividades
      </button>
    </motion.div>
  );
}
