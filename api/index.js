import apiPath from '@/constant/apiPath';
import axios from 'axios';
import http from './http';

const base = '/api';

const getRequest = async (path, params) => {
  try {
    return await axios.get(path, params);
  } catch (err) {
    return err;
  }
};

const postRequest = async (path, payload) => {
  try {
    const res = await axios.post(path, payload);
    return res;
  } catch (err) {
    return err;
  }
};

const putRequest = async (path, payload) => {
  try {
    const res = await axios.put(path, payload);
    return res;
  } catch (err) {
    return err;
  }
};

const patchRequest = async (path, payload) => {
  try {
    return await axios.patch(path, payload);
  } catch (err) {
    return err;
  }
};

const deleteRequest = async (path) => {
  try {
    return await axios.delete(path);
  } catch (err) {
    return err;
  }
};

export default {
  auth: {
    login: (payload) => postRequest(base + apiPath.login, payload),
    getAuth: () => http.post(apiPath.getAuth),
  },
  admin: {
    // * ========= Class ============
    addClass: (payload) => http.post(apiPath.admin.addClass, payload),
    bulkAddClass: (payload) => http.post(apiPath.admin.bulkAddClass, payload),
    getAllClass: () => http.get(apiPath.admin.allClass),
    editClass: (id, payload) =>
      http.post(apiPath.admin.editClass + '/' + id, payload),
    deleteClass: (id) => http.delete(apiPath.admin.deleteClass + '/' + id),

    // * ========= student ============
    addStudent: (payload) => http.post(apiPath.admin.addStudent, payload),
    bulkAddStudent: (payload) =>
      http.post(apiPath.admin.bulkAddStudent, payload),
    getAllStudent: () => http.get(apiPath.admin.allStudent),
    editStudent: (id, payload) =>
      http.post(apiPath.admin.editStudent + '/' + id, payload),
    deleteStudent: (id) => http.delete(apiPath.admin.deleteStudent + '/' + id),

    // * ========= teacher ============
    addTeacher: (payload) => http.post(apiPath.admin.addTeacher, payload),
    bulkAddTeacher: (payload) =>
      http.post(apiPath.admin.bulkAddTeacher, payload),
    getAllTeacher: () => http.get(apiPath.admin.allTeacher),
    editTeacher: (id, payload) =>
      http.post(apiPath.admin.editTeacher + '/' + id, payload),
    deleteTeacher: (id) => http.delete(apiPath.admin.deleteTeacher + '/' + id),
  },
};
