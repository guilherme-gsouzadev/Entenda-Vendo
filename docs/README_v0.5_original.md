# Entenda Vendo — MVP01: Probabilidade para Concursos

**Estado verificável (13/10/2026):** scaffold com 9 cenas, 17 shots e timeline de 560 s; 9 testes automáticos de matemática/timeline + 10 checagens estáticas passaram no ambiente de autoria. **Não foi possível executar o Remotion neste ambiente porque a instalação via npm falhou (`EAI_AGAIN` no acesso ao registry). Nenhum MP4 do piloto foi renderizado e nenhuma voz foi selecionada.**

A planilha anexa `production_pack_v0.5_implementation_audit.xlsx` registra o estado sem substituir o planejamento anterior.

## Pré-requisitos locais

Node.js 20+ e acesso ao registry npm. Windows, macOS ou Linux conforme suporte oficial Remotion. Instalar Chrome/Chromium se solicitado pelo CLI. Para exportação de áudio/vídeo, o próprio CLI utiliza o compositor e binários compatíveis da versão instalada.

## Começar

```bash
npm install
npm test
npm run qa
npm run studio
```

Na interface de Studio selecionar a composição **`ProbabilidadeConcursos`**. `EntendaVendoThumbnail` é uma composição separada, de 1280×720 e 1 frame.

### Render da thumbnail

```bash
npm run still
```

A thumbnail vetorial já conferida sem Remotion está em `assets/thumbnail_verified.png` e seu master editável em `assets/thumbnail_verified.svg`. Os dois se baseiam na mesma especificação matemática.

### Render de prévia pequena

```bash
npm run render:preview
```

O script exporta aproximadamente 10s da cena de sem reposição a partir do frame 10860 (362s), em meia resolução. Sua faixa de frames é uma amostra e **não** corresponde ao vídeo inteiro.

### Render integral sem voz

```bash
npm run render
```

Gera `out/probabilidade.mp4`, 1920×1080, 30fps, 9min20s, sem voz (mas com SFX de demonstração). Para um vídeo público é obrigatório integrar a narração final, sincronizar legendas e fazer controle de qualidade em todos os 560s.

### Integrar voz (após aprovação)

1. Produzir arquivo `public/voiceover.wav` com duração e sincronização verificadas.
2. Abrir `voice-props.json` e usar `withVoice=true`.
3. Executar `npx remotion render src/index.ts ProbabilidadeConcursos out/probabilidade-com-voz.mp4 --props=voice-props.json`.
4. Alinhar legendas reais por frase após gravar a voz; regenerar `src/data/captions-draft.json` somente enquanto não houver arquivo de sincronização definitivo.

**Importante:** o valor `showCaptions` está desligado, pois as faixas `captions-draft.*` são temporizações aproximadas geradas a partir dos 17 blocos e não são legendas audiográficas revisadas.

## Estrutura

- `src/data/math.mjs` — **fonte de verdade matemática**: estados, probabilidades, modelos de complemento.
- `src/data/timeline.mjs` — 9 cenas, 17 shots, 30fps e 560s.
- `src/data/narration.json` — roteiro em PT-BR, segmentado por tomada, sem voz aprovada.
- `src/components/Artwork.tsx` — rig dos personagens, urnas, bolas, dados, moedas, diagramas, paleta.
- `src/scenes/Shots.tsx` — implementações de SH01–SH17.
- `src/components/Thumbnail.tsx` — thumbnail determinística, diferente da referência antiga reprovada.
- `src/components/Captions.tsx` — overlay opcional das legendas preliminares.
- `assets/` — thumbnail vetorial e raster, preview móvel, character kit vetorial e raster.
- `docs/` — roteiro, sistema visual, metadata editorial, auditoria.
- `tests/` — testes automatizados sem dependência do navegador.

## Matemática obrigatória

| Estado | Azul dentro | Vermelha dentro | Azul fora |
|---|---:|---:|---:|
| Antes | 3 | 2 | 0 |
| Depois | 2 | 2 | 1 |

- P(azul primeira) = 3/5.
- P(azul segunda \| azul primeira, sem reposição) = 2/4.
- P(duas azuis) = 3/5 × 2/4 = 30%.
- P(pelo menos uma vermelha) = 70%.
- Questão: 4/7 × 3/6 = 2/7; complemento = 5/7 ≈ 71,4%.

## Portões pendentes

- Comparar arte vetorial com os PNGs históricos aprovados (não anexados nesta conversa).
- Instalar deps e verificar composições no navegador/CLI com `npm run compositions`.
- Fazer render curto de SH11/SH12, inspecionar contagem quadro a quadro.
- Fazer render completo e revisão de layout e legibilidade em celular.
- Selecionar e aprovar voz PT-BR; editar áudio e sincronizar SRT final.
- Medir áudio (picos/SFX), QA audiovisual e avaliação didática.

**Nenhuma dessas etapas é apresentada como concluída apenas por haver código-fonte.**
