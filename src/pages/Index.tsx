
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ChevronRight, Computer, Tool, CheckCircle, Cpu, HardDrive, MemoryStick, Wifi } from "lucide-react";
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
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Manutenção e Reparos para seu Computador</h1>
            <p className="text-muted-foreground md:text-xl">
              Soluções profissionais para manter seu equipamento funcionando com o máximo desempenho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/diagnostico">
                  Iniciar Diagnóstico <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/servicos">
                  Nossos Serviços <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Computer className="h-64 w-64 text-primary" />
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Nossos Serviços</h2>
            <p className="text-muted-foreground">Soluções completas para o seu computador</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Tool className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Reparo de Hardware</CardTitle>
                <CardDescription>
                  Conserto de componentes com técnicos especializados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Diagnóstico e reparo de placas-mãe, HD, SSD, fonte e outros componentes.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
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
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
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
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/servicos">Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Diagnóstico Completo</h2>
            <p className="text-muted-foreground">Analise o estado atual do seu computador</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Cpu className="h-8 w-8 text-primary" />
                <CardTitle>CPU</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Análise de desempenho e temperatura do processador.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MemoryStick className="h-8 w-8 text-primary" />
                <CardTitle>Memória</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Verificação de quantidade, uso e integridade da RAM.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <HardDrive className="h-8 w-8 text-primary" />
                <CardTitle>Armazenamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Avaliação de discos rígidos, SSDs e espaço disponível.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Wifi className="h-8 w-8 text-primary" />
                <CardTitle>Conectividade</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Análise de adaptadores de rede e conectividade.</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
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
