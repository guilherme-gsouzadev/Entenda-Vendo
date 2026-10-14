# Entenda Vendo — QA v0.6

Data: 13/10/2026. Escopo: implementação técnica e prévias silenciosas do MVP01.

## Resultado

Prévia técnica executável pela rota alternativa, com validação do bundle real e dos MP4s entregues. **CLI oficial de renderização não validado neste ambiente. Não aprovado para publicação.**

Preservados: A2, 9 cenas, 17 shots e timeline nominal de 560 segundos a 30 fps. Nenhuma narração foi iniciada. A planilha v0.5, os valores matemáticos, o roteiro e as legendas preliminares foram preservados.

## Evidências executadas

| Verificação | Resultado | Evidência |
|---|---|---|
| Instalação npm | Concluída; lockfile incluído | validation-v0.6/install-result.txt |
| TypeScript | PASS, sem erros | typecheck-final.txt |
| Testes unitários | 12 PASS, 0 FAIL | tests-final.txt |
| Checagens estáticas | 10 PASS | static-final.txt |
| Bundle | Build concluído | build-final.txt |
| Composições no Chrome | 2 reconhecidas | out/qa/compositions.json |
| Erros JS nos quadros de QA | 0 | out/qa/browser-audit.json |
| Texto fora da tela | 0 nos 17 quadros amostrados | out/qa/browser-audit.json |
| Thumbnail | Contagem e leitura principal conferidas a 1280×720 e 320×180 | thumbnail.png, thumbnail-mobile.png |
| Conservação das bolas no navegador | 3 azuis e 2 vermelhas totais nos 10 quadros de retirada | browser-audit.json |
| Movimento no MP4 decodificado | PASS em 93 quadros consecutivos | encoded-motion.json |
| Montagem dos 17 shots | 17 imagens decodificadas comparadas às referências; maior erro médio por canal 2,183/255 | montage-final.json |
| Decodificação integral dos três MP4s | PASS | media-final.json |

Os arquivos TXT/JSON citados sem pasta estão em `docs/validation-v0.6/`. Os testes de código já aprovados foram reaproveitados na retomada, sem reinstalação. Foram acrescentadas verificações finais dos pixels codificados e da montagem.

## Arquivos de vídeo

| Arquivo | Duração | Quadros | Formato |
|---|---:|---:|---|
| probabilidade-preliminar-silencioso.mp4 | 560 s / 9min20s | 16.800 | H.264, 960×540, 30 fps, sem áudio |
| retirada-sem-reposicao.mp4 | 12 s | 360 | H.264, 960×540, 30 fps, sem áudio |
| amostras-17-shots.mp4 | 34 s | 1.020 | H.264, 960×540, 30 fps, sem áudio |

A prévia cobre 360–372 s do vídeo. A montagem contém dois segundos de cada shot, na ordem SH01–SH17, retirados entre `fim do shot − 3 s` e `fim − 1 s`.

## Prova de movimento e continuidade

A análise usou os **pixels decodificados do MP4 final**, não apenas o código ou PNGs de origem. Foram examinados os frames 10859–10951, inclusive.

- Três componentes azuis e dois vermelhos detectados em todos os 93 quadros da região da urna e da retirada.
- A bola extraída mudou de posição em 58 passos acima de 0,4 pixel. Passa acima da boca da urna e termina fora, junto à mão.
- Deslocamento máximo medido das quatro bolas restantes: 0,0 pixel nessa amostra.
- A posição da bola extraída é preservada na mudança de shot. Comparação de geometria no navegador também passou.
- A evidência visual está em `out/qa/encoded-motion-evidence.jpg`.

Portanto há animação real. Isso **não significa movimento contínuo durante os 560 segundos**: a implementação contém entradas, revelações e a retirada animada, com longos períodos de quadro mantido para narração futura. Foram capturados 1.206 estados/intervalos do bundle; os holds têm duração explícita e foram conferidos no início, meio e fim. Não é uma edição composta apenas pelos 17 PNGs de amostra.

## Matemática

| Situação | Regra conferida |
|---|---|
| Antes | 3 azuis + 2 vermelhas, 5 dentro |
| Depois de retirar uma azul | 2 azuis + 2 vermelhas dentro; uma azul fora |
| Primeira azul | 3/5 |
| Segunda azul, dada a primeira azul | 2/4 |
| Duas azuis | 3/5 × 2/4 = 30% |
| Pelo menos uma vermelha | 1 − 30% = 70% |
| Questão final | 4/7 × 3/6 = 2/7; complemento 5/7 ≈ 71,4% |

As equações foram conferidas nas amostras visuais e nos testes existentes. O exemplo de urna pressupõe sorteio uniforme. Nenhuma regra da planilha foi alterada. Os hashes dos arquivos preservados estão em `preserved-baseline.json`.

## Correções realizadas

1. Tipagem das tuplas da timeline, eliminando erros TypeScript em `Root.tsx` sem mudar os tempos.
2. Posições fixas das quatro bolas restantes. A bola central é removida com o mesmo raio e posição inicial.
3. Trajetória pela abertura da urna, evitando a travessia lateral da parede.
4. Urna, personagem e bola com a mesma geometria em SH11/SH12. Removido o fade global de SH12 que interrompia a continuidade.
5. Dado afastado do cartão “1” em SH05.
6. Árvore de moedas afastada do título em SH10; legenda C/K adicionada.
7. Cache de bundle desativado para evitar reaproveitamento de arquivos com timestamps de origem futuros.
8. Normalização da pausa final na codificação. Um candidato ficou com 549,333 s e foi rejeitado; o arquivo entregue foi corrigido e validado com 560 s e 16.800 quadros.

## Limitação do CLI e alternativa

`npm run compositions` e `npm run still` falharam com `uv_interface_addresses returned Unknown system error 1`, durante a consulta de interfaces de rede pelo servidor interno do Remotion. As evidências estão em `compositions.txt` e `thumbnail-before.txt`. Não foi aplicada alteração em `node_modules` nem nas regras do ambiente.

Alternativa usada: bundle oficial → servidor HTTP em 127.0.0.1 → Chrome Headless/Playwright → captura por frame do Remotion/React → FFmpeg. As duas composições foram reconhecidas nessa rota. A ponte de captura é específica da versão 4.0.535. O caminho oficial do CLI, o render de áudio e a portabilidade para Windows/macOS permanecem sem validação.

A codificação alternativa foi verificada para duração, contagem de quadros, decodificação e movimento. A quantização de timestamps pode antecipar um corte visual em aproximadamente um quadro em relação à timeline nominal; isso foi observado no corte SH11/SH12, sem descontinuidade das bolas. Não equiparar esta prévia à validação frame a frame do exportador oficial.

## Pendências para publicação

- Voz, sincronização das falas, SRT/VTT e SFX; nenhum QA de áudio é declarado.
- Revisão de ritmo dos holds longos e legibilidade dos textos auxiliares em dispositivo real. Títulos e equações foram conferidos nas amostras; isso não é aprovação universal de legibilidade móvel.
- Polimento das microações: o personagem recebe a bola, mas o braço ainda não executa o gesto completo de buscá-la dentro da urna. Outros gestos previstos no storyboard permanecem simplificados.
- Comparação com referências históricas externas, que não vieram no pacote.
- Exportação oficial 1080p e revisão audiovisual integral após sincronização.

Não houve nova fase, produção de voz ou publicação.
