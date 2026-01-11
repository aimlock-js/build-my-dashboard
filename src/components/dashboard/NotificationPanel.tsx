import { motion } from "framer-motion";
import { Bell, AlertCircle, CheckCircle, Info, X, MoreHorizontal } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Estoque crítico",
    message: "Óleo 10W40 com apenas 3 litros",
    time: "5 min",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Pagamento recebido",
    message: "OS #1847 - R$ 380,00 via PIX",
    time: "15 min",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Peça chegou",
    message: "Kit Carenagem CB 300 disponível",
    time: "1h",
    read: true,
  },
];

const typeConfig = {
  alert: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
};

export function NotificationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-5 card-shadow border border-border h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">Notificações</h3>
          <span className="px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification, index) => {
          const config = typeConfig[notification.type as keyof typeof typeConfig];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`flex items-start gap-3 p-3 rounded-lg ${notification.read ? 'bg-muted/30' : 'bg-muted/50'} hover:bg-muted transition-colors cursor-pointer group`}
            >
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.message}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <X size={12} className="text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 inline-block">{notification.time}</span>
              </div>
              {!notification.read && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              )}
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-3 py-2 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
        Ver todas as notificações
      </button>
    </motion.div>
  );
}