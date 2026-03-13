## Plurais – Site oficial / player

Este repositório contém o site do projeto **Plurais**, focado em destacar:

- lançamentos e sessões ao vivo (ex.: *Mashups (Ao Vivo na Toca do Bandido)*)
- a estética visual do projeto (capas, fotos, atmosfera de show)
- a experiência de ouvir as faixas em um player minimalista.

O objetivo é que a pessoa usuária **foque na música**, com interface limpa, poucos textos e conteúdo organizado em objetos (links, faixas, cópias reutilizáveis).

### Referências de design e experiência

O site se inspira em:

- players modernos de streaming (limpos, com foco na capa e controles)
- estética de sessões ao vivo em estúdio (luz, textura, atmosfera)
- microinterações suaves (hover, animações discretas).

As principais decisões de layout, tipografia e componentes seguem os padrões descritos em `AGENTS.md`.

---

## Tecnologias

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Zustand (store de música)

---

## Desenvolvimento local

Pré-requisitos:

- Node.js e npm instalados

Passos:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

O servidor de desenvolvimento será iniciado em modo hot reload (normalmente em `http://localhost:5173`).

---

## Padrões de componentes e conteúdo

Os principais padrões de projeto (como uso de arrays de objetos para textos/links, organização de tracks, títulos minimalistas, etc.) estão documentados em:

- `AGENTS.md`

Sempre que criar ou alterar componentes, consulte esse arquivo para manter consistência visual e de conteúdo.

