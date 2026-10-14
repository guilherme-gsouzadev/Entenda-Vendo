# Áudio ainda não gerado

Não há uma voz aprovada, portanto este pacote não inventa um arquivo de narração.
Coloque a locução final em `public/voiceover.wav` **após** seleção de voz, gravação, edição e alinhamento com o tempo da timeline.
Os textos e legendas em `src/data/narration.json` e `public/captions-draft.srt` são um roteiro de produção, NÃO um alinhamento validado com áudio.
Para ativar voz no vídeo, altere `src/Root.tsx` para passar `withVoice={true}` à composição ou configure via defaultProps depois que o WAV existir.
