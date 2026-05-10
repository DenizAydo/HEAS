# Aegis — Hybrid Manager AI

Interaktiver Prototyp einer „Hybrid Manager AI". Jede AI-Empfehlung wird mit
Begründung, Konfidenz und Geltungsbereich präsentiert; die Managerin / der
Manager gibt frei oder weicht mit dokumentierter Begründung ab.

## Stack

- **React 18** + **TypeScript** + **Vite 5** für die SPA
- **Tailwind CSS 3** für das Styling, Design-Tokens als Theme in
  [tailwind.config.ts](tailwind.config.ts)
- **Recharts** für die Diagramme in *Decision Insights*
- **Node.js (ES Modules)** als statischer Auslieferungs-Server für den
  produktiven Build, getypt in TypeScript

## Voraussetzungen

- Node.js 20 oder neuer
- `npm install` einmal nach dem Klonen

## Entwicklung

```bash
npm run dev
```

Startet den Vite-Dev-Server mit Hot-Module-Reload auf `http://0.0.0.0:5173`.

## Produktion

```bash
npm run build      # tsc (server) + vite build (client)
npm run start      # node dist-server/server.js – serviert dist/
```

`PORT` und `HOST` lassen sich per Env-Variable setzen (Default `0.0.0.0:3000`).

## Weitere Skripte

| Script             | Wirkung                                          |
| ------------------ | ------------------------------------------------ |
| `npm run typecheck`| `tsc --noEmit` für Client und Server             |
| `npm run preview`  | Vite-Vorschau des Production-Builds              |
| `npm run build:client` | Nur Client bauen                             |
| `npm run build:server` | Nur Server bauen                             |

## Projektstruktur

```
.
├── index.html              # Vite Entry-HTML
├── src/                    # React-App
│   ├── main.tsx
│   ├── App.tsx
│   ├── data.ts             # Vignetten + Auswahllisten
│   ├── types.ts
│   ├── styles.css          # Tailwind-Layer + globale Reset/Scroll-Styles
│   ├── components/
│   │   ├── Icon.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PageHeader.tsx
│   │   ├── StatusPill.tsx
│   │   ├── VignetteCard.tsx
│   │   ├── lens/           # Bausteine der Recommendation-Review-Seite
│   │   └── ui/             # Button, Card, Chip, Pill
│   ├── lib/                # cn(), Confidence-Helper
│   └── pages/              # Cockpit, Lens, Profile, Authority, About
└── server/server.ts        # Static-File-Server für dist/
```
