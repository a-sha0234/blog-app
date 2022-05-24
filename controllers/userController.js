const jwt = require("jsonwebtoken");
const passport = require("passport");
const user = require("../models/userSchema");

exports.log_in_post = [
  passport.authenticate("local", {
    failureMessage: true,
    session: false,
  }),
  (req, res, next) => {
    // Create our token and send back to the user (client must save this token)
    jwt.sign(
      { username: req.body.username, password: req.body.password },
      "tomato",
      (err, token) => {
        if (err) next(err);

        res.json({ token });
      }
    );
  },
];

exports.protected_get = [
  (req, res, next) => {
    // Pull the bearerHeader

    const bearerHeader = req.headers["authorization"];

    // let head = req.headers["authorization"].split(":").splice(1, 1).join(""); // remove first item

    // let newHead = head.split("");

    // let latest = newHead.slice(1, newHead.length - 2).join(""); // remove speech marks
    // console.log(latest);

    if (typeof bearerHeader !== "undefined") {
      let head = req.headers["authorization"].split(":").splice(1, 1).join(""); // remove first item

      let newHead = head.split("");

      let latest = newHead.slice(1, newHead.length - 2).join(""); // remove speech marks
      const bearer = bearerHeader.split(" ");

      const bearerToken = latest;
      // console.log(bearerToken);

      req.token = bearerToken;
      next();
    } else {
      res.status(403).json({
        message: "Protected route - not authorized",
      });
    }
  },
  (req, res, next) => {
    jwt.verify(req.token, "tomato", (err, authData) => {
      if (err) {
        res.status(403).json({ msg: "Failed authentication" });
      } else {
        // Only gets hit if user is authorized

        // res.json({ msg: "Accessed protected route - success", authData });
        next();
      }
    });
  },
];

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.header("x-auth-token");
//         if (!token) return res.status(403).send("Access denied.");

//         const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).send("Invalid token");
//     }
// };
