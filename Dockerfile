FROM node:20-alpine3.19 AS build

COPY . /app/

WORKDIR /app

RUN npm install

FROM node:20-alpine3.19 AS api

LABEL org.containers.images.source https://github.com/alexispet/final-test-Slupshi

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

COPY docker/api/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT [ "docker-entrypoint" ]
CMD ["npm", "run", "start"]