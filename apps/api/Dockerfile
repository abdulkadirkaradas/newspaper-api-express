FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
# Copy all source code to ensure workspace linking works during install
# In a real optimized build we might copy only package.jsons first, but for dev this is fine/simpler
COPY apps ./apps
COPY packages ./packages

RUN npm install

WORKDIR /app/apps/api
RUN npx prisma generate

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=@repo/api"]
