FROM node:20.16.0-alpine as base


WORKDIR /usr/app

COPY package.json ./

RUN yarn install

COPY prisma ./prisma
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY .env ./env

RUN npm run prisma:generate

RUN npm run prisma:migrate-staging

RUN npm run build 


FROM node:20.16.0-alpine

WORKDIR /usr/app

ENV NODE_ENV production

COPY package.json ./
COPY --from=base /usr/app/node_modules ./node_modules
COPY --from=base /usr/app/dist ./dist

EXPOSE 4000

CMD ["npm", "start"]
