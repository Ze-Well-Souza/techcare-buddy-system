
// Em uma implementação real, esse serviço incluiria APIs para verificação
// efetiva do hardware e software do sistema.

export interface ComponentStatus {
  name: string;
  status: "ok" | "warning" | "error";
  value: number;
  details: string;
}

export interface SystemInfo {
  cpu: ComponentStatus;
  memory: ComponentStatus;
  storage: ComponentStatus;
  network: ComponentStatus;
}

// Simulação de diagnóstico de sistema
export const runSystemDiagnostic = async (): Promise<SystemInfo> => {
  // Em uma implementação real, aqui haveria chamadas para APIs
  // do sistema ou bibliotecas específicas para obter informações reais

  // Simulando um tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Simulação de dados de diagnóstico
  return {
    cpu: {
      name: "Processador",
      status: simulateComponentStatus(),
      value: Math.floor(Math.random() * 100),
      details: "Intel Core i7-10700K, 3.8GHz"
    },
    memory: {
      name: "Memória",
      status: simulateComponentStatus(),
      value: Math.floor(Math.random() * 100),
      details: "16GB DDR4, 2933MHz"
    },
    storage: {
      name: "Armazenamento",
      status: simulateComponentStatus(),
      value: Math.floor(Math.random() * 100),
      details: "SSD 500GB, 70% livre"
    },
    network: {
      name: "Rede",
      status: simulateComponentStatus(),
      value: Math.floor(Math.random() * 100),
      details: "Gigabit Ethernet, 1000Mbps"
    }
  };
};

// Função auxiliar para simular um status aleatório de componente
const simulateComponentStatus = (): "ok" | "warning" | "error" => {
  const statuses: ("ok" | "warning" | "error")[] = ["ok", "warning", "error"];
  const randomIndex = Math.floor(Math.random() * 3); // 3 opções: ok, warning, error
  return statuses[randomIndex];
};
