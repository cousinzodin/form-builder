import * as actionTypes from '../actions';

const initialState = {
  draft: {
    name: "My new form",
    fields: [],
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SAVE_FORM_DRAFT:
      return {
        draft: {
          name: action.payload.name,
          fields: action.payload.fields
        }
      };

    case actionTypes.CLEAR_FORM_DRAFT:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
