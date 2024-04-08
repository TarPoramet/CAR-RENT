FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build .

EXPOSE 4444

CMD ["serve", "-s", ".", "-l", "4444"]