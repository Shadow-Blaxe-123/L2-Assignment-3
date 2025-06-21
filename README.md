# Library Management API

A Node.js + Express backend for managing a digital library system. It supports CRUD operations for books, borrow tracking, and a summary of borrowed books. MongoDB Atlas is used as the database, connected via Mongoose.

---

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) operations for books
- Record book borrowing with quantity and due date
- Aggregate summary: total copies borrowed per book, with book details

---

## 🛠️ Tech Stack

- **Node.js**
- **Typescript**
- **Express**
- **MongoDB Atlas** for database
- **Mongoose** for object modeling

## API Endpoints

### Books

POST /api/books — Add a new book

GET /api/books — Get all books (supports optional filtering, sorting, and limiting)

GET /api/books/:bookId — Get a specific book by ID

PATCH /api/books/:bookId — Update a book's info

DELETE /api/books/:bookId — Delete a book

### Borrow

POST /api/borrow — Create a borrow record

GET /api/borrow — Get summary: total quantity borrowed per book, with title and ISBN

## Folder Structure

```bash

src/
├── app/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routers
│   ├── controllers/   # Logic for handling routes
├── app.ts             # Main App file where base routes go
├── server.ts          # Main server file
├── customError.ts     # A Generic Error Handler
├── customSuccess.ts   # A Generic Response builder for successful operations.

```
