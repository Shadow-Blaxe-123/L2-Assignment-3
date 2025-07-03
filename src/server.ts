import server from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL, PORT } = process.env;

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGODB_URL as string);
  console.log("Database connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
