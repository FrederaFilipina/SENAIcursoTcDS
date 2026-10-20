
## 1. TCP e UDP
### Explique as principais diferenças entre TCP e UDP. Por que o TCP confirmar o recebimento e retransmitir dados perdidos não significa que a comunicação está segura? Cite um mecanismo que pode proteger aplicações que utilizam TCP e outro para aplicações que utilizam UDP.

**1.1) Explique as principais diferenças entre TCP e UDP.**
> ↪ O TCP estabelece uma conexão antes de transmitir os dados, confirma o recebimento, retransmite dados perdidos e garante que eles sejam entregues na ordem correta. Já o UDP envia dados sem estabelecer previamente uma conexão, sem confirmar o recebimento e sem garantir a ordem de chegada ou retransmitir automaticamente os dados perdidos.

**1.2) Por que o TCP confirmar o recebimento e retransmitir dados perdidos não significa que a comunicação está segura?**
> ↪ Pois o TCP não criptografa os dados por conta própria,ou seja, as informações ainda podem ser interceptadas.

**1.3) Cite um mecanismo que pode proteger aplicações que utilizam TCP e outro para aplicações que utilizam UDP.**
> ↪ Para proteger a comunicação, podemos utilizar o **TLS** em aplicações que utilizam TCP e o **DTLS** em aplicações que utilizam UDP. Esses mecanismos ajudam a garantir a confidencialidade, a integridade e a autenticidade dos dados.

---
---
<br>

## 2. Os objetivos da segurança
### Uma escola possui um sistema no qual os alunos consultam suas notas e os professores registram as avaliações. Explique como confidencialidade, integridade, autenticidade e disponibilidade se aplicam a esse sistema. Apresente um exemplo de problema relacionado a cada objetivo.


> **Confidencialidade:** garante que somente pessoas autorizadas tenham acesso às informações.<br>
↪ Exemplo: um aluno consegue visualizar as notas de outros alunos sem autorização.

> **Integridade:** protege as informações contra alterações indevidas.<br>
↪ Exemplo: uma nota é modificada sem autorização de um professor.

> **Autenticidade:** permite verificar a identidade dos usuários e dos sistemas.<br>
↪ Exemplo: uma pessoa se passa por um professor para registrar avaliações.

> **Disponibilidade:** garante que o sistema esteja acessível aos usuários autorizados quando necessário.<br>
↪ Exemplo: o portal escolar fica indisponível durante o período de consulta das notas.

---
---
<br>

## 3. Interceptação de dados
### Um desenvolvedor criou uma tela de login que envia usuário e senha pelo método POST, mas utiliza HTTP. Ele afirma que a senha está protegida porque não aparece na URL. Essa afirmação está correta? Explique o que poderia acontecer se alguém capturasse esse tráfego e como a comunicação deveria ser protegida.

**3.1) Essa afirmação está correta?**
> ↪ Não. Utilizar o método POST não protege a senha por si só, pois esse método apenas define como os dados são enviados na requisição HTTP. O fato da senha não aparecer na URL não significa que ela esteja criptografada.

**3.2) Explique o que poderia acontecer se alguém capturasse esse tráfego.**
> ↪  Conseguir visualizar o conteúdo da requisição, incluindo o nome do usuário e a sua senha entre outras informações.

**3.3) como a comunicação deveria ser protegida**
> ↪ Para evitar esse problema, a aplicação deve utilizar ``HTTPS``, que protege o conteúdo transmitido por meio do protocolo TLS. Também é necessário validar corretamente o certificado digital do servidor para verificar sua identidade.

---
---
<br>

## 4. Ataque de intermediário e certificados
### Ao integrar uma aplicação a uma API, uma desenvolvedora encontrou um erro de certificado. Para fazer a integração funcionar, ela desativou a validação do certificado no código. Explique por que essa decisão é perigosa, como ela pode facilitar um ataque de intermediário e qual seria a conduta adequada para resolver o problema.

**4.1) Explique por que essa decisão é perigosa**
> ↪ É perigoso porque impede que a aplicação verifique corretamente a identidade do servidor com o qual está se comunicando.

**4.2) como ela pode facilitar um ataque de intermediário**
> ↪ Isso pode facilitar um ataque de intermediário (``Man-in-the-Middle`` ou ``MITM``), no qual um atacante se posiciona entre a aplicação e a API para interceptar informações, modificar mensagens ou se passar pelo servidor legítimo.

**4.3) qual seria a conduta adequada para resolver o problema**
> ↪ A conduta adequada é investigar e corrigir o problema do certificado, verificando se ele corresponde ao nome do servidor, se está dentro do período de validade e se sua cadeia de certificação é confiável. A aplicação deve manter a validação do certificado habilitada e utilizar o TLS corretamente configurado.

---
---
<br>

## 5. Segurança no código
### Uma API utiliza HTTPS, mas apresenta as seguintes características:
### - Qualquer usuário autenticado consegue consultar dados de outros usuários alterando o identificador na URL.
### - Não existe limite de tentativas de login.
### - As senhas recebidas são registradas nos logs.
### - Não há limite de tamanho para arquivos enviados.
### Identifique o risco de cada uma das quatro situações e proponha uma correção para cada uma. Explique também por que o HTTPS não resolve esses problemas.

#### 5.1) Qualquer usuário autenticado consegue consultar dados de outros usuários alterando o identificador na URL.
> ↪ **Risco:** falha de autorização, que permite o acesso indevido a informações de outros usuários.
> ↪ **Correção:** verificar no servidor se o usuário autenticado tem permissão para acessar os dados solicitados, validando a autorização em cada requisição.

#### 5.2) Não existe limite de tentativas de login.
> ↪ **Risco:** tentativas repetidas de login podem facilitar ataques de força bruta e a descoberta de senhas.
> ↪ **Correção:** implementar *rate limiting*, limitando a quantidade de tentativas em determinado período e considerando critérios como conta e origem da requisição.

#### 5.3) As senhas recebidas são registradas nos logs.
> ↪ **Risco:** exposição de credenciais, permitindo que pessoas com acesso aos registros obtenham senhas dos usuários.
> ↪ **Correção:** não registrar senhas nos logs e evitar a exposição de outros dados sensíveis. As informações registradas devem ser limitadas ao necessário para monitoramento e investigação de falhas.

#### 5.3) Não há limite de tamanho para arquivos enviados.
> ↪ **Risco:** consumo excessivo de memória, armazenamento e processamento, podendo comprometer a disponibilidade da aplicação.
> ↪ **Correção:** estabelecer limites de tamanho para arquivos enviados e validar esses limites no servidor, além de controlar os recursos utilizados durante o processamento.

#### 5.4) Por que o HTTPS não resolve esses problemas?

> ↪ O HTTPS protege os dados durante o transporte, garantindo confidencialidade, integridade e autenticação da comunicação. Entretanto, ele não corrige automaticamente falhas de autorização, não impede tentativas ilimitadas de login, não evita o registro de senhas nos logs e não estabelece limites para arquivos enviados.<br>
Por isso, além de utilizar HTTPS, a aplicação precisa implementar controles de autorização, limitação de requisições, proteção de informações sensíveis e validação do tamanho dos dados recebidos.
