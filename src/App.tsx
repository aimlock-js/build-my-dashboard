import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OrdensServico from "./pages/OrdensServico";
import GerenciarServicos from "./pages/GerenciarServicos";
import PecasEstoque from "./pages/PecasEstoque";
import Motos from "./pages/Motos";
import Clientes from "./pages/Clientes";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";
import Fiscal from "./pages/Fiscal";
import Configuracoes from "./pages/Configuracoes";
import Administrador from "./pages/Administrador";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ordens-servico" element={<OrdensServico />} />
          <Route path="/ordens-servico/servicos" element={<GerenciarServicos />} />
          <Route path="/pecas-estoque" element={<PecasEstoque />} />
          <Route path="/motos" element={<Motos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/fiscal" element={<Fiscal />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/perfil" element={<Perfil />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
