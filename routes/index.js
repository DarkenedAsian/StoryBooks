const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//whenever u want to use middleware in route, just input as second argument

// @desc Login/Landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  //automatically is placed in /views directory
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", ensureAuth, (req, res) => {
  console.log(req.user);
  res.render("dashboard", {
    //pass in information to dashboard
    name: req.user.firstName,
  });
});

router.post("/test/:id", (req, res) => {
  res.send(req.params.id);
});

module.exports = router;
