const { Question, Class, Student } = require('../../models');
const { Op } = require('sequelize');

const { v4: uuid } = require('uuid');

class StudentController {
  static async getStudentProfile(req, res, next) {
    try {
      const id = req?.userAccessLogin?.id;
      const student = await Student.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      });

      res.status(200).json({ student });
    } catch (error) {
      next(error);
    }
  }

  static async getListQuestion(req, res, next) {
    try {
      const class_id = req?.params?.class_id;

      const questions = await Question.findAll({
        where: {
          [Op.and]: [{ class_id }, { status: 1 }],
        },
        include: [
          {
            model: Class,
            attributes: ['grade', 'name'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'answer'],
        },
      });

      res.status(200).json({ questions });
    } catch (error) {
      next(error);
    }
  }

  static async getQuestionById(req, res, next) {
    try {
      const id = req?.params?.id;
      const question = await Question.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'answer'],
        },
      });

      res.status(200).json({ question });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
