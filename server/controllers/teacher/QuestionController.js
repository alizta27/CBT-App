const { Question, Class } = require('../../models');

const { v4: uuid } = require('uuid');

class QuestionControler {
  static async addQuestionData(req, res, next) {
    try {
      const { question_link, answer } = req.body;
      const teacher_id = req?.userAccessLogin?.id;
      await Question.create({
        question_link,
        answer,
        teacher_id,
        id: uuid(),
      });

      res.status(200).json({ message: 'berhasil menambahkan soal' });
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreateQuestion(req, res, next) {
    try {
      const teacher_id = req?.userAccessLogin?.id;
      const body = req?.body?.map((el) => {
        return {
          ...el,
          teacher_id,
          id: uuid(),
        };
      });

      await Question.bulkCreate(body);

      res.status(200).json({ message: 'berhasil menambahkan soal' });
    } catch (error) {
      next(error);
    }
  }

  static async editQuestion(req, res, next) {
    try {
      const id = req.params.id;
      const { body } = req;

      await Question.update(
        {
          ...body,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: 'berhasil mengedit soal' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteQuestion(req, res, next) {
    try {
      const id = req.params.id;
      await Question.destroy({
        where: { id },
      });
      res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async getListQuestion(req, res, next) {
    try {
      const teacher_id = req?.userAccessLogin?.id;
      const questions = await Question.findAll({
        where: {
          teacher_id,
        },
        include: {
          model: Class,
          attributes: ['grade', 'name'],
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      res.status(200).json({ questions });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = QuestionControler;
