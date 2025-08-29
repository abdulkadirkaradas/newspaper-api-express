FROM node:alpine

RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
