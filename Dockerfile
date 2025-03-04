FROM node:10-slim
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8001
CMD ["npm", "start"]