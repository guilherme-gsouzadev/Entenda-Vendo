# Entenda Vendo — Prova de Qualidade Visual (PQV) v0.1

**Data:** 13/10/2026  
**Projeto:** MVP 01 — Probabilidade para Concursos  
**Decisão editorial:** v0.6 preservada como infraestrutura, **reprovada como produto audiovisual**.  
**Estado:** briefing pronto para implementação; **nenhum novo vídeo foi renderizado**.

## 1. Objetivo e restrições

Provar que conseguimos ensinar visualmente **uma única ideia em aproximadamente 30 segundos**, com movimento que representa o raciocínio e voz-guia sincronizada. O teste NÃO é um Short pronto para publicação, nem o piloto de nove minutos em miniatura.

- Preservar o estilo de referência **A2 — Editorial Visual Storytelling**, paleta, personagens adultos simplificados e regras matemáticas.
- Não reaproveitar os longos holds, cartões estáticos ou animações reprovadas da v0.6 apenas por já existirem.
- Manter o código e a matemática v0.6 como referência verificável, sem alterá-los em seu ZIP original.
- Prioridade: narratividade, ação contínua compreensível, transformação matemática e legibilidade.
- **Ferramenta no primeiro ensaio:** Remotion + elementos SVG vetoriais articulados/camadas com keyframes. Não comprar After Effects/Claude, nem adicionar Cavalry/Motion Canvas antes de medir o resultado.
- Fazer render local reproduzível sempre que possível; registrar as limitações do CLI.
- Produzir um único protótipo e, no máximo, uma rodada focada de correções antes da revisão de arquitetura.

## 2. Conceito audiovisual

**Gancho:** “Se uma bola azul sair, a chance de tirar outra continua igual?”

**Micro-história:** um personagem observa uma urna com cinco bolas (3 azuis, 2 vermelhas), avalia a chance, retira uma azul **sem reposição**, nota visualmente a nova configuração e descobre que o valor mudou de **3/5 = 60%** para **2/4 = 50%**.

**Estrutura:** pergunta → ação observável → nova contagem → descoberta. A fórmula só aparece *depois* de os elementos correspondentes serem vistos e contados.

**Narração-guia proposta (PT-BR, ajustável por leitura, não definitiva):**

> Se uma bola azul sair, a chance de tirar outra continua igual? Temos cinco bolas: três azuis e duas vermelhas. Na primeira retirada, a chance de azul é três em cinco. Saiu azul. Ela não volta. Agora sobram duas azuis entre quatro bolas. A chance da segunda azul caiu de sessenta para cinquenta por cento.

Ajustar a duração segundo a gravação real, **não forçar a voz a preencher trinta segundos**. O silêncio breve pode construir expectativa, mas quadros imóveis prolongados sem propósito não são aceitos.

## 3. Storyboard executável — referência de 30 s, 30 fps

| Tempo previsto | História e enquadramento | Movimento informativo obrigatório | Texto visível (quando aplicável) |
|---|---|---|---|
| 00:00–00:04 | Pergunta: personagem observa urna em plano médio; câmera leva atenção às bolas | Bolas visíveis desde o início; personagem inclina olhar/cabeça e aponta sem encobrir a urna | “A chance continua igual?” |
| 00:04–00:10 | Situação original: 3 bolas azuis, 2 vermelhas | Contagem azul 1→2→3 por destaque individual; total 1→5 em etapa distinta; fração surge da contagem | “1ª retirada: 3/5 = 60%” |
| 00:10–00:19 | Retirada de **uma** azul, sem reposição | Braço/mão entra pela abertura; acompanha fisicamente a bola; uma azul sai; **as outras quatro permanecem estáveis**; rótulo de 1ª retirada sai de foco quando muda o estado | “Saiu azul. Não volta.” |
| 00:19–00:25 | Nova configuração; única bola removida permanece fora | Destaque duas bolas azuis restantes, depois quatro totais; fração se constrói visualmente | “2ª retirada, após azul: 2/4 = 50%” |
| 00:25–00:30 | Comparação e fechamento | Duas frações lado a lado, mudança 60% → 50% com seta de transformação; a cena final continua ligada à urna | “SEM REPOSIÇÃO: AS CHANCES MUDAM” |

**Regra de montagem:** os intervalos são pontos de partida, não metas rígidas. Renderizar a narração-guia e acertar os cortes pelo ritmo real da explicação. Priorizar ações com causa e efeito: mão aproxima → segura → levanta; seleção de bolas → contagem → fração.

## 4. Invariantes de verdade matemática e continuidade

- Antes: **3 azuis dentro, 2 vermelhas dentro, zero fora, total 5**.
- Depois: **2 azuis dentro, 2 vermelhas dentro, 1 azul fora**, conservando o total físico de cinco bolas.
- A bola retirada deve ser a mesma em todos os quadros; não criar uma cópia na mão.
- Movimento pela abertura, sem atravessar parede, saltos ou teletransporte.
- `3/5 = 60%` é **P(azul na 1ª retirada)**.
- `2/4 = 50%` é **P(azul na 2ª retirada | saiu azul na 1ª, sem reposição)**.
- Não afirmar que `3/5 → 2/4` representa a diminuição do tamanho do espaço amostral; é mudança de probabilidades condicionais entre etapas.
- Estado visual, rótulos e fala precisam concordar em qualquer instante de transição.

## 5. Direção A2 — exigências práticas

- Não exibir personagens meramente decorativos, nem adicionar movimentos para “parecer animado”.
- A atuação mínima deve convencer: olhar acompanha a bola e a mão realiza um gesto compatível com a retirada.
- Evitar tela dividida sobrecarregada. Preferir uma urna central, amplo espaço negativo e uma expressão numérica principal por instante.
- Contraste: base off-white `#F6F4EF`, texto `#172B38`, azul `#3789D4`, coral `#E66E60` (preservados do sistema A2), com identificação textual além da cor.
- Usar interpolação/easing para movimentos orgânicos, mas nunca sacrificar contagem ou continuidade.
- Não usar vídeo generativo para representar as bolas ou as fórmulas; essas partes precisam ser determinísticas.
- Padrão mínimo da amostra: vídeo 16:9 a 30 fps, com render de revisão 1280×720 ou superior; voz-guia audível; quadros selecionados no celular.

## 6. Critérios de aprovação antes de expandir o projeto

### Portões obrigatórios (falha em qualquer um bloqueia aprovação)

1. **Matemática:** contagens, condições, rótulos e fórmulas corretos em todos os estados.
2. **Continuidade:** nenhuma bola aparece, desaparece ou muda de posição sem ação observável; retirada física convincente ou enquadramento que a represente de forma inequívoca.
3. **Compreensão:** ao assistir sem ler briefing, espectador consegue responder “quantas azuis sobraram?” e “por que a chance mudou?”. Fazer checagem simples com 3–5 pessoas, se disponíveis; não tratar esse grupo pequeno como prova estatística.
4. **Audiovisual:** narração e ação sincronizadas; nenhum trecho explicativo longo depende apenas de um cartão imóvel; cortes e gestos não escondem números.
5. **Legibilidade:** números e rótulos centrais legíveis em prévia de escala semelhante à de um telefone.
6. **Reprodução:** código, assets, comando de render, MP4, logs e gasto de recursos registrados.

### Avaliação qualitativa (anotar evidências, não fabricar uma nota automática)

- Clareza e sensação de descoberta.
- Qualidade/credibilidade dos gestos.
- Direção de arte A2.
- Ritmo em relação à voz.
- Desejo espontâneo de continuar assistindo.

**Proibição:** não se considerar aprovado porque compilou, passou testes ou contém movimento mensurável. Esses são apenas critérios técnicos de entrada.

## 7. Estratégia de custo e decisão entre ferramentas

**Experimento A — primeiro:** usar Remotion com SVGs/camadas, aproveitando apenas a lógica matemática e a infraestrutura necessária da v0.6. Sem assinatura adicional de IA. Não gerar nove minutos; realizar uma revisão de qualidade do vídeo de 30s.

**Se A falhar por qualidade de animação e não por roteiro:** preparar uma comparação *do mesmo gesto* em Motion Canvas **ou** Cavalry (selecionar segundo a causa da falha; não instalar três ferramentas de uma vez). Comparar tempo de produção, ajustes manuais, formato exportável, editabilidade e custo.

**Se A falhar por narrativa/compreensão:** reescrever o storyboard antes de trocar modelos ou motores. Um novo editor não corrige um roteiro fraco.

**Modelo alternativo:** contratar ou usar API de Kimi, DeepSeek, Claude ou GLM somente depois de documentar claramente a limitação do modelo atual; orçamento deve ser aprovado antes de rodar loops longos. Usar o mesmo briefing e critério de julgamento.

## 8. Entregáveis necessários

1. MP4 com narração-guia de 25–35 segundos, 16:9.
2. Fonte editável, assets e versões (sem `node_modules`).
3. Quatro quadros de prova de continuidade: estado inicial, mão na abertura, bola retirada fora, estado final.
4. Log da matemática e verificações de continuidade.
5. Relatório de **QA criativo**, com defeitos ainda visíveis, limitações, consumo real de recursos e comparação com a v0.6.
6. Checkpoint para decidir **aprovar / corrigir uma vez / trocar técnica**, sem iniciar o episódio completo automaticamente.

## 9. Instrução pronta para a próxima execução do agente

> Projeto Entenda Vendo — **Prova de Qualidade Visual v0.1**. Use como entradas o ZIP `entenda-vendo-remotion-mvp01-v0.6-source.zip`, o QA editorial v0.6 e este briefing. NÃO reinicie o projeto completo, NÃO gere novamente os 9m20 e NÃO retome os 17 shots. A v0.6 está aprovada apenas como infraestrutura e reprovada editorialmente. Produza um protótipo autônomo de cerca de 30s com narração-guia temporária. Mostre a pergunta, conte 3 azuis e 2 vermelhas, retire **uma** azul com gesto físico coerente e revele a mudança condicional de 3/5 (60%) para 2/4 (50%). Priorize movimento semanticamente necessário e identidade A2, usando Remotion com SVGs e camadas articuladas. Não compre ferramentas/serviços, não introduza modelos externos e não faça loops abertos de reavaliação. Renderize, confira visualmente, verifique matemática e continuidade, documente custos e limitações e entregue MP4 + fontes + QA. Pare após o protótipo para aprovação criativa; não avance para o vídeo longo nem para Shorts.

## 10. Fontes internas usadas na definição

- `entenda-vendo-remotion-mvp01-v0.6-source.zip`: `docs/style_system_A2.md`, `src/data/math.mjs`, `src/data/narration.json`.
- `Entenda_Vendo_MVP01_QA_v0.6.md`.
- `Entenda_Vendo_MVP01_Auditoria_Editorial_v0.6.md`.

Este documento é um **briefing de produção e de validação**. Não contém novas renderizações, nova pesquisa de modelos ou demonstração técnica da arquitetura proposta.
