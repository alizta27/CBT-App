const apiPath = {
  root: '/',
  login: '/login',
  register: '/register',
  getAuth: '/getAuth',
  student: {},
  teacher: {},
  admin: {
    addClass: '/admin/add-class',
    bulkAddClass: '/admin/bulk-add-class',
    allClass: '/admin/all-class',
    editClass: '/admin/edit-class',
    deleteClass: 'admin/delete-class',
  },
  api: {
    admin: {
      addClass: '/add-class',
      bulkAddClass: '/bulk-add-class',
      allClass: '/all-class',
      editClass: '/edit-class/:id',
      deleteClass: '/delete-class/:id',
    },
  },
};
// export default apiPath;
module.exports = apiPath;
