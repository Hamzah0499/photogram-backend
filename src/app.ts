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

/* =========================
   Allowed Frontend Origins
   ========================= */
const allowedOrigins = [
  "https://ashy-sky-0d028cb1e.6.azurestaticapps.net",
  "http://localhost:3000", // optional: local dev
];

/* =========================
   Middleware
   ========================= */
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

/* =========================
   CORS CONFIG (FIXED)
   ========================= */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow REST tools like Postman or server-to-server calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// Explicit preflight handling (important for Azure)
app.options("*", cors());

/* =========================
   Response Handler
   ========================= */
app.use(responseHandler);

/* =========================
   Routes
   ========================= */
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

/* =========================
   Error Handling
   ========================= */
app.use(errorHandler.handleError);

/* =========================
   Server
   ========================= */
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
