
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ChevronRight, Computer, Wrench, CheckCircle, Cpu, HardDrive, MemoryStick, Wifi, Shield, Database, Thermometer } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Index() {
  const handleStartDiagnostic = () => {
    toast({
      title: "Diagnóstico iniciado",
      description: "Estamos analisando o seu computador...",
    });
    // Em uma implementação real, aqui seria o código para iniciar o diagnóstico
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 py-12 sm:px-6 lg:py-16">
        <section className="mb-16 grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Manutenção e Diagnóstico Inteligente para seu Computador
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Soluções profissionais com tecnologia avançada para manter seu equipamento funcionando com o máximo desempenho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/diagnostico">
                  Iniciar Diagnóstico <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                <Link to="/servicos">
                  Nossos Serviços <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-full blur opacity-75"></div>
              <div className="relative bg-background rounded-full p-6">
                <Computer className="h-64 w-64 text-primary" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Nossos Serviços</h2>
            <p className="text-muted-foreground">Soluções completas para o seu computador</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Wrench className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Reparo de Hardware</CardTitle>
                <CardDescription>
                  Conserto de componentes com técnicos especializados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Diagnóstico e reparo de placas-mãe, HD, SSD, fonte e outros componentes.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Manutenção Preventiva</CardTitle>
                <CardDescription>
                  Cuidados regulares para prolongar a vida útil do equipamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Limpeza interna, substituição de pasta térmica e otimização de desempenho.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Upgrade de Componentes</CardTitle>
                <CardDescription>
                  Melhore o desempenho do seu computador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Instalação de memória RAM, troca de processador, instalação de SSD e placas de vídeo.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Diagnóstico Completo</h2>
            <p className="text-muted-foreground">Análise inteligente para identificar e resolver problemas</p>
          </div>
          
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Detecção Avançada de Hardware</h3>
                  <p className="text-muted-foreground">O TechCare analisa todos os componentes do seu computador para identificar:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Especificações detalhadas de hardware</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Vulnerabilidades e incompatibilidades</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Oportunidades de otimização e upgrade</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                      <Cpu className="h-10 w-10 text-primary mb-2" />
                      <span className="text-sm font-medium">Processador</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                      <MemoryStick className="h-10 w-10 text-primary mb-2" />
                      <span className="text-sm font-medium">Memória</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                      <HardDrive className="h-10 w-10 text-primary mb-2" />
                      <span className="text-sm font-medium">Armazenamento</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                      <Thermometer className="h-10 w-10 text-primary mb-2" />
                      <span className="text-sm font-medium">Temperatura</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Thermometer className="h-8 w-8 text-primary" />
                <CardTitle>Análise Térmica</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monitoramento de temperatura e prevenção de superaquecimento em todos componentes.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle>Verificação de Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Análise de proteções ativas, verificação de firewall e antivírus.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <Database className="h-8 w-8 text-primary" />
                <CardTitle>Limpeza de Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Remoção de arquivos temporários e otimização do armazenamento.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/diagnostico">
                Iniciar Diagnóstico Completo
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
