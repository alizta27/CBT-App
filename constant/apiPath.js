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

    addStudent: '/admin/add-student',
    bulkAddStudent: '/admin/bulk-add-student',
    allStudent: '/admin/all-student',
    editStudent: '/admin/edit-student',
    deleteStudent: '/admin/delete-student',

    addTeacher: '/admin/add-teaccher',
    bulkAddTeacher: '/admin/bulk-add-teaccher',
    allTeacher: '/admin/all-teaccher',
    editTeacher: '/admin/edit-teaccher',
    deleteTeacher: '/admin/delete-teaccher',
  },
  api: {
    admin: {
      addClass: '/add-class',
      bulkAddClass: '/bulk-add-class',
      allClass: '/all-class',
      editClass: '/edit-class/:id',
      deleteClass: '/delete-class/:id',

      addStudent: '/add-student',
      bulkAddStudent: '/bulk-add-student',
      allStudent: '/all-student',
      editStudent: '/edit-student/:id',
      deleteStudent: '/delete-student/:id',

      addTeacher: '/add-teaccher',
      bulkAddTeacher: '/bulk-add-teaccher',
      allTeacher: '/all-teaccher',
      editTeacher: '/edit-teaccher/:id',
      deleteTeacher: '/delete-teaccher/:id',
    },
  },
};
// export default apiPath;
module.exports = apiPath;
