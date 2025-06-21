import express, { Request, Response, Router } from "express";
import BookModel from "../models/book.model";
import customSuccess from "../../customSuccess";
import GenericError from "../../customError";
// import { MongooseError } from "mongoose";

const bookRouter: Router = express.Router();

// Create books
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newBook = await BookModel.create(req.body);
    const checkBook = await BookModel.findById(newBook._id);
    const result = customSuccess(true, "Book created successfully", checkBook);
    res.status(201).json(result);
  } catch (error) {
    const err: GenericError = new GenericError("Validation failed", 400);
    res.status(err.statusCode).json(err.errormsg(error));
  }
});
/*
 Add Queries FIlter, sortby & sort, limit
Example Qeury: /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
Query Parameters:
filter: Filter by genre
sort: asc or desc
limit: Number of results (default: 10)
*/
bookRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Book Route get method", query: req.query });
});

/*
3. Get Book by ID
GET /api/books/:bookId
*/
bookRouter.get("/:bookId", (req: Request, res: Response) => {
  res.status(200).send("Book Route get by id method");
});

/*
4. Update Book
PUT /api/books/:bookId
*/
bookRouter.put("/:bookId", (req: Request, res: Response) => {
  res.status(201).send("Book Route update method");
});

/**
5. Delete Book
DELETE /api/books/:bookId
 */
bookRouter.delete("/:bookId", (req: Request, res: Response) => {
  res.status(200).send("Book Route delete method");
});

export default bookRouter;
