FROM node:alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install -q --no-color --no-progress

COPY ./ /app/

RUN npm run build

CMD ["npm", "run", "dev"]
