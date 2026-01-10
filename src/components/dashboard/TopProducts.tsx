import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Package2 } from "lucide-react";

const products = [
  { name: "Troca de Tela iPhone", quantity: 45, revenue: 40500, growth: 12 },
  { name: "Formatação Notebook", quantity: 38, revenue: 5700, growth: 8 },
  { name: "Troca de Bateria", quantity: 32, revenue: 12800, growth: -5 },
  { name: "Reparo Placa-mãe", quantity: 18, revenue: 27000, growth: 23 },
  { name: "Troca Display Samsung", quantity: 15, revenue: 13500, growth: 15 },
];

export function TopProducts() {
  const maxQuantity = Math.max(...products.map(p => p.quantity));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl p-6 card-shadow border border-border/50"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center">
            <Package2 size={20} className="text-warning-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Top Serviços</h3>
            <p className="text-sm text-muted-foreground">Mais realizados este mês</p>
          </div>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">
          Ver todos
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.revenue)}
                </span>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${product.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {product.growth >= 0 ? <ArrowUpRight size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                  {Math.abs(product.growth)}%
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(product.quantity / maxQuantity) * 100}%` }}
                transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{product.quantity} unidades</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
