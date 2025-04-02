FROM node:20-alpine
WORKDIR /backend
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.js"]
