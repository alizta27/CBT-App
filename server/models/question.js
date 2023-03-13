'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Class, { foreignKey: 'class_id' });
      Question.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
    }
  }
  Question.init(
    {
      question_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Link is required',
          },
          notEmpty: {
            msg: 'Link is required',
          },
        },
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Answer is required',
          },
          notEmpty: {
            msg: 'Answer is required',
          },
        },
      },
      teacher_id: DataTypes.UUID,
      class_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );
  return Question;
};
