# About the Project

<b>This project concept is an experimental playground that I use during my process of learning new technologies and programming languages.</b>

This API Project and `Web Project` primarily aim to enable people to engage in a series of debates to share their thoughts with each other. The project structure allows people to develop their ideas and thoughts on a foundation (here `news` is designated as the codename) and share them as if they were columns in newspapers, while others can share their own ideas and thoughts in response.

## Project structure

This project is developed using the FDD (Feature-Driven Development) methodology.

Folder Structure;
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

This API project uses Docker for its main dependencies: Nodejs, ExpressJs, PostgreSQL, and Prisma.

Also it uses PgAdmin for database management and JWT for authentication.

#### Running containers;

```docker
docker-compose up --build -d
```

#### Running tables and seeds;

```docker
docker-compose exec api npx prisma db push

docker-compose exec api npm run prisma-seed
```
