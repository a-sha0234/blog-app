const express = require("express");

const user = require("../models/userSchema");

const userController = require("../controllers/userController");

const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.get("/posts", blogController.getPostsAdmin);
router.post("/add", blogController.addBlogAdmin);
router.delete("/posts/:id", blogController.deleteBlogAdmin);
router.get("/allposts", blogController.getBlogsNonAdmin);

router.post("/add/comment", commentController.post_create_comment);

router.get("/posts/:postsid/comment", commentController.get_comment);

router.post("/login", userController.log_in_post);
router.post("/protected", userController.protected_get);

module.exports = router;
