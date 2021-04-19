FROM node:8.12-alpine AS base
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run tsoa:gen
RUN apk update && apk add bash
RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -O wait-for-it.sh && chmod +x wait-for-it.sh
