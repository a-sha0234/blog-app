const express = require("express");
const blogs = require("../models/blogSchema");
const user = require("../models/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
const comment = require("../models/commentSchema");

const router = express.Router();

router.get("/posts", userController.protected_get, (req, res) => {
  //get all blogs for admin
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

router.post("/add", userController.protected_get, (req, res) => {
  console.log(req.body);
  //create blog for admin user
  const blog = new blogs({
    Author: req.body.Author,
    title: req.body.title,
    blogtext: req.body.blogtext,
  }).save((err) => {
    res.send(err);
  });
});

router.delete("/posts/:id", userController.protected_get, (req, res) => {
  //delete blog for admin
  blogs.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    res.json("blog deleted successfully!");
  });
});

// router.get("/allposts/details/:id", (req, res) => {
//   //get single blog that was clicked on for non-admin
//   const id = req.params.id;
//   blogs.findById(id).then((result) => {
//     res.json(result);
//   });
// });

router.get("/allposts", (req, res) => {
  //get all blogs for non-admin
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

router.post("/add/comment", (req, res) => {
  console.log(req.body);
  //create comment for non admins
  const comments = new comment({
    id: req.body.id,
    name: req.body.name,
    comment: req.body.comment,
  }).save((err) => {
    res.send(err);
  });
});

router.get("/posts/:postsid/comment", (req, res) => {
  //working on this
  //get all comments for users
  comment
    .find({ id: req.params.postsid })
    .sort({ createAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", userController.log_in_post);
router.post("/protected", userController.protected_get);

module.exports = router;
