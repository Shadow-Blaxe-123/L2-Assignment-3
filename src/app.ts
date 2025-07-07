import express, { Application, NextFunction, Request, Response } from "express";
import GenericError from "./customError";
import bookRouter from "./app/routes/bookRoute";
import borrowRouter from "./app/routes/borrowRouter";
import cors from "cors";

const app: Application = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://assignment-4-eta-seven.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// 404 Error handler.
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new GenericError(
    `Not Found: ${req.originalUrl}`,
    404,
    "PageNotFoundError"
  );
  next(error);
});
// Custom Error handler middleware.
app.use(
  (err: GenericError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = err;
    res
      .status(statusCode)
      .json({ message: err.message, success: false, error: rest });
    next();
  }
);

export default app;
