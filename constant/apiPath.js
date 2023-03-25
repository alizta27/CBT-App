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

    addTeacher: '/admin/add-teacher',
    bulkAddTeacher: '/admin/bulk-add-teacher',
    allTeacher: '/admin/all-teacher',
    editTeacher: '/admin/edit-teacher',
    deleteTeacher: '/admin/delete-teacher',
  },

  teacher: {
    allQuestion: '/teacher/all-question',
    allClass: '/teacher/all-class',
    addQuestion: 'teacher/add-question',
    bulkAddQuestion: 'teacher/bulk-add-question',
    editQuestion: '/teacher/edit-question',
    deleteQuestion: '/teacher/delete-question',
    changeStatus: '/teacher/change-status',
  },
  student: {
    allQuestion: '/student/all-question',
    profile: '/student/profile',
    getOneQuestion: '/student/one-question',
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

      addTeacher: '/add-teacher',
      bulkAddTeacher: '/bulk-add-teacher',
      allTeacher: '/all-teacher',
      editTeacher: '/edit-teacher/:id',
      deleteTeacher: '/delete-teacher/:id',
    },

    teacher: {
      allQuestion: '/all-question',
      allClass: '/all-class',
      addQuestion: '/add-question',
      bulkAddQuestion: '/bulk-add-question',
      editQuestion: '/edit-question/:id',
      deleteQuestion: '/delete-question/:id',
      changeStatus: '/change-status',
    },
    student: {
      allQuestion: '/all-question/:class_id',
      getOneQuestion: '/one-question/:id',
      profile: '/profile',
    },
  },
};
// export default apiPath;
module.exports = apiPath;
