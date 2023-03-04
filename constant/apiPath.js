const apiPath = {
  root: '/',
  login: '/login',
  register: '/register',
  getAuth: '/getAuth',
  student: {},
  teacher: {},
  admin: {
    addClass: '/admin/addClass',
    bulkAddClass: '/admin/bulkAddClass',
  },
  api: {
    admin: {
      addClass: '/addClass',
      bulkAddClass: '/bulkAddClass',
    },
  },
};
// export default apiPath;
module.exports = apiPath;
