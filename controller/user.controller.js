const { Users } = require("../models");
const { comparePassword } = require("../utils/bycrypt");
const uuid = require("uuid");

class userController {

  static async registerPage(req, res) {
    let errors = [];
    if (req.query.error) {
      errors = req.query.error.split(",");
      res.render("register", { errors });
    } else {
      res.render("register", { errors });
    }
  }


  static async register(req, res) {
    const data = {
      id: uuid.v4(),
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const user = await Users.create(data);
    if (user) {
      res.redirect("login");
    } else {
      let errors = [];
      err.errors.forEach((el) => {
        errors.push(el.message);
      });
      res.redirect(`users/register?error=${errors}`);
    }
  }


  static async loginPage(req, res) {
    let error = "";
    if (req.query.error) {
      error = req.query.error;
      res.render("login", { error });
    } else {
      res.render("login", { error });
    }
  }


  static async login(req, res) {
    try {
      const user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        const isValid = await comparePassword(req.body.password, user.password);
        if (isValid) {
          req.session.isLogin = true;
          req.session.email = user.email;
          req.session.role = user.role;
          res.redirect("homepage");
        } else {
          res.redirect("login?error=invalid password");
        }
      } else {
        res.redirect("login?error=invalid email");
      }
    } catch (error) {
      console.log(error);
      res.redirect("login?error=invalid email");
    }
  }


  static async homePage(req, res) {
    if (req.session.role === "admin") {
      res.redirect("admin");
    } else {
      res.redirect("student");
    }
  }

// Student  
  static async studentPage(req, res) {
    const email = req.session.email;
    res.render("student", { email });
  }

// Admin bisa melihat semua Student  
  static async adminPage(req, res) {
    const role = req.session.role;
    let error = "";
    if (role === "admin") {
      const users = await Users.findAll({
        where: {
          role: "student",
        },
      });
      if (users) {
        res.render("admin", { data: users, email: req.session.email, error });
      } else {
        error = "Gagal mengambil data";
        res.render("admin", { data: [], email: req.session.email, error });
      }
    } else {
      res.redirect("forbidden");
    }
  }

  
  static async logout(req, res) {
    req.session.destroy();
    res.redirect("login");
  }


  static async deleteUser(req, res) {
    const user = await Users.destroy({
        where: { id: req.params.id },
    });
    if (user) {
      res.redirect("admin");
    } else {
      res.redirect("admin");
    }
  }


  static async forbiddenPage(req, res) {
    res.render("forbidden");
  }
}

module.exports = userController
