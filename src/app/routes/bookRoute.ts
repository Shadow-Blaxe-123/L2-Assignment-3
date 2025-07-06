import express, { Request, Response, Router, NextFunction } from "express";
import GenericError from "../../customError";
import deleteBook from "../controllers/book/delete.controller";
import updateBook from "../controllers/book/update.controller";
import getSingleBook from "../controllers/book/getSingle.controller";
import findBookByID from "../controllers/book/find.controller";
import createBook from "../controllers/book/create.controller";

const bookRouter: Router = express.Router();

// Create books
bookRouter.post("/", createBook);
// The find route
bookRouter.get("/", findBookByID);

// Get a single book using _id.
bookRouter.get("/:bookId", getSingleBook);

// Update a book
bookRouter.put("/:bookId", updateBook);

// Delete API
bookRouter.delete("/:bookId", deleteBook);

//Error
bookRouter.use((req: Request, res: Response, next: NextFunction) => {
  const error = new GenericError(
    `Not Found: /api/books${req.path}`,
    404,
    "PageNotFoundError"
  );
  //   const error = new Error("Not Found: /api/books${req.path}");
  next(error);
});

export default bookRouter;
