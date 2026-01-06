FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm install

WORKDIR /app

EXPOSE 5173

# Run vite with --host to expose to network
CMD ["npm", "run", "dev", "--workspace=@repo/web", "--", "--host"]
