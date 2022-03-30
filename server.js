const express = require("express");
const mongoose = require("mongoose");
const blogs = require("./models/blogSchema");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const url =
  "mongodb+srv://a:1@cluster0.hldd1.mongodb.net/blogapi?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  blogs.find().then((result) => {
    res.json(result);
  });
});
