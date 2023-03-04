const { verifyToken } = require('../helpers/helpers');
const { Admin } = require('../models');

const authentification = async (req, res, next) => {
  try {
    const auth_token = req.headers['auth-token'];
    const checkToken = verifyToken(auth_token);
    if (!checkToken) {
      throw new Error('Invalid token');
    }

    const id = checkToken.id;
    const userLoginData = await Admin.findByPk(id);

    if (!userLoginData) {
      throw new Error('Invalid token');
    }

    req.userAccessLogin = {
      id: userLoginData.id,
      schoolId: userLoginData.schoolId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentification;
