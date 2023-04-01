'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      expire: DataTypes.STRING,
      secret_token: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Token telah ada',
        },
      },
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};
