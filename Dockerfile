FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./
RUN npm install

COPY backend ./backend
COPY frontend ./frontend
COPY README.md ./

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
