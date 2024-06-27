import express from "express";

import dotenv from "dotenv";

import mongoose from "mongoose";

import { Book } from "./models/bookModel.js";

import booksRoute from "./routes/booksRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3500; // If process.env.PORT is undefined, then it defaults to 3000
const app = express();

app.use(express.json()); //this is so that you can enter json inputs

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

app.use(cors())

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
