FROM node:13-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

COPY .sequelizerc ./
COPY tsconfig.json ./
COPY .env ./

ENTRYPOINT ["./docker-entrypoint.sh", "dev"]
