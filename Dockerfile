FROM node:slim

WORKDIR /app

COPY . /app 

RUN npm update 
RUN npm install 

EXPOSE 3000


