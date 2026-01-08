# Newspaper Monorepo 📰

<b>This project is an experimental playground for learning new technologies and programming languages.</b>

The Newspaper project is a debate platform where users engage in discussions, share ideas, and develop thoughts on various topics (codenamed `news`). Users can publish their ideas like newspaper columns, and others can respond with their own perspectives.

## 🏗️ Project Structure

This project is a monorepo managed with **npm workspaces** and **Turborepo**.

```text
.
├── apps/
│   ├── api/          # Express.js backend API
│   └── web/          # Frontend web application
├── packages/
│   └── shared/       # Shared types, schemas, and utilities
├── docker-compose.yml # Container orchestration
└── package.json       # Monorepo configuration
```

- 🔑 **[API Documentation](https://github.com/abdulkadirkaradas/newspaper-api-express/blob/develop/apps/api/README.md)**: Detailed backend setup and route info.
- 🌐 **[Web Documentation](#)**: Frontend development guide.

## 🚀 Tech Stack

- **Monorepo:** Turborepo, npm Workspaces
- **Backend:** Node.js, Express.js, Prisma, PostgreSQL
- **Frontend:** *under-consideration*
- **Shared:** Zod (Validation), TypeScript
- **Infrastructure:** Docker, Docker Compose

## ⚡ Quick Start

The entire environment (API, Web, Database) is containerized for easy setup.

### 1. Prerequisites
- Docker & Docker Compose installed.
- Configure `.env` files (see sub-project READMEs).

### 2. Launch
```bash
docker-compose up --build -d
```

### 3. Development Overrides (Optional)
For local development where you need development-only configurations (like exposing the database to your host machine), use the override file:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

### 4. Initialize Database
```bash
# Run this to setup schema and seed initial data
docker-compose exec -w /app/apps/api api npx prisma migrate dev
# Run this to push schema changes(alternative)
docker-compose exec -w /app/apps/api api npx prisma db push
docker-compose exec -w /app/apps/api api npm run prisma-seed
```

## 🔗 Services

| Service | URL |
| :--- | :--- |
| **API** | [http://localhost:3000](http://localhost:3000) |
| **Web** | [http://localhost:3001](http://localhost:3001) |
| **Postgres** | `localhost:5432` |

---
*Developed with a focus on Feature-Driven Development (FDD) methodology.*
