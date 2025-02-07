FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "start:prod" ]