import * as actionTypes from '../actions/actionTypes';
import {generateUUID} from '../../utils';

const initialState = {

  new: {
    formTitle: "My new form",
    order: [],
    names: [],
    fields: {},
  }

}

const reducer = (state = initialState, action) => {
  let drafts;
  switch (action.type) {

    case actionTypes.CREATE_FORM_DRAFT:
      drafts = state;

      const fields = {};
      const order = [];
      const names = [];
      if (action.payload.fields) {
        action.payload.fields.forEach((field, index) => {
          const id = generateUUID();
          fields[id] = field;
          order[index] = id;
          names[index] = field.name;
        });
      }

      drafts[action.payload.id] = {formTitle: action.payload.name, fields, order, names}
      return {
        ...state,
        ...drafts,
      };

    case actionTypes.SAVE_FORM_DRAFT:
      drafts = state;
      drafts[action.id] = action.payload;
      return {
        ...state,
        ...drafts,
      };

    case actionTypes.CLEAR_FORM_DRAFT:
      drafts = state;
      delete drafts[action.id];
      return {
        ...state,
        ...drafts,
      };

    default:
      return state;
  }
}

export default reducer;
