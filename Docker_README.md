# Docker Documentation for Photogram Backend

This project is prepared for production using Docker with a multi-stage build process.

## Dockerfile Explanation

### Stage 1: Build
- `FROM node:20-alpine AS build`: Uses a lightweight Node.js 20 image as the base for building.
- `WORKDIR /app`: Sets the working directory to `/app`.
- `COPY package*.json ./`: Copies package files to install dependencies first (leverages Docker cache).
- `RUN npm install`: Installs all dependencies including `devDependencies`.
- `COPY . .`: Copies the entire source code.
- `RUN npm run build`: Compiles TypeScript into JavaScript in the `dist` folder.

### Stage 2: Production
- `FROM node:20-alpine`: Uses the same lightweight image for the final runtime environment.
- `WORKDIR /app`: Sets the working directory.
- `COPY package*.json ./`: Copies package files.
- `RUN npm install --omit=dev`: Installs **only** production-ready dependencies, keeping the image small and secure.
- `COPY --from=build /app/dist ./dist`: Copies the compiled code from the build stage.
- `COPY --from=build /app/src/templates ./src/templates`: Copies EJS email templates.
- `RUN mkdir -p uploads/avatars uploads/posts`: Creates necessary directories for local file handling.
- `EXPOSE 5000`: Documents that the application listens on port 5000.
- `CMD ["node", "--env-file=.env", "dist/app.js"]`: Runs the application using Node's native `.env` support (v20+).

## How to Build the Docker Image

Run the following command in the root directory:

```bash
docker build --platform=linux/amd64 -t photogram-backend .
```

## How to Run the Container Locally

You can run the container with the following command:

```bash
docker run -p 5000:5000 --env-file .env photogram-backend
```

- `-p 5000:5000`: Maps port 5000 of your machine to port 5000 of the container.
- `--env-file .env`: Passes your environment variables from the `.env` file to the container.

## Environment Variables

Ensure your `.env` file contains all necessary secrets before running the container. The Docker container expects these variables to be present:
- `PORT`
- `DATABASE_URL`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `AZURITE_STORAGE_CONNECTION_STRING`
- `IMAGEKIT_PRIVATE_KEY`
- etc.

> [!IMPORTANT]
> Since this is a production-ready setup, do not include `.env` in the Docker image itself. Always pass it at runtime using `--env-file` or your cloud provider's secret management system.
