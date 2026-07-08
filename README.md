# Save the Date 🩷💛🧡

Application web progressive (PWA) de type « save the date » pour annoncer un événement. Les invité·e·s découvrent l'annonce via un effet typewriter et peuvent obtenir des indices sur le lieu via un terminal interactif.

Démo en ligne : https://save-the-daaate.vercel.app/

## Fonctionnalités

- **Page d'accueil** — invite à installer l'app sur l'écran d'accueil (mobile)
- **Save the date** — révélation du message animé (typewriter + confettis), puis bouton pour accéder au terminal
- **Terminal interactif** — permet de poser n'importe quelle question à l'IA (GPT-4o-mini) pour obtenir un indice sur le lieu
- **PWA** — installable sur mobile et desktop, fonctionne hors-ligne

## Stack technique

| Côté            | Technologies                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Client**      | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Headless UI, Workbox (PWA), Vitest |
| **Serveur**     | Node.js, Express 5, TypeScript, OpenAI API                                                   |
| **Déploiement** | Vercel (server + client)                                                                     |

## Prérequis

- Node.js 18+
- Une clé API OpenAI (pour 🐱KiwIA)

## Installation

### Client

```bash
cd CLIENT
npm install
```

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:4001
```

### Server

```bash
cd SERVER
npm install
```

Créer un fichier `.env` :

```env
API_URL=http://localhost:4001
PORT=4001
OPENAI_API_KEY=<votre_clé_api_openai>
```

## Lancer le projet en développement

```bash
# Terminal 1 — Server
cd SERVER && npm run dev

# Terminal 2 — Client
cd CLIENT && npm run dev
```

L'app est accessible sur `http://localhost:5174`.

## Tests

```bash
cd CLIENT
npm run test          # Exécution unique
npm run test:watch    # Mode watch
```
