import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addFormDetails = (payload) => {
  return {
    type: actionTypes.ADD_FORM_DETAILS,
    payload
  };
};

export const addFormList = (payload) => {
  return {
    type: actionTypes.ADD_FORM_LIST,
    payload
  };
};

export const clearFormList = () => {
  return {
    type: actionTypes.CLEAR_FORM_LIST,
  };
};

export const fetchFormList = () => {
  return dispatch => {
    axios.get("forms/list")
      .then(response => {
        dispatch(addFormList(response.data))
      })
      .catch(error => {});
  };
};

