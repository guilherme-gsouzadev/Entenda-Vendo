# Entenda Vendo — Sistema visual A2 / v0.5

**Situação:** linguagem vetorial implementada; consistência final com as referências históricas ainda requer revisão humana porque os PNGs aprovados não estavam anexados nesta conversa.

## Linguagem visual

- **Tela:** 1920×1080, 16:9, 30 fps; base off-white `#F6F4EF`, superfícies brancas e respiro amplo.
- **Texto:** azul-marinho `#172B38`; fontes de sistema `Arial/Inter`, sem redistribuição de arquivos de fonte.
- **Semântica:** azul `#3789D4` identifica bolas azuis/destaques; coral `#E66E60` identifica vermelhas; verde `#157A68` comunica resolução confirmada; dourado `#F0B94D` serve à moeda.
- **Objetos:** urnas e bolas com transparência, pequeno brilho e sombra suave. Todos os objetos contáveis são SVGs parametrizados.
- **Fórmulas:** nunca são texto gerado por IA; representadas como gráficos vetoriais determinísticos.
- **Personagens:** C01/C02/C03 têm master por mesma geometria facial, expressão moderada, proporções adultas e 5 poses. Não atuam como professores na câmera.
- **Movimento:** progressões semânticas por frame; transições entre shots respeitam marcadores da planilha.
- **Barreira de acessibilidade:** significado não deve depender *somente* da cor; há rótulos e frações.

## Master de personagens

`assets/character_kit_A2.svg` é a **prancha vetorial de poses**; `src/components/Artwork.tsx` contém o rig implementado nas cenas. A arte pode ser refinada antes de gravar a locução. Não usar a prancha PNG como sprite alternado por frame.

| Papel | Roupa | Uso no MVP |
|---|---|---|
| C01, pessoa aprendiz | Azul escuro | Interagir com urnas, observar/indicar estados |
| C02, contraponto | Verde petróleo | Reserva para segunda interação quando útil |
| C03, organização | Cinza violeta | Biblioteca futura, não forçar entrada no piloto |

## Hierarquia

1. Contexto e pergunta antes da conta.
2. Estados físicos sem reposição à vista.
3. Resultados possíveis em cartões e caminhos.
4. Fórmula apenas quando a abstração estiver completa.
5. Consolidação visual sem excessos de textos.

## Critérios que **ainda precisam de revisão visual e teste audiovisual**

- Consistência C01 com a referência anterior `eight_pose_character_illustration_sheet.png`, não anexada.
- Qualidade de animação/câmera na execução real do Remotion em navegador.
- Texto e legendas em escala móvel após render.
- Paleta e identidade final com validação em dispositivo real.
- Voz PT-BR, cadência e sincronização fina.

## Estado especial de sem reposição (inviolável)

`before={blue:3,red:2}`; `after={blue:2,red:2}`; `removedBlue=1`. A bola removida está fora. Na cena SH12 o personagem **não** gera uma segunda bola na mão. O elemento extraído é desenhado uma única vez pelo componente de urna.
