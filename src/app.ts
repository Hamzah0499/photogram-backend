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
    origin: [
      process.env.FRONTEND_URL as string,
      (process.env.FRONTEND_URL as string).slice(0, -1),
      "http://localhost:3000",
    ],
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
  // const response = await db.select({ id: userSchema.id, email: userSchema.email, name: userSchema.fullname, role: userSchema.userType }).from(userSchema);
  // console.log(response);

  res.status(200).json({
    message: "Welcome to Photogram an Instagram Clone Backend Server!",
    frontend: process.env.FRONTEND_URL,
    Environment: process.env.NODE_ENV,
    // response: response
  });
});

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running!",
    frontend: process.env.FRONTEND_URL,
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
    Frontend: ${process.env.FRONTEND_URL}
    Server running on http://localhost:${process.env.PORT}\n=============================================\n`);
});

export default app;
