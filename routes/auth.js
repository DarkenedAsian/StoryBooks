const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc Auth w/ google
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Logout user
// @route /auth/logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/test/:id", (req, res) => {
  res.send(req.params.id);
});

module.exports = router;
