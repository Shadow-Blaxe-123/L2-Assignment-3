import express, { Router } from "express";
import createBorrow from "../controllers/borrow/borrow.post.controller";
import getSummary from "../controllers/borrow/borrow.get.controller";

const borrowRouter: Router = express.Router();

borrowRouter.post("/", createBorrow);

borrowRouter.get("/", getSummary);

export default borrowRouter;
