FROM node:7-alpine
WORKDIR /app
COPY . /app
ENTRYPOINT ["npm", "start"]
RUN npm install
RUN npm run build
