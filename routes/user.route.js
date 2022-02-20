const router = require("express").Router();
const { userController } = require("../controller/index");
const isLogin = require("../middlewares/loginCheck");

router.get("/register", userController.registerPage);
router.post("/register", userController.register);
router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.use(isLogin);
router.get("/homepage", userController.homePage);
router.get("/student", userController.studentPage);
router.get("/admin", userController.adminPage);
router.get("/forbidden", userController.forbiddenPage);
router.get("/logout", userController.logout);
router.get("/admin/:id/delete", userController.deleteUser);
router.get("/admin/:id/admin", userController.adminPage);

module.exports = router
