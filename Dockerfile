FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY prisma ./prisma
COPY . .
RUN npm ci && npx prisma generate && npm cache clean --force
CMD ["npm", "run", "start:dev"]