### Install and Build ###
FROM node:16 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --no-audit --loglevel verbose
COPY . .
ARG configuration=prod
RUN npm run build:$configuration


### Create Container ###
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/intelcomp-catalogue-ui /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
