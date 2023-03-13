import api from '@/api';
import actionTypes from '@/constant/actionTypes';

export const addQuestion = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.teacher.addQuestion(payload);

      if (status === 200) {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: null,
        });
        return { data };
      } else {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: data,
        });
        return { error: data };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.IS_ERROR,
        payload: error.message,
      });
      return { error: error.message };
    } finally {
      dispatch({
        type: actionTypes.IS_LOADING,
        payload: false,
      });
    }
  };
};

export const bulkAddQuestion = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.teacher.bulkAddQuestion(payload);

      if (status === 200) {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: null,
        });
        return { data };
      } else {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: data,
        });
        return { error: data };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.IS_ERROR,
        payload: error.message,
      });
      return { error: error.message };
    } finally {
      dispatch({
        type: actionTypes.IS_LOADING,
        payload: false,
      });
    }
  };
};

export const getAllQuestion = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.teacher.getAllQuestion();

      if (status === 200) {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: null,
        });
        return { data };
      } else {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: data,
        });
        return { error: data };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.IS_ERROR,
        payload: error.message,
      });
      return { error: error.message };
    } finally {
      dispatch({
        type: actionTypes.IS_LOADING,
        payload: false,
      });
    }
  };
};

export const editClass = (id, payload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.admin.editClass(id, payload);

      if (status === 200) {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: null,
        });
        return { data };
      } else {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: data,
        });
        return { error: data };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.IS_ERROR,
        payload: error.message,
      });
      return { error: error.message };
    } finally {
      dispatch({
        type: actionTypes.IS_LOADING,
        payload: false,
      });
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.admin.deleteClass(id);

      if (status === 200) {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: null,
        });
        return { data };
      } else {
        dispatch({
          type: actionTypes.IS_ERROR,
          payload: data,
        });
        return { error: data };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.IS_ERROR,
        payload: error.message,
      });
      return { error: error.message };
    } finally {
      dispatch({
        type: actionTypes.IS_LOADING,
        payload: false,
      });
    }
  };
};
