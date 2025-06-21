import { Types, Model, Document } from "mongoose";

export interface Book extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookModelType extends Model<Book> {
  borrowCopy(bookId: Types.ObjectId, quantity: number): Promise<Book>;
  checkAvailability(bookId: Types.ObjectId): Promise<Book>;
}

export interface Borrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
