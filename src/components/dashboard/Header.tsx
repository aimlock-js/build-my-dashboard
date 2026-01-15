import { motion } from "framer-motion";
import { Bell, Calendar, ChevronDown, Search, Settings, Maximize2, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground font-medium">Dashboard</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground font-semibold">Visão Geral</span>
        </nav>
      </div>

      {/* Center - Search */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar OS, motos, peças, clientes..."
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Period Selector */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex items-center gap-2 px-3 py-2 bg-muted/50 text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors border border-border"
        >
          <Calendar size={14} className="text-muted-foreground" />
          <span>Últimos 30 dias</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </motion.button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Quick Actions */}
        <button className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border">
          <Maximize2 size={16} className="text-muted-foreground" />
        </button>

        <Link to="/configuracoes">
          <button className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border">
            <Settings size={16} className="text-muted-foreground" />
          </button>
        </Link>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border">
          <Bell size={16} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-card">
            3
          </span>
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold text-white">
                RC
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-sm font-semibold text-foreground leading-tight">Ricardo Costa</p>
                <p className="text-[11px] text-muted-foreground leading-tight">Gerente</p>
              </div>
              <ChevronDown size={12} className="text-muted-foreground hidden xl:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-sm font-bold text-white">
                  RC
                </div>
                <div>
                  <p className="font-semibold">Ricardo Costa</p>
                  <p className="text-xs text-muted-foreground font-normal">ricardo.costa@mototech.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
