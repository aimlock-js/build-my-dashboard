import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Calendar, Target } from "lucide-react";

export function WelcomeBanner() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary to-info p-6 mb-6"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 subtle-grid" />
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-primary-foreground/70 text-sm font-medium mb-1">
            {greeting}, João
          </p>
          <h2 className="text-xl font-bold text-primary-foreground mb-2">
            Aqui está o resumo do seu negócio
          </h2>
          <p className="text-primary-foreground/70 text-sm max-w-lg">
            Você tem <span className="font-semibold text-primary-foreground">5 novas ordens</span> aguardando processamento hoje.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-primary-foreground text-sm font-medium transition-all"
          >
            Ver ordens pendentes
            <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp size={14} className="text-success" />
              <span className="text-success font-bold text-sm">+12.5%</span>
            </div>
            <p className="text-primary-foreground/60 text-xs">Crescimento</p>
          </div>
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target size={14} className="text-warning" />
              <span className="text-primary-foreground font-bold text-sm">87%</span>
            </div>
            <p className="text-primary-foreground/60 text-xs">Meta mensal</p>
          </div>
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar size={14} className="text-primary-foreground" />
              <span className="text-primary-foreground font-bold text-sm">22</span>
            </div>
            <p className="text-primary-foreground/60 text-xs">Dias restantes</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}