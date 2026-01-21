import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  ChevronRight,
  Bike,
  LogOut,
  HelpCircle,
  MessageCircle,
  Power,
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
        label: "Operações",
        children: [
          { label: "Ordens de Serviço", path: "/ordens-servico" },
          { label: "Clientes", path: "/clientes" },
          { label: "Frota de Motos", path: "/motos" },
        ]
      },
      { 
        icon: <FileText size={18} />, 
        label: "Estoque",
        children: [
          { label: "Peças e Componentes", path: "/pecas-estoque" },
          { label: "Fornecedores", path: "/fornecedores" },
        ]
      },
    ]
  },
  {
    label: "FINANCEIRO",
    items: [
      { 
        icon: <FileText size={18} />, 
        label: "Controle Financeiro",
        path: "/financeiro"
      },
      { 
        icon: <FileText size={18} />, 
        label: "Faturamento",
        children: [
          { label: "Notas Fiscais", path: "/fiscal" },
          { label: "Contas a Receber", path: "/contas-receber" },
          { label: "Contas a Pagar", path: "/contas-pagar" },
        ]
      },
    ]
  },
  {
    label: "ANÁLISES",
    items: [
      { 
        icon: <FileText size={18} />, 
        label: "Relatórios", 
        path: "/relatorios" 
      },
    ]
  },
  {
    label: "SISTEMA",
    items: [
      { 
        icon: <FileText size={18} />, 
        label: "Configurações", 
        path: "/configuracoes" 
      },
      { 
        icon: <FileText size={18} />, 
        label: "Administração", 
        path: "/administrador" 
      },
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Cadastros"]);

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
    <aside className="w-[220px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Bike className="text-white" size={16} />
          </div>
          <span className="text-sidebar-foreground font-bold text-sm">MOTOTECH</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={group.label} className={groupIndex > 0 ? "mt-6" : ""}>
            <p className="px-3 mb-2 text-[10px] font-semibold text-sidebar-muted tracking-wider">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.includes(item.label);
                const itemActive = isActive(item.path) || isChildActive(item);

                return (
                  <li key={item.label}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                            itemActive
                              ? "bg-sidebar-accent text-sidebar-foreground"
                              : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={itemActive ? "text-primary" : ""}>{item.icon}</span>
                            <span>{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <ChevronRight size={14} className="text-sidebar-muted" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              {item.children?.map((child) => {
                                const childActive = isActive(child.path);
                                return (
                                  <li key={child.label}>
                                    <Link to={child.path}>
                                      <div
                                        className={`flex items-center gap-2.5 pl-10 pr-3 py-2 text-sm transition-all ${
                                          childActive
                                            ? "text-primary font-medium"
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
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                            itemActive
                              ? "bg-sidebar-accent text-sidebar-foreground"
                              : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          }`}
                        >
                          <span className={itemActive ? "text-primary" : ""}>{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-1">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
          <Power size={18} />
          <span>Sair</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
          <HelpCircle size={18} />
          <span>Ajuda</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
          <MessageCircle size={18} />
          <span>Feedback</span>
        </button>
      </div>

      {/* Version */}
      <div className="px-5 py-3 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-muted">Versão 1.0</p>
      </div>
    </aside>
  );
}
