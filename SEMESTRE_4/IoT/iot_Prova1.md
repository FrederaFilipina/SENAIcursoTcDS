# IoT - Internet das Coisas
### **▷ Trata-se da área da tecnologia que une hardware, software e conexão à internet em dispositivos, com o objetivo de coletar, transmitir e receber informações e, em alguns casos, executar ações pré-programadas.**

### Um dispositivo ``IoT`` geralmente é composto por:
    ▶ Sensores:         captam informações do ambiente;
    ▶ Processador:      processa essas informações;
    ▶ Comunicadores:    Wi-Fi, Bluetooth, Zigbee, 4G/5G etc;
    ▶ Software:         determina o que fazer com os dados;
    ▶ Conectividade:    permite comunicação com outros sistemas;
    ▶ Atuadores:        executam alguma ação física;

### Pilares:
    ↪ Sensores e Atuadores
    ↪ Comunicadores e Conectividade
    ↪ Sistemas Autônomos
    ↪ I.A e Visão computacional

---
---
<br>

## Sensoriamento
### **Hoje os sensores e processadores permitem que o dispositivo IoT possam interagir em tempo real ao o que acontece ao seu redor.**

#### ▶ Visão Computacional: Permitem a máquina interpretar e entender o que está sendo "visto"; (Matriz de Pixels)
#### ▶ Rastreamento de Objetois: Permite a máquina acompanhar um objeto em deslocamento sem perder a sua trajetoria; (Frames sequenciais)
#### ▶ Imagens 3D: Noção espacial: Permite a máquina conseguir se situar fisicamente em relação ao ambiente e interagir com ele; (Nuvens de Pontos)
#### ▶ Processamento de Linguagem Natural (NLP): Permite a máquina transformar comandos auditivos em ações; (ONdas sonoras)

---
---
<br>

## Protocolo de Comunicação e Segurança
### **Para que os dispositivos possam se comunicar, é preciso seguir os protocolos (regras) que estabelece como a transmissão e recebimento de informações devem ocorrer**

### Propriedades:
    ↪ Detecção da conexão física subjacente ou a existência de um nó;
    ↪ Handshaking (estabelecimento de ligação);
    ↪ Negociação de várias características de uma conexão;
    ↪ Como iniciar e finalizar uma mensagem;
    ↪ Como formatar uma mensagem;
    ↪ O que fazer com mensagens corrompidas ou mal formatadas;
    ↪ Como detectar perda inesperada de conexão e o que fazer em seguida;
    ↪ Término de sessão ou conexão;
    
### Open Systems Interconnection - OSI 
#### É um modelo usado para entender como os dispositivos se comunicam em uma rede. Ele divide a comunicação em 7 camadas, cada uma responsável por uma parte do processo.
| Camada | Nome         | Função principal                                                          | Exemplos             |
| ------ | ------------ | ------------------------------------------------------------------------- | -------------------- |
| **7**  | Aplicação    | Comunicação com os programas utilizados pelo usuário                      | HTTP, FTP, DNS       |
| **6**  | Apresentação | Formatação, codificação, criptografia e compressão dos dados              | TLS, JPEG, UTF-8     |
| **5**  | Sessão       | Estabelece, mantém e encerra sessões de comunicação (entre hosts)         | RPC, NetBIOS         |
| **4**  | Transporte   | Controla a entrega dos dados entre dispositivos                           | TCP, UDP             |
| **3**  | Rede         | Define endereçamento e roteamento (melhor caminho)                        | IP, ICMP             |
| **2**  | Enlace       | Comunicação entre dispositivos na mesma rede e controle de acesso ao meio | Ethernet, Wi-Fi, MAC |
| **1**  | Física       | Transmite os bits através do meio físico (binário)                        | Cabos, fibra, rádio  |

### Protocolos MQTT e REST são os dois principais protocolos
    ▶ MQTT (Message Queuing Telemetry Transport) é um protocolo criado para troca de mensagens entre dispositivos de IoT, especialmente em situações onde há pouca largura de banda ou recursos limitados
    ▶ REST (Representational State Transfer) é um estilo arquitetural utilizado principalmente para construir APIs que permitem que sistemas se comuniquem pela web, geralmente utilizando HTTP.

### Tipos:
▶ Camada físicas:

    ↪ Ethernet              -   alta velocidade de troca de dados, baixo custo
    ↪ Wi-Fi                 -   maior a frequência maior a taxa de transferência, porém menor alcance
    ↪ Low Power Wide Area   -   baixo consumo energético, transferência de dados em longas distâncias

▶ Camada transporte
    ↪ TCP   -   prioriza confiabilidade e entrega ordenada dos dados
    ↪ UDP   -   prioriza simplicidade e menor sobrecarga, não garantindo a entrega dos pacotes

---
---
<br>

## Pipeline
### ****