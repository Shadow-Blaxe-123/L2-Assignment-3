import express, { NextFunction, Request, Response } from "express";
import GenericError from "./customError";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: GenericError, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.statusCode)
      .json({ message: err.message, success: false, error: err });
  }
);

export default app;
