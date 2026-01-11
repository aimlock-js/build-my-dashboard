import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Calendar, Target, Bike } from "lucide-react";

export function WelcomeBanner() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 p-6 mb-6"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 subtle-grid" />
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/70 text-sm font-medium mb-1">
            {greeting}, Ricardo
          </p>
          <h2 className="text-xl font-bold text-white mb-2">
            Aqui está o resumo da sua oficina
          </h2>
          <p className="text-white/70 text-sm max-w-lg">
            Você tem <span className="font-semibold text-white">8 serviços</span> aguardando e{" "}
            <span className="font-semibold text-white">3 motos prontas</span> para entrega hoje.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all"
          >
            Ver ordens pendentes
            <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 font-bold text-sm">+18.5%</span>
            </div>
            <p className="text-white/60 text-xs">Faturamento</p>
          </div>
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target size={14} className="text-yellow-300" />
              <span className="text-white font-bold text-sm">92%</span>
            </div>
            <p className="text-white/60 text-xs">Meta mensal</p>
          </div>
          <div className="text-center px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bike size={14} className="text-white" />
              <span className="text-white font-bold text-sm">47</span>
            </div>
            <p className="text-white/60 text-xs">Motos atendidas</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}