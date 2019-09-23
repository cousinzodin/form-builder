import * as actionTypes from '../actions/actionTypes';
import * as v from "../../validation";
import {createSelector} from 'reselect';
import {generateUUID} from '../../utils';

const initialState = {
  id: null,
  name: "",
  fields: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_FORM:
      return {
        id: action.payload.id,
        name: action.payload.name,
        fields: action.payload.fields,
      }

    case actionTypes.CLEAR_FORM:
      return initialState

    default:
      return state;
  }
}

export default reducer;

// Selectors

const selectFields = state => state.form.fields;
const selectName = state => state.form.name;

export const selectValidations = createSelector([selectFields], fields => {
  const rules = {};
  if (fields) {
    fields.forEach(field => {
      if (field.type === "text" || field.type === "number") {
        rules[field.name] = v.isFilled;
      }
    });
  }
  return rules;
});

export const selectDefaultData = createSelector([selectFields], fields => {
  const data = {};
  if (fields) {
    fields.forEach(field => {
      switch (field.type) {
        case 'dropdown':
          data[field.name] = field.items[field.default].value;
          break;
        case 'checkmark':
          data[field.name] = false;
          break;
        default:
          data[field.name] = "";
      }
    });
  }
  console.log(data);
  return data;
});


export const selectDataForEditing = createSelector([selectFields, selectName], (fields, name) => {
  const f = {};
  const order = [];
  const names = [];
  fields.forEach((field, index) => {
    const id = generateUUID();
    f[id] = field;
    order[index] = id;
    names[index] = field.name;
  });
  return {formTitle: name, fields, order, names};
});
