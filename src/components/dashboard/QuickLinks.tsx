import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickLinkProps {
  title: string;
  path: string;
  color: string;
}

const quickLinks: QuickLinkProps[] = [
  { title: "Últimas O.S.", path: "/ordens-servico", color: "from-primary/20 to-primary/5" },
  { title: "Peças Populares", path: "/pecas-estoque", color: "from-success/20 to-success/5" },
  { title: "Clientes Recentes", path: "/clientes", color: "from-info/20 to-info/5" },
];

export function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickLinks.map((link, index) => (
        <motion.div
          key={link.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <Link
            to={link.path}
            className={`flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r ${link.color} border border-border hover:border-primary/30 transition-all group`}
          >
            <span className="text-base font-semibold text-foreground">{link.title}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Ver mais <ArrowRight size={14} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
