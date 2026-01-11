FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/src/templates ./src/templates

RUN mkdir -p uploads/avatars uploads/posts

EXPOSE 5000

# Start the app
CMD ["node", "dist/app.js"]
