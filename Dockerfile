FROM node:20.11.1-alpine as base

WORKDIR /code

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY ./src ./src
COPY tsconfig.json ./tsconfig.json

RUN yarn build

FROM node:20.11.1-alpine

COPY --from=base /code/node_modules node_modules
COPY --from=base /code/dist dist

EXPOSE 8000

CMD [ "node", "/dist/index.js" ]