FROM node:lts-alpine3.19

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]