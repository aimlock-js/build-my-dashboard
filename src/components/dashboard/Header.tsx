import { Bell, ChevronDown, Search, Home, ChevronRight, Command } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Painel Principal",
  "/ordens-servico": "Ordens de Serviço",
  "/clientes": "Clientes",
  "/motos": "Frota de Motos",
  "/pecas-estoque": "Peças & Estoque",
  "/financeiro": "Financeiro",
  "/fiscal": "Notas Fiscais",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações",
  "/administrador": "Administração",
  "/perfil": "Meu Perfil",
};

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPageName = routeNames[currentPath] || "Página";
  const isHomePage = currentPath === "/";

  return (
    <header className="h-14 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-3">
        {isHomePage ? (
          <h1 className="text-lg font-semibold text-foreground">Painel Principal</h1>
        ) : (
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home size={14} />
              <span>Painel</span>
            </Link>
            <ChevronRight size={14} className="text-border" />
            <span className="font-medium text-foreground">{currentPageName}</span>
          </nav>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:flex items-center gap-3 h-9 px-3 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg text-sm text-muted-foreground transition-colors"
        >
          <Search size={14} />
          <span>Buscar...</span>
          <div className="flex items-center gap-1 ml-4">
            <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] font-medium border border-border">
              <Command size={10} className="inline" />
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] font-medium border border-border">K</kbd>
          </div>
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </motion.button>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-semibold text-sm shadow-md">
                U
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground leading-tight">Usuário</p>
                <p className="text-[11px] text-muted-foreground leading-tight">Admin</p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2 border-b border-border mb-1">
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-muted-foreground">usuario@email.com</p>
            </div>
            <DropdownMenuItem onClick={() => navigate("/perfil")} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/configuracoes")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}