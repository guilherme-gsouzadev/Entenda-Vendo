# QA factual / técnico — 13/10/2026

## Escopo realmente executado

| QA | Resultado | Evidência | Limite |
|---|---|---|---|
| Matemática de estados e complementos | **PASS 6/6** | `node --test` / subconjunto de 9 testes | Não é QA visual em vídeo |
| Continuidade da timeline e storyboard | **PASS 1/1** | 17 tomadas, 9 cenas, 560 s; sem overlaps | Não testa transições renderizadas |
| Roteiro / legendas preliminares | **PASS 2/2 estrutural** | Correspondência de 17 trechos e 133 cues SRT | Não há locução nem timestamps reais de áudio |
| Auditoria estática do código | **PASS 10/10** | `node scripts/qa.mjs` | Não detecta erros de execução React/Remotion |
| Parse TS/TSX | **PASS 6/6** | TypeScript global: `transpileModule` sintático | Não substitui `tsc --noEmit` de dependências instaladas |
| Contagem na thumbnail SVG | **PASS 3 estados** | `ElementTree`: antes 3A/2V; depois 2A/2V; retirada 1A | Legibilidade humana aprovada somente na revisão local |
| Thumbnail renderizada | **PASS export** | SVG + PNG 1280×720 e PNG 320×180 | Não é render Remotion; é gráfico determinístico independente |
| Kit vetorial | **PASS export** | SVG e PNG, 3 personagens × 5 poses | Identidade editorial final não comparada ao PNG histórico |
| Instalação/remotion studio | **BLOCKED** | `npm view`: `EAI_AGAIN`, DNS de registry.npmjs.org | Não há confirmação que composição executa |
| Render MP4 de 560s | **NOT EXECUTED** | Ausência de `out/probabilidade.mp4` | Não há prova de sincronização audiovisual |
| Narração PT-BR | **NOT EXECUTED** | Ainda não existe voz selecionada | G05 pendente |
| QA áudio e legendas finais | **NOT EXECUTED** | Nenhum áudio de voz, SRT ainda aproximado | Impeditivo de publicação |

## Inconsistências detectadas e resolvidas

- **Índice v0.4 alegava ZIP READY:** atualizado no v0.5 para `SOURCE_DELIVERED_RUNTIME_UNVERIFIED`.
- **Duplicação fora da urna em SH12:** personagem `holding` somava uma bola ao elemento retirado da própria urna. Alterado para `pointing`; agora uma única bola extraída está explicitamente desenhada pelo estado da urna.
- **Mudança do espaço amostral:** `SH11` separa a retirada física da reinterpretação numérica da cena `SH12`.
- **Representação do evento OU:** o roteiro registra o caso disjunto 1 OU 6 e alerta sobre a interseção em eventos sobrepostos.
- **Complemento:** a composição separa 30% (duas azuis) de 70% (pelo menos uma vermelha). A questão final separa 2/7 do complemento 5/7.
- **SRT:** marcado explicitamente como `draft`; não publicar sem sincronização com voz real.

## Recomendações de qualidade antes de gravar

1. Verificar remotion render/still no navegador real com `npm ci` e `npm run compositions`.
2. Rever ritmo didático: cenas com permanência gráfica de 35–50 s podem exigir mais transições e animações semânticas. Não confundir código das cenas com acabamento final.
3. Estabilizar o personagem C01 com a referência anterior A2, não anexada à conversa corrente.
4. Fazer teste legibilidade móvel, principalmente texto das cenas SH13–SH17.
5. Escolher voz e ajustar narrador PT-BR, tempos e SRT a partir da gravação.
6. Render integral e inspeção de frames-chave (início/fim de cada tomada e trajetória da bola), áudio e legendas.

**Gate editorial atual:** PROTÓTIPO DE PRODUÇÃO COM TESTES UNITÁRIOS; **NÃO PRONTO PARA PUBLICAÇÃO**.
