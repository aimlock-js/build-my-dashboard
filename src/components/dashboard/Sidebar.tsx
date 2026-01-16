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
  ChevronRight,
  Search,
  LogOut,
  User,
  FileText,
  Boxes,
  ClipboardList,
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
      <div className="h-14 px-4 flex items-center border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <Bike className="text-background" size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-semibold text-sm tracking-tight">MOTOTECH</span>
            <span className="text-sidebar-muted text-[10px] font-medium">Gestão de Oficina</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-muted text-sm">
          <Search size={14} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sidebar-foreground placeholder:text-sidebar-muted text-sm"
          />
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-sidebar-border">⌘K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto">
        <ul className="space-y-0.5">
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        itemActive
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-70">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.15 }}
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
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden ml-3 mt-0.5 border-l border-sidebar-border"
                        >
                          {item.children?.map((child) => {
                            const childActive = isActive(child.path);
                            return (
                              <li key={child.label}>
                                <Link to={child.path || "#"}>
                                  <div
                                    className={`flex items-center gap-2 px-4 py-1.5 text-sm transition-colors ${
                                      childActive
                                        ? "text-foreground font-medium"
                                        : "text-sidebar-muted hover:text-sidebar-foreground"
                                    }`}
                                  >
                                    {childActive && (
                                      <span className="w-1 h-1 rounded-full bg-foreground mr-1" />
                                    )}
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
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        itemActive
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-70">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-warning text-warning-foreground">
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

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User size={14} className="text-sidebar-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Ricardo Costa</p>
            <p className="text-[11px] text-sidebar-muted truncate">Gerente</p>
          </div>
          <LogOut size={14} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors" />
        </div>
      </div>
    </aside>
  );
}
