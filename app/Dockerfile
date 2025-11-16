FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV VERSION="blue"
EXPOSE 9090
CMD ["npm", "start"]

