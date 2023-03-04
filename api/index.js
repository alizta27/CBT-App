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
    login: (payload) => postRequest(apiPath.login, payload),
    getAuth: (payload) => postRequest(apiPath.getAuth, payload),
  },
  admin: {
    addClass: (payload) => http.post(apiPath.admin.addClass, payload),
    bulkAddClass: (payload) => http.post(apiPath.admin.bulkAddClass, payload),
  },
};
