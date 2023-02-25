FROM node:18.12.1
WORKDIR /app/src/prod
COPY . /usr/src/prod
RUN npm install
RUN npm run build
RUN npm start
EXPOSE 3000