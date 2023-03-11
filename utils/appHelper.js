import appPath from '@/constant/appPath';

export const handleBarTitle = (value, callback) => {
  switch (value) {
    case appPath.admin.dashboard:
      if (callback) callback('Dashboard');
      break;
    case appPath.admin.classList:
      if (callback) callback('Daftar Kelas');
      break;
    case appPath.admin.addClass:
      if (callback) callback('Tambah Kelas');
      break;
    case appPath.admin.teacherList:
      if (callback) callback('Daftar Guru');
      break;
    case appPath.admin.addTeacher:
      if (callback) callback('Tambah Guru');
      break;
    case appPath.admin.studentList:
      if (callback) callback('Daftar Siswa');
      break;
    case appPath.admin.addStudent:
      if (callback) callback('Tambah Siswa');
      break;

    case appPath.teacher.addExam:
      if (callback) callback('Tambah Data Ujian');
      break;
    case appPath.teacher.examList:
      if (callback) callback('List Data Ujian');
      break;

    default:
      if (callback) callback('Dashboard');
      break;
  }
};
