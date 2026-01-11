import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {
  // middlewares
  errorHandler,
  responseHandler,
  // Routes
  userRoutes,
  postRoutes,
} from "./index.imports";

// 3rd party middleware
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//  Api response Handler
app.use(responseHandler);

// REST API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Photogram an Instagram Clone Backend Server!",
    Environment: process.env.NODE_ENV,
  });
});

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running!",
    Environment: process.env.NODE_ENV,
  });
});

// Error handling middleware
app.use(errorHandler.handleError);

app.listen(process.env.PORT, () => {
  const date = new Date().toLocaleString();
  console.log(`
    Date: ${date}
    Environment: ${process.env.NODE_ENV}
    Server running on http://localhost:${process.env.PORT}\n=============================================\n`);
});

export default app;
