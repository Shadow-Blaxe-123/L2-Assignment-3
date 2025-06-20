import express, { Request, Response } from "express";

const borrowRouter = express.Router();

borrowRouter.post("/", (req: Request, res: Response) => {
  res.status(200).send("Borrow Route post method");
});

borrowRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Borrow Route get method");
});

export default borrowRouter;
