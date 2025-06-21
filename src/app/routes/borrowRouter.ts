import express, { Request, Response, Router } from "express";
import BorrowModel from "../models/borrow.model";

const borrowRouter: Router = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  const newBorrow = BorrowModel.create(req.body);
  res.status(200).json(newBorrow);
});

borrowRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Borrow Route get method");
});

export default borrowRouter;
