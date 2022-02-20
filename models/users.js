'use strict';
const {
  Model
} = require('sequelize');
const { 
  hashPassword
 } = require('../utils/bycrypt')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
    }
  }
  Users.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: {
          msg: 'Harap masukkan dalam format email'
        },
        notEmpty: {
          msg: "Email tidak boleh kosong",
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password tidak boleh kosong",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Peran tidak boleh kosong",
        },
      },
    },
  }, 
  {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};