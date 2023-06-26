FROM 6gosrl/vuejs:latest as client

USER root
WORKDIR /client
COPY ./client .
RUN npm run build

FROM node:alpine

WORKDIR /app

COPY ./app/package.json .
RUN npm install
COPY ./app .
COPY --from=client /client/dist /client/dist

CMD ["npm", "start"]
