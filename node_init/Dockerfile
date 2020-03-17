FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm cache rm --force
RUN npm install

ENTRYPOINT [ "node", "./script_init.js" ]
