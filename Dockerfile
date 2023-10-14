FROM ubuntu:latest
USER root

WORKDIR /app

COPY . /app

COPY package.json ./
COPY tsconfig.json ./

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs

RUN npm install

RUN npx playwright install

RUN npx playwright install-deps

RUN npx playwright install --with-deps chromium

EXPOSE 10000
CMD npm run dev
