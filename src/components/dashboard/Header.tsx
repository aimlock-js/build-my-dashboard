import { Bell, ChevronDown, Calendar, ChevronRight, Home } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bike, User, Settings, LogOut } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Painel Principal",
  "/ordens-servico": "Ordens de Serviço",
  "/clientes": "Clientes",
  "/motos": "Frota de Motos",
  "/pecas-estoque": "Peças & Estoque",
  "/financeiro": "Financeiro",
  "/fiscal": "Faturamento",
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
    <header className="h-14 bg-background border-b border-border px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2">
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
            <ChevronRight size={14} className="text-muted-foreground/50" />
            <span className="font-medium text-foreground">{currentPageName}</span>
          </nav>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-card text-foreground rounded-md text-sm font-medium shadow-sm">
            <Calendar size={14} />
            Período
          </button>
          <button className="px-3 py-1.5 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors rounded-md">
            Hoje
          </button>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
        </button>

        <div className="w-px h-6 bg-border" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <User size={18} className="text-muted-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground leading-tight">User</p>
                <p className="text-xs text-muted-foreground leading-tight">user@email.com</p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
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
