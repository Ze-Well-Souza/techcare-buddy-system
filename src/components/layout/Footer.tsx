
import { Link } from "react-router-dom";
import { Computer } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:justify-between">
        <div className="flex items-center">
          <Computer className="h-6 w-6 text-primary" />
          <p className="ml-2 text-sm font-medium">
            © {currentYear} TechCare. Todos os direitos reservados.
          </p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link to="/termos" className="text-muted-foreground hover:underline">Termos</Link>
          <Link to="/privacidade" className="text-muted-foreground hover:underline">Privacidade</Link>
          <Link to="/contato" className="text-muted-foreground hover:underline">Contato</Link>
        </nav>
      </div>
    </footer>
  );
}
