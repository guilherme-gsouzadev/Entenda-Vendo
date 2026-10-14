# Entenda Vendo — MVP01 / v0.6

Implementação baseada integralmente no pacote v0.5. Preservados estilo A2, 9 cenas, 17 shots, 560 segundos e 30 fps.

## Estado

Dependências instaladas, TypeScript corrigido e testes executados. As duas composições foram reconhecidas no bundle real em Chrome. Thumbnail, 17 shots e sequência sem reposição capturados e revisados. Consulte `docs/CHECKPOINT_v0.6.md` para evidências, prévias e limitações.

O CLI oficial apresentou `uv_interface_addresses` ao iniciar o servidor neste ambiente. O caminho alternativo usa o mesmo bundle Remotion/React em Chrome, servidor somente em 127.0.0.1 e FFmpeg para codificar imagens. Não altera dependências nem simula os componentes. Não valida a exportação de áudio do Remotion.

## Execução normal

Node.js 20+, npm e Chrome obtido pelo Remotion. Para reproduzir exatamente as dependências:

```bash
npm ci
npm run typecheck
npm test
npm run qa
npm run compositions
npm run studio
npm run still
npm run render:preview
```

Os três últimos comandos do CLI de render/composições precisam de ambiente com consulta às interfaces de rede disponível. O build desliga cache para evitar bundles antigos ao trabalhar com arquivos extraídos com datas futuras.

## QA e vídeo alternativos

```bash
npm run qa:browser
npm run render:browser
```

O primeiro captura thumbnail, todos os shots, quadros da retirada e executa verificações no navegador. O segundo também gera `out/qa/probabilidade-preliminar-silencioso.mp4`. Exige FFmpeg no PATH. A ponte do navegador é específica do Remotion 4.0.535; não atualizar versões sem revisá-la. A implementação foi testada em Linux; Windows/macOS não foram testados.

O render alternativo captura cada frame das janelas animadas e mantém os frames estáticos pelo tempo especificado. Confere igualdade do SVG no início, meio e fim de cada hold. Se a animação mudar, revisar as janelas em `scripts/browser-qa.mjs`; uma divergência interrompe o processo. Nenhuma faixa de áudio ou legenda é incluída no MP4 preliminar.

## Matemática e continuidade

- Antes: 3 azuis + 2 vermelhas.
- Depois: 2 azuis + 2 vermelhas dentro, uma azul fora.
- 3/5 × 2/4 = 30%; complemento = 70%.
- Questão: 4/7 × 3/6 = 2/7; complemento 5/7 ≈ 71,4%.
- Layouts e trajetória: `src/data/withdrawal.mjs`.
- Regras probabilísticas: `src/data/math.mjs`.

A planilha v0.5 em `docs/production_pack_v0.5_implementation_audit.xlsx` permanece como baseline histórico. O checkpoint v0.6 prevalece sobre seus status antigos de execução. Seus dados matemáticos, roteiro e planejamento não foram alterados.

## Publicação

Ainda depende de voz PT-BR, sincronização de roteiro/legendas, revisão de ritmo, polimento das microações do personagem e QA audiovisual. O vídeo silencioso é uma prévia técnica, não um master de publicação. A animação básica da bola está validada; o personagem ainda não faz o gesto completo de buscar a bola dentro da urna.

As referências históricas externas citadas na planilha não foram anexadas. A2 foi preservado usando a paleta, o rig e a linguagem vetorial presentes no pacote recebido.

## QA adicional dos arquivos entregues

`node scripts/make-previews.mjs` gera os recortes e valida duração, quadros e decodificação dos três MP4s. `python scripts/qa-encoded-motion.py` mede movimento e contagem nos pixels decodificados; esse script opcional exige NumPy, SciPy e Pillow. Evidências e limites estão em `docs/QA_v0.6.md`.
