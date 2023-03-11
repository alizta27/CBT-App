const apiPath = require('../../constant/apiPath');
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');
// const kib = require('./kib');
// const controller = require('../controllers');
// const admin = require('./admin');
const adminRouter = require('./adminRouter');
// const profil = require('./profil');
const { authentification } = require('../middlewares/auth');

router.post(apiPath.login, Controller.login);
router.post(apiPath.getAuth, Controller.getDataByAuth);

// router.post("/register", Controller.register);
router.use(authentification);

router.use('/admin', adminRouter);
// router.use("/add", controller.admin.ClassControler.AddClassData);
// router.use("/profil", profil);

module.exports = router;
