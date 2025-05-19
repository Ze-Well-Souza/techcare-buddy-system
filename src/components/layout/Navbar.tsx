
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Computer } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  
  // Verificar se um caminho está ativo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="mr-4 flex items-center">
          <Computer className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">TechCare</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Button 
            variant={isActive("/servicos") ? "default" : "ghost"} 
            asChild
          >
            <Link to="/servicos">Serviços</Link>
          </Button>
          <Button 
            variant={isActive("/diagnostico") ? "default" : "ghost"} 
            asChild
          >
            <Link to="/diagnostico">Diagnóstico</Link>
          </Button>
          <Button 
            variant={isActive("/contato") ? "default" : "ghost"} 
            asChild
          >
            <Link to="/contato">Contato</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
