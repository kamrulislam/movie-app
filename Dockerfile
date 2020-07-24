FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install --global http-server
WORKDIR /usr/src/app/dist/movie-app
CMD ["http-server"]
