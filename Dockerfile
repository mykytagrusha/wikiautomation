FROM node:16

FROM mcr.microsoft.com/playwright:focal
 
WORKDIR /app
 
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY src/ /app/src/
COPY tsconfig.json /app/
COPY playwright.config.ts /app/

RUN npm install