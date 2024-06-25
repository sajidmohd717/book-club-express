import express from "express";

import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || 3500; // If process.env.PORT is undefined, then it defaults to 3000
const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

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
