const express = require("express");
const blogs = require("../models/blogSchema");
const user = require("../models/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/posts", userController.protected_get, (req, res) => {
  //get all blogs
  blogs
    .find()
    .sort({ createAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  //get single blog that was clicked on
  const id = req.params.id;
  blogs.findById(id).then((result) => {
    res.json(result);
  });
});

router.post("/add", (req, res) => {
  //create blog for admin user
  const blog = new blogs({
    Author: req.body.Author,
    title: req.body.title,
    blogtext: req.body.blogtext,
  }).save((err) => {
    res.send(err);
  });
});

//testing

// router.post("/login", (req, res) => {
//   console.log(req.body);
//   user
//     .find({ username: req.body.username, password: req.body.password })
//     .then((result) => {
//       console.log({ user: result[0].username, pass: req.body.password });
//       res.json(result);
//       // jwt.sign({ user: result }, "secret key!", (err, token) => {
//       //   res.json({ token });
//       // });
//     });
// });

router.delete("/posts/:id", (req, res) => {
  //delete blog
  blogs.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    res.json(result);
  });
});

router.post("/login", userController.log_in_post);
router.post("/protected", userController.protected_get);

module.exports = router;
