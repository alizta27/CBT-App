const { Admin, Teacher, Student } = require('../models');
const {
  comparePassword,
  signToken,
  verifyToken,
} = require('../helpers/helpers.js');

// const nodemailer = require('nodemailer');

class Controller {
  static async home(req, res, next) {
    try {
      const adminx = await Admin.findAll();
      console.log('adminx: ', adminx);
      res.status(200).json({ allSchools: '..x..' });
      // return app.render(req, res, '/students', { title: 'this is title' });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let user = '';
      const { username, password, role } = req.body;

      if (role === 'admin') {
        user = await Admin.findOne({
          where: {
            username,
          },
        });
      } else if (role === 'teacher') {
        user = await Teacher.findOne({
          where: {
            username,
          },
        });
      } else if (role === 'STUDENT') {
        user = await Student.findOne({
          where: {
            username,
          },
        });
      }

      if (!user) {
        throw new Error('Invalid email or password');
      }
      const passwordCheck = comparePassword(password, user.password);

      if (!passwordCheck) {
        throw new Error('Invalid email or password');
      }

      const payload = {
        id: user.id,
        role: role,
      };

      const token = signToken(payload);
      res.status(200).json({
        message: 'User logged in successfully',
        role,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let user = '';

      const { username, password, role } = req.body;

      if (role === 'admin') {
        user = await Admin.create({
          username,
          password,
        });
      }

      // var transporter = nodemailer.createTransport({
      //   service: 'hotmail',
      //   auth: {
      //     user: 'alizta27@outlook.co.id',
      //     pass: 'trythis007',
      //   },
      // });

      // let mailOptions = {
      //   from: 'alizta27@outlook.co.id',
      //   to: email,
      //   subject: 'Sending Email using Nodejs',
      //   text: `Akun anda adalah: ${email}, password: ${password}. Tolong jangan bagikan ke orang lain.`,
      // };

      // transporter.sendMail(mailOptions, (err, info) => {
      //   if (err) throw err;
      //   console.log('Email sent: ' + info.response);
      // });

      res.status(201).json({
        message: 'User created successfully',
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDataByAuth(req, res, next) {
    try {
      console.log('hereee?');
      const auth_token = req.headers['auth-token'];
      console.log('auth_token: ', auth_token);

      const { role } = verifyToken(auth_token);
      if (!role) {
        throw new Error('Invalid Token');
      }

      res.status(200).json({ message: 'Allready logged in', role });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
