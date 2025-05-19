
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Cpu, HardDrive, MemoryStick, RefreshCw, Wifi, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Interface para um componente do sistema
interface SystemComponent {
  name: string;
  status: "ok" | "warning" | "error" | "loading";
  details: string;
  value?: number;
  icon: React.ReactNode;
}

export default function DiagnosticoPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [components, setComponents] = useState<SystemComponent[]>([
    {
      name: "Processador",
      status: "loading",
      details: "Aguardando diagnóstico",
      value: 0,
      icon: <Cpu className="h-6 w-6" />
    },
    {
      name: "Memória",
      status: "loading",
      details: "Aguardando diagnóstico",
      value: 0,
      icon: <MemoryStick className="h-6 w-6" />
    },
    {
      name: "Armazenamento",
      status: "loading",
      details: "Aguardando diagnóstico",
      value: 0,
      icon: <HardDrive className="h-6 w-6" />
    },
    {
      name: "Rede",
      status: "loading",
      details: "Aguardando diagnóstico",
      value: 0,
      icon: <Wifi className="h-6 w-6" />
    }
  ]);

  const runDiagnostic = () => {
    // Reset do estado
    setComponents(prev => prev.map(comp => ({
      ...comp, 
      status: "loading", 
      details: "Analisando...", 
      value: 0
    })));
    
    setIsRunning(true);
    setProgress(0);

    toast({
      title: "Diagnóstico iniciado",
      description: "A análise do seu sistema começou",
    });

    // Simulação do processo de diagnóstico
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        
        // Atualiza o status dos componentes conforme o progresso
        if (newProgress === 25) {
          updateComponentStatus("Processador", simulateComponentStatus());
        } else if (newProgress === 50) {
          updateComponentStatus("Memória", simulateComponentStatus());
        } else if (newProgress === 75) {
          updateComponentStatus("Armazenamento", simulateComponentStatus());
        } else if (newProgress === 100) {
          updateComponentStatus("Rede", simulateComponentStatus());
          setIsRunning(false);
          clearInterval(interval);
          
          toast({
            title: "Diagnóstico concluído",
            description: "A análise do seu sistema foi finalizada",
          });
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  };

  // Função auxiliar para simular um status aleatório de componente
  const simulateComponentStatus = (): SystemComponent["status"] => {
    const statuses: SystemComponent["status"][] = ["ok", "warning", "error"];
    const randomIndex = Math.floor(Math.random() * 3); // 3 opções: ok, warning, error
    return statuses[randomIndex];
  };

  // Função para atualizar o status de um componente específico
  const updateComponentStatus = (componentName: string, status: SystemComponent["status"]) => {
    setComponents(prev => 
      prev.map(comp => {
        if (comp.name === componentName) {
          let details = "Componente funcionando normalmente";
          let value = 100;
          
          if (status === "warning") {
            details = "Performance abaixo do ideal";
            value = 65;
          } else if (status === "error") {
            details = "Problema identificado";
            value = 30;
          }
          
          return { ...comp, status, details, value };
        }
        return comp;
      })
    );
  };

  // Função para renderizar o ícone de status
  const renderStatusIcon = (status: SystemComponent["status"]) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "loading":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Diagnóstico do Sistema</h1>
          <p className="text-muted-foreground mt-2">
            Analise completa dos componentes do seu computador
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Status do Diagnóstico</CardTitle>
            <CardDescription>
              {isRunning
                ? "Analisando componentes do sistema..."
                : progress === 100
                ? "Diagnóstico concluído"
                : "Clique em iniciar para começar a análise"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2 w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <Button 
                onClick={runDiagnostic} 
                disabled={isRunning}
                className="w-full"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    {progress === 100 ? "Reiniciar Diagnóstico" : "Iniciar Diagnóstico"}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {components.map((component) => (
            <Card key={component.name} className={
              component.status === "error" 
                ? "border-red-500" 
                : component.status === "warning" 
                ? "border-amber-500" 
                : ""
            }>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  {component.icon}
                  <CardTitle className="ml-2 text-lg">{component.name}</CardTitle>
                </div>
                {renderStatusIcon(component.status)}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{component.details}</p>
                {component.value !== undefined && component.status !== "loading" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Desempenho</span>
                      <span className="text-sm font-medium">{component.value}%</span>
                    </div>
                    <Progress 
                      value={component.value} 
                      className={`h-1 w-full mt-1 ${
                        component.status === "ok" 
                          ? "text-green-500" 
                          : component.status === "warning" 
                          ? "text-amber-500" 
                          : "text-red-500"
                      }`}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
