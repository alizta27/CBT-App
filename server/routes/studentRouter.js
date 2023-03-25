const controllers = require('../controllers');
const apiPath = require('../../constant/apiPath');
const express = require('express');
const router = express.Router();

router.get(
  apiPath.api.student.allQuestion,
  controllers.student.StudentController.getListQuestion
);
router.get(
  apiPath.api.student.profile,
  controllers.student.StudentController.getStudentProfile
);
router.get(
  apiPath.api.student.getOneQuestion,
  controllers.student.StudentController.getQuestionById
);

module.exports = router;
