# Entenda Vendo — checkpoint v0.6

Data: 13/10/2026. Projeto: MVP01 — Probabilidade para Concursos.

**Estado: entrega técnica preliminar concluída. Publicação não aprovada.**

## Preservado

- A2 — Editorial Visual Storytelling.
- 9 cenas, 17 shots, 560 segundos, 30 fps.
- Regras matemáticas e roteiro originais.
- Planilha v0.5 como baseline histórico, sem alterações. Este checkpoint atualiza seus status de execução, não seus dados.

## Concluído com evidência

- Dependências instaladas e package-lock.json incluído.
- TypeScript sem erros; 12 testes unitários e 10 checagens estáticas aprovados.
- Duas composições reconhecidas no bundle real em Chrome.
- Thumbnail 1280×720 e preview móvel; amostras dos 17 shots.
- Correções de layout, trajetória e continuidade das bolas.
- MP4 silencioso: 960×540, 30 fps, 16.800 quadros, exatamente 9min20s.
- Prévia de retirada: 12 s, 360 quadros.
- Montagem dos 17 shots: 34 s, 1.020 quadros.
- Movimento comprovado nos pixels de 93 quadros do MP4; 58 passos com deslocamento da bola, quatro bolas restantes estáveis.
- Decodificação integral dos três vídeos sem erros. Relatório: QA_v0.6.md.

## Limites que continuam abertos

CLI oficial bloqueado por falha de consulta às interfaces de rede. Exportação realizada pelo mesmo bundle em Chrome + FFmpeg. Não declarar exportador oficial, áudio ou publicação como validados. A rota alternativa pode quantizar cortes em cerca de um quadro.

Há animações reais, mas longos holds permanecem. Rig e gestos ainda são simplificados. Voz, sincronização e QA audiovisual continuam pendentes. Nenhuma narração foi iniciada.

## Para retomar

1. Usar o ZIP v0.6 e os três MP4s entregues, sem reiniciar o projeto.
2. Ler QA_v0.6.md e os logs/JSON em docs/validation-v0.6.
3. Em ambiente apropriado, verificar a rota oficial de render do Remotion. Não repetir a instalação/testes aprovados sem uma mudança que justifique.
4. Só após encerrar esta entrega, decidir a próxima fase de voz/sincronização e polimento.

Comandos e pré-requisitos estão no README.md. O ZIP contém o código, lockfile, scripts de captura/QA, baseline e evidências; exclui node_modules, cache, bundle e frames intermediários de render.
