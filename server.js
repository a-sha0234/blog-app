const express = require("express");
const mongoose = require("mongoose");
const blogs = require("./models/blogSchema");

const app = express();
require("dotenv").config();
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  //get all blogs on index page starting with newest
  blogs
    .find()
    .sort({ createAt: -1 })
    .then((result) => {
      res.json(result);
    });
});

app.get("/:id", (req, res) => {
  //get single blog that was clicked on
  const id = req.params.id;
  blogs.findById(id).then((result) => {
    res.json(result);
  });
});

app.post("/", (req, res) => {
  //create blog
  const blog = new blogs({
    Author: req.body.Author,
    title: req.body.title,
    blogtext: req.body.blogtext,
  }).save((err) => {
    res.send(err);
  });
});
