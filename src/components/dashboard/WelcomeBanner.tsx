import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function WelcomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-3 mb-1">
        <Crown size={20} className="text-primary" />
        <h1 className="text-xl font-semibold text-foreground">User</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Veja abaixo os dados de receita e rendimento
      </p>
    </motion.div>
  );
}
