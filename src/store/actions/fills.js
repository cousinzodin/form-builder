import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const clearFillList = () => {
  return {
    type: actionTypes.CLEAR_FILL_LIST,
  };
};

export const addFillList = (id, payload) => {
  return {
    type: actionTypes.ADD_FILL_LIST,
    payload,
    id
  };
};

export const setAllFillsLoaded = () => {
  return {
    type: actionTypes.SET_ALL_FILLS_LOADED,
  };
};

export const fetchFillList = (id, take, maxPerTake) => {
  return dispatch => {
    axios.get(`fills/${id}?offset=${maxPerTake * take}&count=${maxPerTake}`)
      .then(response => {
        dispatch(addFillList(id, response.data));
        if (response.data.length < maxPerTake) {
          dispatch(setAllFillsLoaded());
        };
      })
      .catch(error => {});
  };
};



