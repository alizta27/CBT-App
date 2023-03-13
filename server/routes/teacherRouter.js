const controllers = require('../controllers');
const apiPath = require('../../constant/apiPath');
const express = require('express');
const { authTeacher } = require('../middlewares/auth');
const router = express.Router();

router.use(authTeacher);

router.get(
  apiPath.api.teacher.allQuestion,
  controllers.teacher.QuestionController.getListQuestion
);
router.post(
  apiPath.api.teacher.addQuestion,
  controllers.teacher.QuestionController.addQuestionData
);
router.post(
  apiPath.api.teacher.bulkAddQuestion,
  controllers.teacher.QuestionController.bulkCreateQuestion
);
router.post(
  apiPath.api.teacher.editQuestion,
  controllers.teacher.QuestionController.editQuestion
);
router.delete(
  apiPath.api.teacher.deleteQuestion,
  controllers.teacher.QuestionController.deleteQuestion
);

module.exports = router;
