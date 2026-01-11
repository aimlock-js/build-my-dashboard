import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  LogOut,
  Building2,
  Layers,
  Search,
  Command,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "destructive";
}

const menuItems: MenuItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
  { icon: <Users size={18} />, label: "Cadastros", hasSubmenu: true },
  { icon: <FileText size={18} />, label: "Ordens de Serviço", hasSubmenu: true, badge: 5, badgeVariant: "warning" },
  { icon: <BarChart3 size={18} />, label: "Relatórios", hasSubmenu: true },
  { icon: <DollarSign size={18} />, label: "Financeiro", hasSubmenu: true },
  { icon: <Receipt size={18} />, label: "Fiscal", hasSubmenu: true },
];

const bottomMenuItems: MenuItem[] = [
  { icon: <Settings size={18} />, label: "Configurações" },
  { icon: <Shield size={18} />, label: "Administrador" },
];

export function Sidebar() {
  const [selectedCompany] = useState("Tech Solutions");
  const [isCollapsed] = useState(false);

  return (
    <aside className="w-[280px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border/50">
      {/* Logo & Brand */}
      <div className="h-16 px-5 flex items-center border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sidebar-primary to-info flex items-center justify-center">
            <Layers className="text-white" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-bold text-base tracking-tight">DYNOIX</span>
            <span className="text-sidebar-muted text-[10px] font-medium uppercase tracking-wider">Enterprise</span>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="px-4 py-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/50 border border-sidebar-border/50 text-sidebar-muted text-sm hover:bg-sidebar-accent transition-colors group">
          <Search size={15} />
          <span className="flex-1 text-left">Buscar...</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-sidebar-border/50 text-[10px] font-medium">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Company Selector */}
      <div className="px-4 pb-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/30 border border-sidebar-border/30 text-sidebar-foreground text-sm hover:bg-sidebar-accent/50 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary/20 to-info/20 flex items-center justify-center border border-sidebar-primary/30">
            <Building2 size={14} className="text-sidebar-primary" />
          </div>
          <div className="flex-1 text-left">
            <span className="block text-sm font-medium truncate">{selectedCompany}</span>
            <span className="block text-[11px] text-sidebar-muted">3 unidades</span>
          </div>
          <ChevronDown size={14} className="text-sidebar-muted" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="mb-2">
          <span className="px-3 text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider">
            Menu Principal
          </span>
        </div>
        <ul className="space-y-0.5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.active ? "" : "opacity-70 group-hover:opacity-100"}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                      item.badgeVariant === "warning" 
                        ? "bg-warning text-warning-foreground" 
                        : item.badgeVariant === "success"
                        ? "bg-success text-success-foreground"
                        : "bg-sidebar-primary text-sidebar-primary-foreground"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.hasSubmenu && <ChevronRight size={14} className="opacity-50" />}
                </div>
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Bottom Menu */}
        <div className="mt-6 mb-2">
          <span className="px-3 text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider">
            Sistema
          </span>
        </div>
        <ul className="space-y-0.5">
          {bottomMenuItems.map((item, index) => (
            <li key={index}>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors">
                <span className="opacity-60">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Card */}
      <div className="px-4 py-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-sidebar-accent/80 to-sidebar-accent/40 border border-sidebar-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
              <HelpCircle size={16} className="text-sidebar-primary" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">Precisa de ajuda?</span>
          </div>
          <p className="text-xs text-sidebar-muted mb-3">Acesse nossa central de suporte</p>
          <button className="w-full py-2 bg-sidebar-primary/10 text-sidebar-primary text-xs font-semibold rounded-lg hover:bg-sidebar-primary/20 transition-colors border border-sidebar-primary/30">
            Central de Ajuda
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sidebar-primary/30 to-info/30 flex items-center justify-center border border-sidebar-primary/20">
            <span className="text-sm font-bold text-sidebar-foreground">JS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">João Silva</p>
            <p className="text-[11px] text-sidebar-muted">Administrador</p>
          </div>
          <button className="p-2 rounded-lg text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}