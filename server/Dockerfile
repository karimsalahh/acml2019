FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/
RUN npm install
COPY . /src/app
EXPOSE 5000
CMD ["npm", "start"]