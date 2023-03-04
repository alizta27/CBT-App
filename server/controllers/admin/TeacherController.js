const { Teacher } = require('../../models');

const { v4: uuid } = require('uuid');

class StudentController {
  static async AddTeacherData(req, res, next) {
    try {
      const { full_name, password, task, username } = req.body;
      await Teacher.create({
        full_name,
        password,
        task,
        username,
      });

      res.status(200).json({ message: 'berhasil menambahkan kelas' });
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
        };
      });

      await Teacher.bulkCreate(body);

      res.status(200).json({ message: 'berhasil menambahkan kelas' });
    } catch (error) {
      next(error);
    }
  }

  static async editTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const { full_name, password, task, username } = req.body;

      await Teacher.update(
        {
          full_name,
          password,
          task,
          username,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: 'berhasil mengedit kelas' });
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
