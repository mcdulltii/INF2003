FROM 6gosrl/vuejs:latest as client

WORKDIR /client
COPY ./client .
RUN npm run build

FROM node:alpine

WORKDIR /app

COPY ./app/package.json .
RUN npm install
COPY ./app .
COPY --from=client /client/dist /app/dist

CMD ["npm", "start"]
