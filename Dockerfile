FROM node:14.11.0-buster-slim

RUN apt-get update && apt-get install -y apache2-utils

WORKDIR /app
COPY package.json .

# Installs both dev and production dependencies
RUN yarn install

COPY index.js .
COPY __tests__ .

CMD ["yarn", "start"]
