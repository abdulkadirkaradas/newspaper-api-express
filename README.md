# About the Project

<b>This project concept is an experimental playground that I use during my process of learning new technologies and programming languages.</b>

This API Project and `Web Project` primarily aim to enable people to engage in a series of debates to share their thoughts with each other. The project structure allows people to develop their ideas and thoughts on a foundation (here `news` is designated as the codename) and share them as if they were columns in newspapers, while others can share their own ideas and thoughts in response.

## Project Structure

This project is developed using the FDD (Feature-Driven Development) methodology.

### TechStack

This API project is built using Node.js, Express.js, PostgreSQL, and Prisma. It uses Docker for environment management and JWT for authentication.

**Primarily Technologies:**

- Nodejs
- ExpressJs
- PostgreSQL
- Prisma
- JWT

### Folder Structure;

```
src/
 ├── core/
 │   ├── config/
 │   ├── helper/
 │   ├── middleware/
 │   ├── app.ts
 ├── features/
 │   ├── auth/
 │   ├── news/
 │   ├── users/
 │   ├── ...
 ├── routes/
 │   ├── api.ts
 │   ├── web.ts
 ├── index.ts
 ├── server.ts
...
```

## Docker

#### Running containers;

```docker
docker-compose up --build -d
```

#### Remove containers;

`-v` flag will remove volumes as well.

```docker
docker-compose down -v
```

## Prisma

#### First run;

```docker
docker-compose exec api npx prisma migrate dev

docker-compose exec api npx prisma db push

docker-compose exec api npm run prisma-seed
```

#### Updating Prisma Client;

> [!note]
> If you make changes to the schema, you need to run this command. You must also run the commands in the section below.

```docker
docker-compose exec api npm run prisma-generate
```

#### Truncate database and seed;

> [!warning]
> This command will truncate the database, push the tables, and seed it again.

```docker
docker-compose exec api npx prisma db push --force-reset

docker-compose exec api npm run prisma-seed
```
