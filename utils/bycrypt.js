const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}

module.exports = {
  hashPassword,
  comparePassword
};
