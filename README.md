# Save the Date 🩷💛🧡

Application web progressive (PWA) de type « save the date » pour annoncer un événement. Les invité·e·s découvrent l'annonce via un effet typewriter, peuvent obtenir des indices sur le lieu via un terminal interactif, et s'abonner aux notifications push pour recevoir des informations supplémentaires.

Démo en ligne : https://save-the-daaate.vercel.app/

## Fonctionnalités

- **Page d'accueil** — invite à installer l'app sur l'écran d'accueil (mobile)
- **Save the date** — révélation du message animé (typewriter + confettis), puis bouton pour accéder au terminal
- **Terminal interactif** — permet de poser n'importe quelle question à l'IA (GPT-4o-mini) pour obtenir un indice sur le lieu
- **Notifications push** — abonnement via Web Push API
- **PWA** — installable sur mobile et desktop, fonctionne hors-ligne

## Stack technique

| Côté            | Technologies                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Client**      | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Headless UI, Workbox (PWA), Vitest |
| **Serveur**     | Node.js, Express 5, TypeScript, Prisma (PostgreSQL), Web Push, OpenAI API                    |
| **Déploiement** | Vercel (server + client)                                                                     |

## Prérequis

- Node.js 18+
- Une base de données PostgreSQL
- Une paire de clés VAPID (pour les notifications push)
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
VITE_PUBLIC_VAPID_KEY=<votre_clé_publique_VAPID>
```

### Server

```bash
cd SERVER
npm install
```

Créer un fichier `.env` :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/savethedate
VAPID_PUBLIC_KEY=<votre_clé_publique_VAPID>
VAPID_PRIVATE_KEY=<votre_clé_privée_VAPID>
VAPID_MAILTO=mailto:votre@email.com
API_URL=http://localhost:4001
PORT=4001
OPENAI_API_KEY=<votre_clé_api_openai>
```

Pour générer une paire de clés VAPID :

```bash
cd SERVER
npx ts-node/esm src/scripts/generateVAPIDKeys.ts
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
