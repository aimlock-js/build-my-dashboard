import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wrench,
  Package,
  Bike,
  Users,
  DollarSign,
  BarChart3,
  Receipt,
  Settings,
  Shield,
  ChevronDown,
  Search,
  LogOut,
  User,
  FileText,
  Boxes,
  ClipboardList,
  Sparkles,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  badge?: number;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { 
    icon: <LayoutDashboard size={18} />, 
    label: "Dashboard", 
    path: "/" 
  },
  { 
    icon: <ClipboardList size={18} />, 
    label: "Cadastros",
    children: [
      { icon: <Users size={16} />, label: "Clientes", path: "/clientes" },
      { icon: <Wrench size={16} />, label: "Serviços", path: "/ordens-servico" },
      { icon: <Package size={16} />, label: "Peças", path: "/pecas-estoque" },
      { icon: <Bike size={16} />, label: "Motos", path: "/motos" },
    ]
  },
  { 
    icon: <FileText size={18} />, 
    label: "O.S.", 
    path: "/ordens-servico",
    badge: 8
  },
  { 
    icon: <BarChart3 size={18} />, 
    label: "Relatórios",
    children: [
      { icon: <BarChart3 size={16} />, label: "Geral", path: "/relatorios" },
      { icon: <DollarSign size={16} />, label: "Financeiro", path: "/relatorios?tab=financeiro" },
      { icon: <Boxes size={16} />, label: "Estoque", path: "/relatorios?tab=estoque" },
    ]
  },
  { 
    icon: <DollarSign size={18} />, 
    label: "Financeiro",
    children: [
      { icon: <DollarSign size={16} />, label: "Visão Geral", path: "/financeiro" },
      { icon: <Receipt size={16} />, label: "Contas a Pagar", path: "/financeiro?tab=pagar" },
      { icon: <Receipt size={16} />, label: "Contas a Receber", path: "/financeiro?tab=receber" },
    ]
  },
  { 
    icon: <Receipt size={18} />, 
    label: "Fiscal", 
    path: "/fiscal" 
  },
  { 
    icon: <Settings size={18} />, 
    label: "Configurações",
    children: [
      { icon: <Settings size={16} />, label: "Sistema", path: "/configuracoes" },
      { icon: <User size={16} />, label: "Perfil", path: "/perfil" },
    ]
  },
  { 
    icon: <Shield size={18} />, 
    label: "Administrador",
    children: [
      { icon: <Shield size={16} />, label: "Usuários", path: "/administrador" },
      { icon: <Settings size={16} />, label: "Permissões", path: "/administrador?tab=permissoes" },
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Cadastros"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  const isChildActive = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some(child => isActive(child.path));
  };

  return (
    <aside className="w-[260px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <Bike className="text-white" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-bold text-sm tracking-tight">MOTOTECH</span>
            <span className="text-sidebar-muted text-[10px] font-medium">Sistema de Gestão</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-sidebar-accent/50 border border-sidebar-border text-sidebar-muted text-sm transition-all focus-within:border-primary/50 focus-within:bg-sidebar-accent">
          <Search size={15} className="text-sidebar-muted" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sidebar-foreground placeholder:text-sidebar-muted text-sm"
          />
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-sidebar-border text-sidebar-muted">⌘K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.label);
            const itemActive = isActive(item.path) || isChildActive(item);

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        itemActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={itemActive ? "text-primary" : "opacity-70"}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} className="opacity-50" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-4 mt-1 border-l-2 border-sidebar-border"
                        >
                          {item.children?.map((child) => {
                            const childActive = isActive(child.path);
                            return (
                              <li key={child.label}>
                                <Link to={child.path || "#"}>
                                  <div
                                    className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-all duration-200 ${
                                      childActive
                                        ? "text-primary font-medium border-l-2 border-primary -ml-[2px]"
                                        : "text-sidebar-muted hover:text-sidebar-foreground"
                                    }`}
                                  >
                                    <span>{child.label}</span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={item.path || "#"}>
                    <div
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        itemActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={itemActive ? "text-primary" : "opacity-70"}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Badge */}
      <div className="px-4 py-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">Upgrade Pro</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Desbloqueie recursos avançados
          </p>
          <button className="w-full py-2 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            Saiba mais
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">RC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Ricardo Costa</p>
            <p className="text-[11px] text-sidebar-muted truncate">Gerente</p>
          </div>
          <LogOut size={16} className="text-sidebar-muted hover:text-primary transition-colors" />
        </div>
      </div>
    </aside>
  );
}
