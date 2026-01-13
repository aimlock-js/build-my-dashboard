import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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
  Search,
  Command,
  Bike,
  Wrench,
  Package,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "destructive";
}

const menuItems: MenuItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/" },
  { icon: <Wrench size={18} />, label: "Ordens de Serviço", path: "/ordens-servico", badge: 8, badgeVariant: "warning" },
  { icon: <Package size={18} />, label: "Peças e Estoque", path: "/pecas-estoque" },
  { icon: <Bike size={18} />, label: "Motos / Veículos", path: "/motos" },
  { icon: <Users size={18} />, label: "Clientes", path: "/clientes" },
  { icon: <DollarSign size={18} />, label: "Financeiro", path: "/financeiro" },
  { icon: <BarChart3 size={18} />, label: "Relatórios", path: "/relatorios" },
  { icon: <Receipt size={18} />, label: "Fiscal", path: "/fiscal" },
];

const bottomMenuItems: MenuItem[] = [
  { icon: <Settings size={18} />, label: "Configurações", path: "/configuracoes" },
  { icon: <Shield size={18} />, label: "Administrador", path: "/administrador" },
];

export function Sidebar() {
  const [selectedCompany] = useState("MotoTech Oficina");
  const location = useLocation();

  return (
    <aside className="w-[280px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border/50">
      {/* Logo & Brand */}
      <div className="h-16 px-5 flex items-center border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Bike className="text-white" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-bold text-base tracking-tight">MOTOTECH</span>
            <span className="text-sidebar-muted text-[10px] font-medium uppercase tracking-wider">Gestão de Oficina</span>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="px-4 py-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/50 border border-sidebar-border/50 text-sidebar-muted text-sm hover:bg-sidebar-accent transition-colors group">
          <Search size={15} />
          <span className="flex-1 text-left">Buscar OS, peça, cliente...</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-sidebar-border/50 text-[10px] font-medium">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Company Selector */}
      <div className="px-4 pb-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/30 border border-sidebar-border/30 text-sidebar-foreground text-sm hover:bg-sidebar-accent/50 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
            <Building2 size={14} className="text-orange-400" />
          </div>
          <div className="flex-1 text-left">
            <span className="block text-sm font-medium truncate">{selectedCompany}</span>
            <span className="block text-[11px] text-sidebar-muted">2 unidades</span>
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
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link to={item.path}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? "" : "opacity-70 group-hover:opacity-100"}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          item.badgeVariant === "warning" 
                            ? "bg-warning text-warning-foreground" 
                            : item.badgeVariant === "success"
                            ? "bg-success text-success-foreground"
                            : "bg-orange-500 text-white"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom Menu */}
        <div className="mt-6 mb-2">
          <span className="px-3 text-[10px] font-semibold text-sidebar-muted uppercase tracking-wider">
            Sistema
          </span>
        </div>
        <ul className="space-y-0.5">
          {bottomMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link to={item.path}>
                  <div className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  }`}>
                    <span className={isActive ? "" : "opacity-60"}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help Card */}
      <div className="px-4 py-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-sidebar-accent/80 to-sidebar-accent/40 border border-sidebar-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <HelpCircle size={16} className="text-orange-400" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">Suporte Técnico</span>
          </div>
          <p className="text-xs text-sidebar-muted mb-3">Dúvidas sobre o sistema?</p>
          <button className="w-full py-2 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded-lg hover:bg-orange-500/20 transition-colors border border-orange-500/30">
            Falar com Suporte
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center border border-orange-500/20">
            <span className="text-sm font-bold text-sidebar-foreground">RC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Ricardo Costa</p>
            <p className="text-[11px] text-sidebar-muted">Gerente</p>
          </div>
          <button className="p-2 rounded-lg text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}