import { useState } from "react";
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
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
  { icon: <Users size={20} />, label: "Cadastros", hasSubmenu: true },
  { icon: <FileText size={20} />, label: "O.S.", hasSubmenu: true },
  { icon: <BarChart3 size={20} />, label: "Relatórios", hasSubmenu: true },
  { icon: <DollarSign size={20} />, label: "Financeiro", hasSubmenu: true },
  { icon: <Receipt size={20} />, label: "Fiscal", hasSubmenu: true },
  { icon: <Settings size={20} />, label: "Configurações", hasSubmenu: true },
  { icon: <Shield size={20} />, label: "Administrador", hasSubmenu: true },
];

export function Sidebar() {
  const [selectedCompany, setSelectedCompany] = useState("Selecionar empresa");

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-sidebar to-sidebar/95 flex flex-col relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sidebar-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

      {/* Logo */}
      <div className="p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-sidebar-primary/25">
            <Sparkles className="text-sidebar-primary-foreground" size={20} />
          </div>
          <div className="flex items-baseline">
            <span className="text-sidebar-foreground font-bold text-2xl tracking-tight">DYNOI</span>
            <span className="text-sidebar-primary font-extrabold text-2xl">X</span>
          </div>
        </div>
      </div>

      {/* Company Selector */}
      <div className="px-4 mb-6 relative">
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sidebar-accent/50 border border-sidebar-border text-sidebar-foreground text-sm font-medium hover:bg-sidebar-accent transition-all duration-200">
          <span className="truncate">{selectedCompany}</span>
          <ChevronDown size={16} className="shrink-0 ml-2" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 relative">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/90 text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.active ? "" : "opacity-70"}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronDown size={16} className="opacity-50" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Button */}
      <div className="px-4 mb-4 relative">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sidebar-primary via-sidebar-primary to-warning text-sidebar-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-sidebar-primary/20">
          <HelpCircle size={18} />
          <span>Quero ajuda</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-sidebar-border/50 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sidebar-muted text-sm">
            <Globe size={16} />
            <span>PT-BR</span>
          </div>
          <button className="flex items-center gap-2 text-sidebar-muted text-sm hover:text-sidebar-foreground transition-colors">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
