import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

const products = [
  { name: "Troca de Óleo + Filtro", quantity: 58, revenue: 8700, growth: 15 },
  { name: "Kit Relação Completo", quantity: 42, revenue: 16800, growth: 22 },
  { name: "Revisão Completa", quantity: 35, revenue: 15750, growth: 8 },
  { name: "Troca de Pneus", quantity: 28, revenue: 14000, growth: 12 },
  { name: "Retífica de Motor", quantity: 12, revenue: 36000, growth: -5 },
];

export function TopProducts() {
  const maxQuantity = Math.max(...products.map(p => p.quantity));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-5 card-shadow border border-border h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Serviços Mais Realizados</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Ranking do mês</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.revenue)}
                </span>
                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${product.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {product.growth >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {Math.abs(product.growth)}%
                </div>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(product.quantity / maxQuantity) * 100}%` }}
                transition={{ delay: 0.2 + 0.05 * index, duration: 0.4 }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{product.quantity} realizados</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}