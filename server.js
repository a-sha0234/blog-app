const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const blogs = require("./models/blogSchema");
const user = require("./models/userSchema");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const blog = require("./models/blogSchema");

const app = express();

require("dotenv").config();
app.use(express.urlencoded({ extended: true })); //allows for form data to work
app.use(express.json());
app.use(
  cors({
    //allow requests from any client
    origin: "*",
  })
);
const port = process.env.PORT || 3002;

mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

passport.use(
  new LocalStrategy((username, password, done) => {
    user.findOne({ username: username }, (err, user) => {
      // Error occurred in our search
      if (err) return done(err);

      // Validates username
      if (!user) {
        return done(null, false);
      }

      // Validates password
      // bcrypt.compare(password, user.password, (err, res) => {
      //   if (res) {
      //     // Password authenticated
      //     return done(null, user);
      //   } else {
      //     // passwords do not match
      //     return done(null, false);
      //   }
      // });

      if (
        (password == user.password,
        (err, res) => {
          if (res) {
            // Password authenticated
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
      )
        return done(null, user);
    });
  })
);

app.use(blogRoutes);

// app.get("/", (req, res) => {
//   //get all blogs on index page starting with newest
//   blogs
//     .find()
//     .sort({ createAt: -1 })
//     .then((result) => {
//       res.json(result);
//     });
// });

// app.get("/:id", (req, res) => {
//   //get single blog that was clicked on
//   const id = req.params.id;
//   blogs.findById(id).then((result) => {
//     res.json(result);
//   });
// });

// app.post("/add", (req, res) => {
//   //create blog for admin user
//   const blog = new blogs({
//     Author: req.body.Author,
//     title: req.body.title,
//     blogtext: req.body.blogtext,
//   }).save((err) => {
//     res.send(err);
//   });
// });

//====================
// jwt tokens tut
//====================

app.get("/api", (req, res) => {
  res.json({ message: "welcome" });
});

// app.post("/api/posts", verifyToken, (req, res) => {
//   //protected route
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({ message: "post created ", authData });
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   user.find({ username: req.username }).then((result) => {
//     console.log(result);
//     res.json(result);
//     // jwt.sign({ user: result }, "secret key!", (err, token) => {
//     //   res.json({ token });
//   });
// });
// });

// function verifyToken(req, res, next) {
//   //function to verify token
//   const bearerHeader = req.headers["authorization"]; // gives token
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }
