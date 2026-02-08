import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  ChevronRight,
  Bike,
  Power,
  HelpCircle,
  Users,
  Package,
  Wallet,
  Receipt,
  BarChart3,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuGroups = [
  {
    label: "VISÃO GERAL",
    items: [
      { 
        icon: <LayoutDashboard size={18} />, 
        label: "Painel Principal", 
        path: "/" 
      },
    ]
  },
  {
    label: "GESTÃO",
    items: [
      { 
        icon: <FileText size={18} />, 
        label: "Ordens de Serviço",
        path: "/ordens-servico"
      },
      { 
        icon: <Users size={18} />, 
        label: "Clientes",
        path: "/clientes"
      },
      { 
        icon: <Bike size={18} />, 
        label: "Frota de Motos",
        path: "/motos"
      },
      { 
        icon: <Package size={18} />, 
        label: "Peças & Estoque",
        path: "/pecas-estoque"
      },
    ]
  },
  {
    label: "FINANCEIRO",
    items: [
      { 
        icon: <Wallet size={18} />, 
        label: "Controle Financeiro",
        path: "/financeiro"
      },
      { 
        icon: <Receipt size={18} />, 
        label: "Notas Fiscais",
        path: "/fiscal"
      },
    ]
  },
  {
    label: "ANÁLISES",
    items: [
      { 
        icon: <BarChart3 size={18} />, 
        label: "Relatórios", 
        path: "/relatorios" 
      },
    ]
  },
  {
    label: "SISTEMA",
    items: [
      { 
        icon: <Settings size={18} />, 
        label: "Configurações", 
        path: "/configuracoes" 
      },
      { 
        icon: <Shield size={18} />, 
        label: "Administração", 
        path: "/administrador" 
      },
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  return (
    <aside className="w-[240px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border/50">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-sidebar-border/50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg glow-primary-subtle group-hover:glow-primary transition-all duration-300">
            <Bike className="text-white" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-bold text-sm tracking-tight">MOTOTECH</span>
            <span className="text-[10px] text-sidebar-muted font-medium">Sistema de Gestão</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={group.label} className={groupIndex > 0 ? "mt-6" : ""}>
            <p className="px-3 mb-2 text-[10px] font-semibold text-sidebar-muted/70 tracking-widest uppercase">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const itemActive = isActive(item.path);
                const isHovered = hoveredItem === item.label;

                return (
                  <li key={item.label}>
                    <Link 
                      to={item.path || "#"}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.div
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          itemActive
                            ? "text-primary"
                            : "text-sidebar-muted hover:text-sidebar-foreground"
                        }`}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Active indicator */}
                        {itemActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-primary/10 rounded-lg"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        
                        {/* Hover indicator */}
                        <AnimatePresence>
                          {isHovered && !itemActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-sidebar-accent/50 rounded-lg"
                            />
                          )}
                        </AnimatePresence>

                        <span className={`relative z-10 transition-colors duration-200 ${itemActive ? "text-primary" : ""}`}>
                          {item.icon}
                        </span>
                        <span className="relative z-10">{item.label}</span>

                        {/* Active dot */}
                        {itemActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Upgrade Card */}
      <div className="px-3 pb-3">
        <div className="relative overflow-hidden rounded-xl p-4 gradient-primary-subtle border border-primary/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">PRO</span>
            </div>
            <p className="text-xs text-foreground/80 mb-3">Desbloqueie recursos avançados</p>
            <button className="w-full py-2 rounded-lg text-xs font-semibold gradient-primary text-white transition-all hover:opacity-90">
              Fazer Upgrade
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border/50">
        <div className="flex items-center gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all">
            <HelpCircle size={14} />
            <span>Ajuda</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-all">
            <Power size={14} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}