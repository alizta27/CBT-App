import api from '@/api';
import actionTypes from '@/constant/actionTypes';

export const getStudentProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.student.getStudentProfile();

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

export const studentGetAllQuestion = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.student.getAllQuestion(id);

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

export const getOneQuestion = ({ question_id }) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.IS_LOADING,
      payload: true,
    });
    try {
      const { data, status } = await api.student.getOneQuestion(question_id);

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
