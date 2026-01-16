import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Bike, Sparkles } from "lucide-react";

export function WelcomeBanner() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl gradient-primary p-6 mb-6"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 subtle-grid opacity-20" />
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-white/70" />
            <p className="text-white/70 text-sm font-medium">
              {greeting}, Ricardo
            </p>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Aqui está o resumo da sua oficina
          </h2>
          <p className="text-white/70 text-sm max-w-lg">
            Você tem <span className="font-semibold text-white">8 serviços</span> aguardando e{" "}
            <span className="font-semibold text-white">3 motos prontas</span> para entrega hoje.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-sm font-semibold transition-all border border-white/10"
          >
            Ver ordens pendentes
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-center px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 font-bold text-base">+18.5%</span>
            </div>
            <p className="text-white/60 text-xs font-medium">Faturamento</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-center px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Target size={14} className="text-yellow-300" />
              <span className="text-white font-bold text-base">92%</span>
            </div>
            <p className="text-white/60 text-xs font-medium">Meta mensal</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-center px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Bike size={14} className="text-white" />
              <span className="text-white font-bold text-base">47</span>
            </div>
            <p className="text-white/60 text-xs font-medium">Motos atendidas</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
