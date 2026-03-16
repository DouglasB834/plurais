## Padrões de projeto e conteúdo – Plurais

Este documento define **padrões mínimos** para criar e evoluir componentes no projeto Plurais, garantindo consistência visual, de código e de conteúdo.

### 1. Objetos de conteúdo (textos, links, etc.)

- **Sempre que tiver listas repetidas**, como:
  - redes sociais
  - músicas / faixas
  - botões de ação
  - seções com títulos/subtítulos
  
  use **arrays de objetos** + `map`, em vez de duplicar JSX ou texto solto dentro do componente.

- **Exemplo – links sociais do hero**  
  - Definir um array no topo do componente:
    ```ts
    const socialLinks = [
      { name: "Instagram", href: "https://...", src: "/instagram-cut.png", alt: "Instagram" },
      { name: "YouTube", href: "https://...", src: "/Youtube.png", alt: "YouTube" },
      // ...
    ];
    ```
  - Renderizar usando `map` mantendo o padrão de estilos atual:
    ```tsx
    <nav aria-label="Redes Sociais">
      {socialLinks.map((social) => (
        <Link key={social.name} to={social.href}>
          <img
            src={social.src}
            alt={social.alt}
            className="w-14 h-14 hover:scale-110 transition-all duration-300"
          />
        </Link>
      ))}
    </nav>
    ```
  - **Regra**: se precisar mudar link, texto, ícone, etc., faça isso **apenas no objeto**, não dentro do JSX.

### 2. Textos de título e subtítulo

- **Foco na música / experiência sonora**:
  - Titles e subtitles em seções de player/hero devem ser **minimalistas**, sem frases muito longas.
  - Usar variações suaves de fonte e opacidade em vez de muitos efeitos:
    - título: `font-light`, tamanho entre `text-lg` e `text-2xl`, cores como `text-white/90`.
    - subtítulo / artista: `text-xs` ou `text-sm`, `text-white/70` ou similar, pode usar `uppercase` e `tracking-wide`.
  - Evitar sombras pesadas e textos piscando; a atenção principal deve ir para:
    - capa do álbum
    - player / controles
    - call-to-action principal (se existir).

- **Onde guardar textos reutilizáveis**:
  - Se o mesmo título/subtítulo aparecer em mais de um lugar, crie um **objeto de cópia** exportado, por exemplo:
    ```ts
    export const heroCopy = {
      title: "Plurais – Mashups ao vivo",
      subtitle: "Sessions gravadas na Toca do Bandido",
    };
    ```
  - Importe esse objeto nos componentes que usam esses textos, em vez de repetir strings.

### 3. Componentes novos – checklist mínimo

Ao criar um novo componente, seguir este checklist:

- **Nome do arquivo e componente**
  - Componentes de UI: `PascalCase` (`MusicPlayerCard.tsx`, `HeroSection.tsx`).
  - Um componente por arquivo sempre que possível.

- **Estilos / Tailwind**
  - Usar classes utilitárias com padrão já existente (ex.: `glass-card`, `hover-lift`, animações definidas no projeto).
  - Reaproveitar classes que já existem em outro componente antes de criar algo muito diferente.

- **Acessibilidade mínima**
  - Adicionar `aria-label` em `nav`, `section`, botões icônicos e elementos sem texto.
  - Imagens sempre com `alt` descritivo.
  - Botões com `sr-only` quando necessário para descrever a ação (ex.: botão de play, volume).

- **Estado e dados**
  - Se o componente depende de dados reutilizáveis (tracks, redes sociais, etc.), preferir:
    - buscar de um **store** (`useMusicStore`) ou
    - receber via **props** um array de objetos.
  - Evitar “dados mágicos” hard-coded espalhados dentro do JSX principal.

### 4. Padrão para listas de músicas (tracks)

- Todas as faixas devem seguir a interface `Track` centralizada em `src/lib/tracks/types.ts`.

- **Ao adicionar nova música**:
  - Usar um `id` em string incremental (`"4"`, `"5"`, ...).
  - Preencher pelo menos: `title`, `artist`, `coverUrl`.
  - Se não tiver ainda link final de áudio/YouTube, usar placeholder mas comentar que é temporário.

### 5. Organização de conteúdo e refatorações futuras

- Sempre que perceber **repetição de texto ou estrutura**, considere:
  - extrair para um objeto de cópia compartilhado; ou
  - extrair para um componente reutilizável.

- Antes de criar algo totalmente novo, olhar:
  - componentes em `src/components`
  - stores em `src/store`
  - já existe algo parecido? então reaproveitar estilo/estrutura.

### 6. Como evoluir este documento

- Sempre que criar um padrão novo (ex.: forma de tratar vídeos, modal de letras, etc.), adicionar uma seção aqui explicando:
  - **o que é o padrão**
  - **onde está implementado (componente/store)**
  - **como reutilizar em novos componentes**.

### 7. Integração com Google Drive – Tracks & Photos

- **Estrutura no Drive** (folder público configurado em `VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID`):
  - Pasta raiz (`Mashups` ou similar) → uma pasta por faixa, por exemplo `01_Desabafo_Sem_Freio`.
  - Dentro de cada pasta de faixa existem **sempre** duas subpastas:
    - `Photos/` → contém todas as fotos usadas na UI.
    - `Track/` → contém o(s) arquivo(s) de áudio da faixa.

- **Mapeamento para o domínio `Track`**:
  - Implementação em `src/lib/tracks/drive-service.ts` (`getTracksFromDrive`).
  - Para cada pasta de faixa:
    - `Photos/`:
      - Todas as imagens viram `Track.photos` (array de `{ url, alt }`).
      - A **primeira imagem** é usada como `Track.coverUrl`.
    - `Track/`:
      - O primeiro arquivo de áudio vira `Track.audioUrl`, montado via `buildAudioUrl`.
    - Demais campos:
      - `id` e `title` usam o nome da pasta da faixa.
      - `artist` padrão: `"Plurais"`.

- **Provider de áudio (fácil trocar Drive → Spotify)**:
  - Configuração em `src/lib/tracks/config.ts`:
    - `AUDIO_PROVIDER`: `'drive' | 'spotify' | 'other'` (env `VITE_AUDIO_PROVIDER`).
    - `buildDriveFileUrl(fileId)` monta a URL pública do arquivo no Drive.
    - `buildAudioUrl({ provider, fileId, externalUrl })` resolve a URL de áudio a partir do provider.
  - Hoje usamos:
    - `audioProvider = 'drive'` com `fileId` do Google Drive.
  - No futuro (ex.: Spotify):
    - Basta mudar `AUDIO_PROVIDER` e passar `externalUrl`/`spotifyUrl` na criação da track, sem alterar os componentes.

- **Consumo no front**:
  - Hook `useTracks` em `src/lib/tracks/useTracks.ts` busca `Track[]` do Drive usando React Query (cache em memória).
  - `PlaylistSection` usa `useTracks`:
    - Se houver tracks do Drive, usa elas.
    - Senão, faz fallback para `mockTracks` do `useMusicStore` (útil em desenvolvimento/offline).
  - `TrackListCard`:
    - Usa `track.coverUrl` para a capa.
    - Passa `track.photos` para `AnimatedTestimonials` quando existir; caso contrário, usa a própria `coverUrl` como única imagem.


