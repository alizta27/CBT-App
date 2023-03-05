const controllers = require('../controllers');
const apiPath = require('../../constant/apiPath');
const express = require('express');
const router = express.Router();

router.get(
  apiPath.api.admin.allClass,
  controllers.admin.ClassControler.getListClass
);
router.post(
  apiPath.api.admin.addClass,
  controllers.admin.ClassControler.AddClassData
);
router.post(
  apiPath.api.admin.bulkAddClass,
  controllers.admin.ClassControler.bulkCreateClass
);
router.post(
  apiPath.api.admin.editClass,
  controllers.admin.ClassControler.editClass
);
router.delete(
  apiPath.api.admin.deleteClass,
  controllers.admin.ClassControler.deleteClass
);

module.exports = router;
