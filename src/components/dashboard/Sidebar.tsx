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
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-lg">D</span>
          </div>
          <span className="text-sidebar-foreground font-bold text-xl">DYNOI</span>
          <span className="text-sidebar-primary font-bold text-xl">X</span>
        </div>
      </div>

      {/* Company Selector */}
      <div className="px-4 mb-6">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-foreground text-sm hover:bg-sidebar-accent/80 transition-colors">
          <span>{selectedCompany}</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronDown size={16} />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Button */}
      <div className="px-3 mb-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <HelpCircle size={20} />
          <span>Quero ajuda</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-muted text-sm mb-3">
          <Globe size={16} />
          <span>Português (BR)</span>
        </div>
        <button className="flex items-center gap-2 text-sidebar-muted text-sm hover:text-sidebar-foreground transition-colors">
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
