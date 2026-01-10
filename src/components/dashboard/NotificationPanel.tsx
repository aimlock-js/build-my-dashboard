import { motion } from "framer-motion";
import { Bell, AlertCircle, CheckCircle, Info, X } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Estoque crítico",
    message: "Tela iPhone 13 com apenas 2 unidades",
    time: "5 min",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Pagamento recebido",
    message: "OS #2847 - R$ 890,00 via PIX",
    time: "15 min",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Nova atualização",
    message: "Versão 2.5.0 disponível",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl p-5 card-shadow border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Notificações
          </h3>
          <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <button className="text-xs text-primary font-medium hover:underline">
          Marcar todas lidas
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const config = typeConfig[notification.type as keyof typeof typeConfig];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`flex items-start gap-3 p-3 rounded-xl ${notification.read ? 'bg-muted/30' : 'bg-muted/50'} hover:bg-muted transition-colors cursor-pointer group`}
            >
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={config.color} />
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
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} className="text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
