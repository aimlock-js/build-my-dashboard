import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Receipt,
  Settings,
  Shield,
  HelpCircle,
  ChevronDown,
  Globe,
  LogOut,
  Sparkles,
  Crown,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  badge?: string | number;
  badgeColor?: string;
}

const menuItems: MenuItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
  { icon: <Users size={20} />, label: "Cadastros", hasSubmenu: true, badge: "Novo", badgeColor: "bg-success" },
  { icon: <FileText size={20} />, label: "O.S.", hasSubmenu: true, badge: 5, badgeColor: "bg-warning" },
  { icon: <BarChart3 size={20} />, label: "Relatórios", hasSubmenu: true },
  { icon: <DollarSign size={20} />, label: "Financeiro", hasSubmenu: true },
  { icon: <Receipt size={20} />, label: "Fiscal", hasSubmenu: true },
  { icon: <Settings size={20} />, label: "Configurações", hasSubmenu: true },
  { icon: <Shield size={20} />, label: "Administrador", hasSubmenu: true },
];

export function Sidebar() {
  const [selectedCompany, setSelectedCompany] = useState("Tech Solutions LTDA");

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 flex flex-col relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sidebar-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-0 w-24 h-24 bg-info/10 rounded-full blur-xl" />

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 relative"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-sidebar-primary via-warning to-sidebar-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-sidebar-primary/30 animate-pulse">
            <Sparkles className="text-sidebar-primary-foreground" size={22} />
          </div>
          <div className="flex items-baseline">
            <span className="text-sidebar-foreground font-bold text-2xl tracking-tight">DYNOI</span>
            <span className="text-sidebar-primary font-extrabold text-2xl">X</span>
          </div>
          <span className="ml-auto px-2 py-0.5 bg-sidebar-primary/20 text-sidebar-primary text-[10px] font-bold rounded-full">
            PRO
          </span>
        </div>
      </motion.div>

      {/* Company Selector */}
      <div className="px-4 mb-6 relative">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sidebar-accent/50 border border-sidebar-border/50 text-sidebar-foreground text-sm font-medium hover:bg-sidebar-accent/70 hover:border-sidebar-border transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-warning flex items-center justify-center text-[10px] font-bold text-sidebar-primary-foreground">
              TS
            </div>
            <div className="text-left">
              <span className="block text-sm truncate max-w-[140px]">{selectedCompany}</span>
              <span className="text-[10px] text-sidebar-muted">3 lojas</span>
            </div>
          </div>
          <ChevronDown size={16} className="shrink-0 group-hover:rotate-180 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 relative">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  item.active
                    ? "bg-gradient-to-r from-sidebar-primary via-sidebar-primary to-warning/80 text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/30"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${item.active ? "" : "opacity-70 group-hover:opacity-100"} transition-opacity`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`px-2 py-0.5 ${item.badgeColor || 'bg-sidebar-primary'} text-white text-[10px] font-bold rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                  {item.hasSubmenu && <ChevronDown size={16} className="opacity-50" />}
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Upgrade Card */}
      <div className="px-4 mb-3 relative">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-br from-sidebar-accent/80 to-sidebar-accent/40 border border-sidebar-border/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Crown size={16} className="text-warning" />
            <span className="text-sm font-semibold text-sidebar-foreground">Upgrade Pro</span>
          </div>
          <p className="text-xs text-sidebar-muted mb-3">Desbloqueie recursos premium</p>
          <button className="w-full py-2 bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold rounded-lg hover:bg-sidebar-primary/90 transition-colors">
            Ver planos
          </button>
        </motion.div>
      </div>

      {/* Help Button */}
      <div className="px-4 mb-4 relative">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sidebar-primary via-sidebar-primary to-warning text-sidebar-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-sidebar-primary/20"
        >
          <HelpCircle size={18} />
          <span>Quero ajuda</span>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-sidebar-border/30 relative">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sidebar-muted text-sm hover:text-sidebar-foreground transition-colors">
            <Globe size={16} />
            <span>PT-BR</span>
          </button>
          <button className="flex items-center gap-2 text-sidebar-muted text-sm hover:text-destructive transition-colors">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
