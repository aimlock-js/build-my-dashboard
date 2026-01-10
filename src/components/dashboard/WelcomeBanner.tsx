import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";

export function WelcomeBanner() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-info p-6 mb-6"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-60 h-20 bg-white/5 rounded-full blur-xl" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-warning" />
            <span className="text-primary-foreground/80 text-sm font-medium">
              {greeting}, João!
            </span>
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            Seu negócio está crescendo! 🚀
          </h2>
          <p className="text-primary-foreground/70 text-sm max-w-md">
            Você tem <span className="font-semibold text-warning">5 novas ordens</span> aguardando 
            e suas vendas aumentaram <span className="font-semibold text-success">12%</span> essa semana.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-primary-foreground text-sm font-medium transition-all"
          >
            Ver detalhes
            <ArrowRight size={16} />
          </motion.button>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <TrendingUp size={20} className="text-success" />
              <span className="text-success font-bold text-lg">+12.5%</span>
            </div>
            <p className="text-primary-foreground/60 text-xs">vs semana passada</p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-4xl">📈</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
