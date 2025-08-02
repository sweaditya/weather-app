FROM node:18

WORKDIR /app

COPY backend ./backend

WORKDIR /app/backend
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]