const express = require("express");
require("dotenv").config();

const PORT = 5001;

const app = express();
const productRoutes = require("./routes/products");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://mele:${process.env.PW}@tdd-app-cluster.xtvvf.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  // .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// app.listen(PORT);
// console.log(`Running on port ${PORT}`);

module.exports = app;
