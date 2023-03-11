const { Teacher } = require('../../models');

const { v4: uuid } = require('uuid');
const { hashingPassword } = require('../../helpers/helpers');

class StudentController {
  static async addTeacherData(req, res, next) {
    try {
      const { full_name, password, task, username } = req.body;
      await Teacher.create({
        full_name,
        password,
        task,
        username,
        id: uuid(),
      });

      res.status(200).json({ message: 'berhasil menambahkan guru' });
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreateTeacher(req, res, next) {
    try {
      const body = req?.body?.map((el) => {
        return {
          ...el,
          id: uuid(),
          password: hashingPassword(el.password),
        };
      });

      await Teacher.bulkCreate(body);

      res.status(200).json({ message: 'berhasil menambahkan guru' });
    } catch (error) {
      next(error);
    }
  }

  static async editTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const { body } = req;

      await Teacher.update(
        {
          ...body,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: 'berhasil mengedit guru' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeacher(req, res, next) {
    try {
      const id = req.params.id;
      await Teacher.destroy({
        where: { id },
      });
      res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async getListTeacher(req, res, next) {
    try {
      const teachers = await Teacher.findAll();
      res.status(200).json({ teachers });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
