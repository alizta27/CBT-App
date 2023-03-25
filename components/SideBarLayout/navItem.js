import appPath from '@/constant/appPath';

export const admin = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    path: appPath.admin.dashboard,
  },
  {
    key: 'class',
    title: 'Data Kelas',
    children: [
      {
        key: 'classList',
        title: 'Daftar Kelas',
        path: appPath.admin.classList,
      },
      {
        key: 'addClass',
        title: 'Tambah Kelas',
        path: appPath.admin.addClass,
      },
    ],
  },
  {
    key: 'student',
    title: 'Data Siswa',
    children: [
      {
        key: 'studentList',
        title: 'Daftar Siswa',
        path: appPath.admin.studentList,
      },
      {
        key: 'addStudent',
        title: 'Tambah Siswa',
        path: appPath.admin.addStudent,
      },
    ],
  },
  {
    key: 'teacher',
    title: 'Data Guru',
    children: [
      {
        key: 'teacherList',
        title: 'Daftar Guru',
        path: appPath.admin.teacherList,
      },
      {
        key: 'addTecher',
        title: 'Tambah Guru',
        path: appPath.admin.addTeacher,
      },
    ],
  },
  {
    key: 'exam',
    title: 'Data Ujian',
    path: appPath.admin.createExam,
  },
];

export const teacher = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    path: appPath.teacher.dashboard,
  },
  {
    key: 'question',
    title: 'Data Soal Ujian',
    children: [
      {
        key: 'quextionList',
        title: 'Daftar Soal Ujian',
        path: appPath.teacher.questionList,
      },
      {
        key: 'addQuestion',
        title: 'Tambah Soal Ujian',
        path: appPath.teacher.addQuestion,
      },
    ],
  },
  {
    key: 'reasult',
    title: 'Data Hasil Ujian',
    path: appPath.teacher.questionResult,
  },
];
