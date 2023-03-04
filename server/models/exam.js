'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.hasMany(models.Question);
      Exam.belongsTo(models.Class);
      Exam.belongsTo(models.Result);
    }
  }
  Exam.init(
    {
      question_id: DataTypes.STRING,
      class_id: DataTypes.STRING,
      time: DataTypes.DATE,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Exam',
    }
  );
  return Exam;
};
