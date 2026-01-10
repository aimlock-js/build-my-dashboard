import { Bell, Calendar, ChevronDown, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 bg-card/80 glass-effect border-b border-border/50 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left side - Breadcrumb & Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">Resumo</span>
        </div>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2.5 w-72 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Period Selector */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/15 transition-colors border border-primary/20">
          <Calendar size={16} />
          <span>Últimos 30 dias</span>
          <ChevronDown size={14} />
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors border border-border/50">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-destructive-foreground shadow-lg">
            3
          </span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-muted/50 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <User size={18} className="text-primary-foreground" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-foreground">João Silva</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
          <ChevronDown size={14} className="text-muted-foreground hidden lg:block" />
        </button>
      </div>
    </header>
  );
}
