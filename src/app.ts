import express, { Application, NextFunction, Request, Response } from "express";
import GenericError from "./customError";
import bookRouter from "./app/routes/bookRoute";
import borrowRouter from "./app/routes/borrowRouter";

const app: Application = express();
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
