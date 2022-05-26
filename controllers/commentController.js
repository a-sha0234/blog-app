const comment = require("../models/commentSchema");

const post_create_comment = (req, res) => {
  console.log(req.body);
  //create comment for non admins
  const comments = new comment({
    id: req.body.id,
    name: req.body.name,
    comment: req.body.comment,
  }).save((err) => {
    res.send(err);
  });
};

const get_comment = (req, res) => {
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
};

module.exports = { post_create_comment, get_comment };
