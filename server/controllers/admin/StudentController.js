const { Student } = require('../../models');

const { v4: uuid } = require('uuid');

class StudentController {
  static async AddStudentData(req, res, next) {
    try {
      const { username, password, class_id } = req.body;
      await Student.create({
        username,
        password,
        class_id,
      });

      res.status(200).json({ message: 'berhasil menambahkan kelas' });
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreateStudent(req, res, next) {
    try {
      const body = req?.body?.map((el) => {
        return {
          ...el,
          id: uuid(),
        };
      });

      await Student.bulkCreate(body);

      res.status(200).json({ message: 'berhasil menambahkan kelas' });
    } catch (error) {
      next(error);
    }
  }

  static async editStudent(req, res, next) {
    try {
      const id = req.params.id;
      const { username, password, class_id } = req.body;

      await Student.update(
        {
          username,
          password,
          class_id,
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

  static async deleteStudent(req, res, next) {
    try {
      const id = req.params.id;
      await Student.destroy({
        where: { id },
      });
      res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async getListStudent(req, res, next) {
    try {
      const students = await Student.findAll();
      res.status(200).json({ students });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
