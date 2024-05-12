FROM node:16

FROM mcr.microsoft.com/playwright:focal
 
WORKDIR /app
 
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY src/ /app/src/
COPY tsconfig.json /app/
COPY playwright.config.ts /app/

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN npm install