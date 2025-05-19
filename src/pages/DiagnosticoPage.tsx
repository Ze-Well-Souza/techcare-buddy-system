
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { 
  AlertCircle, CheckCircle, Cpu, HardDrive, MemoryStick, 
  RefreshCw, Wifi, AlertTriangle, Thermometer, Bug, 
  ShieldCheck, Clock, Database, Network, Monitor, Battery 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Interface para um componente do sistema
interface SystemComponent {
  name: string;
  status: "ok" | "warning" | "error" | "loading";
  details: string;
  value?: number;
  icon: React.ReactNode;
}

// Interface para informações detalhadas do sistema
interface SystemDetails {
  manufacturer: string;
  model: string;
  os: string;
  cpuModel: string;
  totalMemory: string;
  storageType: string;
  storageCapacity: string;
  graphicsCard: string;
  networkCard: string;
}

// Interface para as análises detalhadas
interface DiagnosticCheck {
  name: string;
  description: string;
  status: "ok" | "warning" | "error" | "loading";
  recommendation?: string;
  canAutoFix: boolean;
}

export default function DiagnosticoPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [detailedMode, setDetailedMode] = useState(false);
  const [fixInProgress, setFixInProgress] = useState(false);

  // Estado para componentes do sistema principal
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

  // Estado para detalhes do sistema
  const [systemDetails, setSystemDetails] = useState<SystemDetails>({
    manufacturer: "Carregando...",
    model: "Carregando...",
    os: "Carregando...",
    cpuModel: "Carregando...",
    totalMemory: "Carregando...",
    storageType: "Carregando...",
    storageCapacity: "Carregando...",
    graphicsCard: "Carregando...",
    networkCard: "Carregando..."
  });

  // Estado para análises detalhadas
  const [diagnosticChecks, setDiagnosticChecks] = useState<DiagnosticCheck[]>([
    {
      name: "Temperatura CPU",
      description: "Verificação da temperatura do processador",
      status: "loading",
      canAutoFix: false
    },
    {
      name: "Utilização de Memória",
      description: "Análise do uso e fragmentação de memória",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Espaço em Disco",
      description: "Verificação do espaço livre em disco",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Fragmentação de Disco",
      description: "Análise de fragmentação do sistema de arquivos",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Arquivos Temporários",
      description: "Análise de arquivos temporários e cache",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Status do Antivírus",
      description: "Verificação da proteção antivírus ativa",
      status: "loading",
      canAutoFix: false
    },
    {
      name: "Programas de Inicialização",
      description: "Análise de programas que iniciam com o sistema",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Status dos Drivers",
      description: "Verificação de drivers ausentes ou desatualizados",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Conectividade de Rede",
      description: "Teste de conectividade e configurações de rede",
      status: "loading",
      canAutoFix: true
    },
    {
      name: "Consumo de Energia",
      description: "Análise do consumo de energia e otimização de bateria",
      status: "loading",
      canAutoFix: true
    }
  ]);

  // Função para simular coleta de informações do sistema
  const simulateSystemInfo = () => {
    const manufacturers = ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple"];
    const cpuModels = ["Intel Core i7-12700K", "AMD Ryzen 9 5900X", "Intel Core i5-11600K", "AMD Ryzen 5 5600X"];
    const memoryOptions = ["8GB DDR4", "16GB DDR4", "32GB DDR4", "64GB DDR4"];
    const storageTypes = ["SSD NVMe", "SSD SATA", "HD SATA"];
    const storageCapacities = ["256GB", "512GB", "1TB", "2TB"];
    const graphicsCards = ["NVIDIA GeForce RTX 3070", "AMD Radeon RX 6800", "Intel Iris Xe", "NVIDIA GeForce GTX 1660"];
    const networkCards = ["Intel Wi-Fi 6E AX210", "Realtek RTL8125", "Qualcomm FastConnect", "Broadcom BCM43602"];
    
    const randomIndex = (arr: string[]) => Math.floor(Math.random() * arr.length);
    
    return {
      manufacturer: manufacturers[randomIndex(manufacturers)],
      model: `Model ${Math.floor(Math.random() * 9000) + 1000}`,
      os: "Windows 11 Pro 22H2",
      cpuModel: cpuModels[randomIndex(cpuModels)],
      totalMemory: memoryOptions[randomIndex(memoryOptions)],
      storageType: storageTypes[randomIndex(storageTypes)],
      storageCapacity: storageCapacities[randomIndex(storageCapacities)],
      graphicsCard: graphicsCards[randomIndex(graphicsCards)],
      networkCard: networkCards[randomIndex(networkCards)]
    };
  };

  const runDiagnostic = () => {
    // Reset dos estados
    setComponents(prev => prev.map(comp => ({
      ...comp, 
      status: "loading", 
      details: "Analisando...", 
      value: 0
    })));
    
    setDiagnosticChecks(prev => prev.map(check => ({
      ...check,
      status: "loading"
    })));
    
    setIsRunning(true);
    setShowDetails(false);
    setProgress(0);

    toast({
      title: "Diagnóstico iniciado",
      description: "Análise completa do sistema em andamento",
    });

    // Simula a detecção de hardware
    setTimeout(() => {
      setSystemDetails(simulateSystemInfo());
      
      // Avisa que a detecção de hardware foi concluída
      toast({
        title: "Hardware detectado",
        description: "Informações do sistema coletadas com sucesso",
      });
    }, 1500);

    // Simulação do processo de diagnóstico
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Atualiza o status dos componentes conforme o progresso
        if (newProgress === 20) {
          updateComponentStatus("Processador", simulateComponentStatus());
        } else if (newProgress === 30) {
          // Atualiza checagens diagnósticas em momentos específicos
          updateDiagnosticCheck("Temperatura CPU", simulateCheckStatus());
          updateDiagnosticCheck("Utilização de Memória", simulateCheckStatus());
        } else if (newProgress === 40) {
          updateComponentStatus("Memória", simulateComponentStatus());
        } else if (newProgress === 50) {
          updateDiagnosticCheck("Espaço em Disco", simulateCheckStatus());
          updateDiagnosticCheck("Fragmentação de Disco", simulateCheckStatus());
        } else if (newProgress === 60) {
          updateComponentStatus("Armazenamento", simulateComponentStatus());
          updateDiagnosticCheck("Arquivos Temporários", simulateCheckStatus());
        } else if (newProgress === 70) {
          updateDiagnosticCheck("Status do Antivírus", simulateCheckStatus());
          updateDiagnosticCheck("Programas de Inicialização", simulateCheckStatus());
        } else if (newProgress === 80) {
          updateComponentStatus("Rede", simulateComponentStatus());
          updateDiagnosticCheck("Status dos Drivers", simulateCheckStatus());
        } else if (newProgress === 90) {
          updateDiagnosticCheck("Conectividade de Rede", simulateCheckStatus());
          updateDiagnosticCheck("Consumo de Energia", simulateCheckStatus());
        } else if (newProgress >= 100) {
          setIsRunning(false);
          clearInterval(interval);
          setShowDetails(true);
          
          toast({
            title: "Diagnóstico concluído",
            description: "A análise do seu sistema foi finalizada. Visualize os resultados detalhados.",
          });

          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  // Função para simular correção automática de problemas
  const runAutoFix = () => {
    setFixInProgress(true);
    
    toast({
      title: "Correção automática iniciada",
      description: "Reparando problemas detectados...",
    });
    
    setTimeout(() => {
      // Simula a correção de problemas
      setDiagnosticChecks(prev => 
        prev.map(check => {
          if (check.status === "warning" || check.status === "error") {
            if (check.canAutoFix) {
              return {...check, status: "ok", recommendation: "Problema corrigido automaticamente"};
            }
          }
          return check;
        })
      );
      
      // Atualiza os componentes principais também
      setComponents(prev => 
        prev.map(comp => {
          if (comp.status === "warning") {
            return {...comp, status: "ok", details: "Componente otimizado", value: 95};
          }
          return comp;
        })
      );
      
      setFixInProgress(false);
      
      toast({
        title: "Correção concluída",
        description: "Os problemas passíveis de correção automática foram resolvidos.",
      });
    }, 3000);
  };

  // Função auxiliar para simular um status aleatório de componente
  const simulateComponentStatus = (): SystemComponent["status"] => {
    const statuses: SystemComponent["status"][] = ["ok", "warning", "error"];
    const weights = [0.6, 0.3, 0.1]; // 60% ok, 30% warning, 10% error
    
    const random = Math.random();
    if (random < weights[0]) return "ok";
    if (random < weights[0] + weights[1]) return "warning";
    return "error";
  };
  
  // Função auxiliar para simular um status aleatório de checagem
  const simulateCheckStatus = (): DiagnosticCheck["status"] => {
    const statuses: DiagnosticCheck["status"][] = ["ok", "warning", "error"];
    const weights = [0.5, 0.3, 0.2]; // 50% ok, 30% warning, 20% error
    
    const random = Math.random();
    if (random < weights[0]) return "ok";
    if (random < weights[0] + weights[1]) return "warning";
    return "error";
  };

  // Função para atualizar o status de um componente específico
  const updateComponentStatus = (componentName: string, status: SystemComponent["status"]) => {
    setComponents(prev => 
      prev.map(comp => {
        if (comp.name === componentName) {
          let details = "Componente funcionando normalmente";
          let value = 95;
          
          if (status === "warning") {
            details = "Performance abaixo do ideal";
            value = 65;
          } else if (status === "error") {
            details = "Problema crítico detectado";
            value = 30;
          }
          
          return { ...comp, status, details, value };
        }
        return comp;
      })
    );
  };
  
  // Função para atualizar o status de uma checagem específica
  const updateDiagnosticCheck = (checkName: string, status: DiagnosticCheck["status"]) => {
    setDiagnosticChecks(prev =>
      prev.map(check => {
        if (check.name === checkName) {
          let recommendation = "";
          
          if (status === "warning") {
            recommendation = getRecommendationByCheckName(checkName, "warning");
          } else if (status === "error") {
            recommendation = getRecommendationByCheckName(checkName, "error");
          }
          
          return { ...check, status, recommendation };
        }
        return check;
      })
    );
  };
  
  // Função para gerar recomendações específicas baseadas no tipo de checagem
  const getRecommendationByCheckName = (checkName: string, status: "warning" | "error"): string => {
    const recommendations: Record<string, Record<string, string>> = {
      "Temperatura CPU": {
        warning: "A temperatura do CPU está elevada. Verifique a ventilação do sistema.",
        error: "Temperatura crítica! O computador pode desligar para proteção. Verifique os coolers imediatamente."
      },
      "Utilização de Memória": {
        warning: "A memória está sendo utilizada intensamente. Feche alguns aplicativos não utilizados.",
        error: "A memória está esgotada. Considere expandir a RAM ou reduzir processos em execução."
      },
      "Espaço em Disco": {
        warning: "Espaço em disco abaixo de 20%. Considere liberar espaço removendo arquivos não utilizados.",
        error: "Disco quase cheio! Libere espaço urgentemente para evitar problemas de desempenho."
      },
      "Fragmentação de Disco": {
        warning: "Fragmentação moderada detectada. Recomenda-se desfragmentação.",
        error: "Alta fragmentação detectada. É necessário desfragmentar o disco urgentemente."
      },
      "Arquivos Temporários": {
        warning: "Acúmulo de arquivos temporários detectado. Recomenda-se limpeza.",
        error: "Grande volume de arquivos temporários ocupando espaço significativo. Limpeza necessária."
      },
      "Status do Antivírus": {
        warning: "Antivírus instalado mas não atualizado recentemente.",
        error: "Antivírus desativado ou não instalado. Sua segurança está em risco."
      },
      "Programas de Inicialização": {
        warning: "Muitos programas configurados para iniciar com o Windows. Considere desabilitar alguns.",
        error: "Excesso de programas na inicialização causando lentidão significativa no boot."
      },
      "Status dos Drivers": {
        warning: "Alguns drivers estão desatualizados. Atualize para melhor desempenho.",
        error: "Drivers críticos ausentes ou severamente desatualizados. Atualização urgente necessária."
      },
      "Conectividade de Rede": {
        warning: "Conectividade instável. Verifique o sinal WiFi ou conexão Ethernet.",
        error: "Problemas graves de conectividade detectados. Sua conexão está comprometida."
      },
      "Consumo de Energia": {
        warning: "Consumo de energia acima do ideal. Otimize as configurações de energia.",
        error: "Consumo de energia excessivo detectado. A duração da bateria está severamente comprometida."
      }
    };
    
    return recommendations[checkName]?.[status] || `Problema detectado em ${checkName}. Recomenda-se verificação.`;
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
        return <RefreshCw className="h-5 w-5 text-primary animate-spin" />;
    }
  };

  // Renderiza a página do diagnóstico
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Diagnóstico Completo do Sistema</h1>
          <p className="text-muted-foreground mt-2">
            Análise detalhada do hardware e software do seu computador
          </p>
        </div>

        <Card className="mb-8 card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Status do Diagnóstico
              <Badge variant={isRunning ? "default" : progress === 100 ? "outline" : "secondary"}>
                {isRunning ? "Em andamento" : progress === 100 ? "Concluído" : "Aguardando"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {isRunning
                ? "Analisando componentes do sistema..."
                : progress === 100
                ? "Diagnóstico concluído. Visualize os resultados abaixo."
                : "Clique em iniciar para começar a análise detalhada do seu computador"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary">
                      {progress}% Completo
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="h-2 w-full" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={runDiagnostic} 
                  disabled={isRunning}
                  className="w-full"
                  variant={progress === 100 ? "outline" : "default"}
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
                
                <Button 
                  onClick={() => setDetailedMode(!detailedMode)}
                  variant="secondary"
                  className="w-full"
                  disabled={!showDetails}
                >
                  {detailedMode ? "Visão Simplificada" : "Visão Detalhada"}
                </Button>
              </div>
              
              {showDetails && !detailedMode && (
                <Button 
                  onClick={runAutoFix}
                  className="w-full"
                  variant="default"
                  disabled={fixInProgress || isRunning}
                >
                  {fixInProgress ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Reparando problemas...
                    </>
                  ) : (
                    "Corrigir Problemas Automaticamente"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {showDetails && (
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle>Informações do Sistema</CardTitle>
              <CardDescription>Detalhes técnicos do seu computador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Fabricante:</span>
                    <span>{systemDetails.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Modelo:</span>
                    <span>{systemDetails.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sistema Operacional:</span>
                    <span>{systemDetails.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Processador:</span>
                    <span>{systemDetails.cpuModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Memória:</span>
                    <span>{systemDetails.totalMemory}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Tipo de Armazenamento:</span>
                    <span>{systemDetails.storageType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Capacidade:</span>
                    <span>{systemDetails.storageCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Placa de Vídeo:</span>
                    <span>{systemDetails.graphicsCard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Placa de Rede:</span>
                    <span>{systemDetails.networkCard}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>{renderStatusIcon(component.status)}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{
                        component.status === "ok" 
                          ? "Funcionando normalmente" 
                          : component.status === "warning" 
                          ? "Atenção necessária" 
                          : component.status === "error"
                          ? "Problema crítico"
                          : "Analisando..."
                      }</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{component.details}</p>
                {component.value !== undefined && component.status !== "loading" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <span className="text-sm font-medium">{component.value}%</span>
                    </div>
                    <Progress 
                      value={component.value} 
                      className={`h-1 w-full mt-1 ${
                        component.status === "ok" 
                          ? "bg-green-100 text-green-500" 
                          : component.status === "warning" 
                          ? "bg-amber-100 text-amber-500" 
                          : "bg-red-100 text-red-500"
                      }`}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {showDetails && detailedMode && (
          <div className="mt-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Análises Detalhadas
                  <Button 
                    onClick={runAutoFix}
                    size="sm"
                    variant="default"
                    disabled={fixInProgress || isRunning}
                  >
                    {fixInProgress ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Reparando...
                      </>
                    ) : (
                      "Corrigir Tudo"
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>Checagens específicas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 gap-4">
                {diagnosticChecks.map((check) => (
                  <div key={check.name} className="flex flex-col border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {check.status === "ok" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : check.status === "warning" ? (
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        ) : check.status === "error" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                        )}
                        <span className="font-medium">{check.name}</span>
                      </div>
                      {(check.status === "warning" || check.status === "error") && check.canAutoFix && (
                        <Badge variant="outline" className="ml-2">Correção automática disponível</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">{check.description}</p>
                    
                    {check.recommendation && (check.status === "warning" || check.status === "error") && (
                      <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                        <span className="font-medium">Recomendação: </span>
                        {check.recommendation}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
