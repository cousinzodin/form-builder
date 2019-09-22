import * as actionTypes from './actionTypes';

export const showModal = (payload) => {
  return {
    type: actionTypes.SHOW_MODAL,
    payload
  };
};

export const closeModal = (id) => {
  return {
    type: actionTypes.CLOSE_MODAL,
    id
  };
};
