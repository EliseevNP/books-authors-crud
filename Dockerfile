FROM node:13-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

COPY .sequelizerc ./
COPY tsconfig.json ./
COPY .env ./
COPY ./src ./src

ENTRYPOINT ["./docker-entrypoint.sh", "start"]
