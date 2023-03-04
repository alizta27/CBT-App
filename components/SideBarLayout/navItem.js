import appPath from '@/constant/appPath';

const admin = [
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
    key: 'library',
    title: 'Data Perpustakaan',
    path: appPath.admin.library,
  },
];

export default admin;
