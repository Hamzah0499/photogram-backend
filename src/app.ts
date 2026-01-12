import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {
  errorHandler,
  responseHandler,
  userRoutes,
  postRoutes,
} from "./index.imports";

const app: Express = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(responseHandler);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Photogram an Instagram Clone Backend Server!",
    environment: process.env.NODE_ENV,
  });
});

app.get("/health", async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running!",
    environment: process.env.NODE_ENV,
  });
});

app.use(errorHandler.handleError);

app.listen(process.env.PORT, () => {
  const date = new Date().toLocaleString();
  console.log(`
Date: ${date}
Environment: ${process.env.NODE_ENV}
Server running on http://localhost:${process.env.PORT}
=============================================
`);
});

export default app;
