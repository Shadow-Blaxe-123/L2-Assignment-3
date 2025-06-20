import express, { Request, Response, Router } from "express";
const bookRouter: Router = express.Router();

// Create books
bookRouter.post("/", (req: Request, res: Response) => {
  res.status(200).send("Book Route post method");
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
