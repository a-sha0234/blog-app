const blogs = require("../models/blogSchema");

const userController = require("../controllers/userController");

const getPostsAdmin =
  (userController.protected_get,
  (req, res) => {
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

const addBlogAdmin =
  (userController.protected_get,
  (req, res) => {
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

const deleteBlogAdmin =
  (userController.protected_get,
  (req, res) => {
    //delete blog for admin
    blogs.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res.json("blog deleted successfully!");
    });
  });

const getBlogsNonAdmin = (req, res) => {
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
};

module.exports = {
  getPostsAdmin,
  addBlogAdmin,
  deleteBlogAdmin,
  getBlogsNonAdmin,
};
