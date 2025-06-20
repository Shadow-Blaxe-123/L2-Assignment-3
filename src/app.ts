import express, { NextFunction, Request, Response } from "express";
import GenericError from "./customError";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new GenericError(`Not Found: ${req.originalUrl}`, 404);
  next(error);
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: GenericError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = err;
    res
      .status(statusCode)
      .json({ message: err.message, success: false, error: rest });
  }
);

export default app;
