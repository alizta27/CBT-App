'use strict';
const { Model } = require('sequelize');
const { hashingPassword } = require('../helpers/helpers');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.Result);
      Student.belongsTo(models.Class);
    }
  }
  Student.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username already used',
        },
        validate: {
          notNull: {
            msg: 'Username is required',
          },
          notEmpty: {
            msg: 'Username is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );
  Student.beforeCreate((ins, option) => {
    ins.password = hashingPassword(ins.password);
  });
  return Student;
};
