import * as actionTypes from '../actions';

const initialState = {
  draft: {
    formTitle: "My new form",
    order: [],
    fields: {}
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SAVE_FORM_DRAFT:
      return {
        draft: {
          ...action.payload
        }
      };

    case actionTypes.CLEAR_FORM_DRAFT:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
