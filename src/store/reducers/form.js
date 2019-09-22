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
      data[field.name] = field.type === "dropdown" && field.items && field.items.length ? field.items[field.default].value : field.type === "checkmark" ? false : "";
    });
  }
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
