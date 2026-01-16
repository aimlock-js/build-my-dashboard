import { motion } from "framer-motion";
import { Bell, Calendar, ChevronDown, Search, Settings, Maximize2, User, LogOut, LayoutDashboard, Command } from "lucide-react";
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
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between sticky top-0 z-20">
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
        <div className="relative w-full group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar OS, motos, peças, clientes..."
            className="w-full pl-10 pr-20 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-border rounded-md text-[10px] font-medium text-muted-foreground">
              <Command size={10} />K
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Period Selector */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors border border-border"
        >
          <Calendar size={14} className="text-primary" />
          <span>Últimos 30 dias</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </motion.button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Quick Actions */}
        <button className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border hover-glow">
          <Maximize2 size={16} className="text-muted-foreground" />
        </button>

        <Link to="/configuracoes">
          <button className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border hover-glow">
            <Settings size={16} className="text-muted-foreground" />
          </button>
        </Link>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border hover-glow">
          <Bell size={16} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-card">
            3
          </span>
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-xs font-bold text-white glow-primary">
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
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white">
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
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
