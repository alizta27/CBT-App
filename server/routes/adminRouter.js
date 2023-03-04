// import controllers from '@/server/controllers';
const controllers = require('../controllers');
const apiPath = require('../../constant/apiPath');
const express = require('express');
const router = express.Router();

router.post(
  apiPath.api.admin.addClass,
  controllers.admin.ClassControler.AddClassData
);
router.post(
  apiPath.api.admin.bulkAddClass,
  controllers.admin.ClassControler.bulkCreateClass
);

module.exports = router;
