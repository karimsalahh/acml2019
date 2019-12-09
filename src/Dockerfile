FROM node:latest
RUN mkdir -p /src/client
WORKDIR /src/client
COPY package.json /src/client/
RUN npm install
COPY . /src/client
EXPOSE 3000
CMD ["npm", "start"]