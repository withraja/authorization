const router = require("express").Router();
const userRoute = require("./user.route");

router.get("/", (req, res) => {
  let error = "";
  res.render("login", { error });
});
router.use("/users", userRoute);

module.exports = router;
