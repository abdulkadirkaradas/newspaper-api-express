# Newspaper API 📰

This is the backend API for the Newspaper project, built with a focus on **Feature-Driven Development (FDD)**. It enables a debate platform where users can share thoughts on news, engage in discussions, and earn badges.

## 🚀 Teck Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT (Access & Refresh Tokens)
- **Containerization:** Docker & Docker Compose
- **File Uploads:** Multer

## 🛠️ Folder Structure

The project follows the **Feature-Driven Development** (FDD) methodology:

```text
src/
 ├── core/           # Shared configurations, helpers, and middlewares
 │   ├── config/
 │   ├── helper/
 │   ├── middleware/
 │   ├── app.ts      # Express application setup
 ├── features/       # Business logic grouped by feature
 │   ├── auth/       # Authentication (Login, Register, etc.)
 │   ├── news/       # News management
 │   ├── users/      # User information
 │   ├── ...
 ├── routes/         # Route definitions
 │   ├── api.ts      # API entry point
 │   ├── web.ts      # Web entry point
 ├── index.ts        # Entry point
 ├── server.ts       # Server initialization
```

## ⚙️ Environment Variables

Create a `.env` file in `apps/api/` based on `.env.example`:

```env
APP_NAME="Newspaper API"
DATABASE_URL="postgresql://admin:pass@db:5432/newspaperapi?schema=public"

# Postgres Configuration
POSTGRES_USER=admin
POSTGRES_PASSWORD=pass
POSTGRES_DB=newspaperapi

# JWT Secrets
JWT_SECRET_ACCESS=your_access_token_secret
JWT_SECRET_REFRESH=your_refresh_token_secret
```

## 📦 Installation & Setup

1. **Spin up Docker containers:**
   ```bash
   docker-compose up --build -d
   ```

   **Development Overrides (Optional):**
   If you need development-only configurations (e.g., exposing PostgreSQL port `5432` to host), use:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
   ```

2. **Initialize Database (Prisma):**
   ```bash
   # Run migrations
   docker-compose exec -w /app/apps/api api npx prisma migrate dev
   
   # Push schema changes (alternative)
   docker-compose exec -w /app/apps/api api npx prisma db push
   
   # Seed initial data
   docker-compose exec -w /app/apps/api api npm run prisma-seed
   ```

3. **Generating JWT Secret Access and Refresh Keys:**<br>
   Run the following command to generate a secure random key:
   ```bash
      node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the generated keys and paste them into the `.env` file.

   > [!Note]
   > You should generate separate keys for access and refresh tokens.<br>
   > The generated keys are random and must be kept secure.<br>
   > If you need to regenerate the keys, run the command again and update the `.env` file.

   **Example `.env` configuration**
   ```env
   JWT_SECRET_ACCESS=generated_token_secret_access
   JWT_SECRET_REFRESH=generated_token_secret_refresh
   ```

## 📜 Available Scripts

- `npm run dev`: Starts the development server with `nodemon` and `tsx`.
- `npm run prisma-seed`: Seeds the database with mock data.
- `npm run prisma-migrate`: Creates a new migration based on schema changes.
- `npm run prisma-generate`: Generates the Prisma Client.

## 🔌 API Endpoints

The API is served at `http://localhost:3000/api`. Major route categories:

- `POST /auth/register` & `POST /auth/login`: Authentication
- `/posts`: Discussion posts and news contents
- `/users`: User profiles and management
- `/badges`: Achievement system
- `/announcements`: System-wide announcements
- `/notifications`: Real-time user updates

## 🐳 Docker & Prisma Management

### Remove containers
Use the `-v` flag to remove volumes as well:
```bash
docker-compose down -v
```

### Reset Database
To truncate the database and re-seed:
```bash
docker-compose exec -w /app/apps/api api npx prisma db push --force-reset
docker-compose exec -w /app/apps/api api npm run prisma-seed
```

### Update Prisma Client
Run this after modifications to `schema.prisma`:
```bash
docker-compose exec -w /app/apps/api api npm run prisma-generate
```

