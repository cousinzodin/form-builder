import * as actionTypes from './actionTypes';

export const createFormDraft = (payload) => {
  return {
    type: actionTypes.CREATE_FORM_DRAFT,
    payload
  };
};

export const saveFormDraft = (id, payload) => {
  return {
    type: actionTypes.SAVE_FORM_DRAFT,
    id,
    payload
  };
};

export const clearFormDraft = (id) => {
  return {
    type: actionTypes.CLEAR_FORM_DRAFT,
    id
  };
};
