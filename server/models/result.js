'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Result.hasMany(models.Exam);
      Result.belongsTo(models.Student);
    }
  }
  Result.init(
    {
      student_id: DataTypes.STRING,
      result: DataTypes.STRING,
      exam_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Result',
    }
  );
  return Result;
};
