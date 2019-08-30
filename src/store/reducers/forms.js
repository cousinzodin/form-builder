import * as actionTypes from '../actions';

const initialState = {
  formsList: null,
  formsDict: {},
  formDraft: {
    name: "My new form",
    fields: [],
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_FORM_LIST:
      const dict = action.list.reduce((obj, item) => {
        const newObj = {...obj};
        newObj[item.id] = item;
        return newObj;
      }, {});
      return {
        ...state,
        formsList: state.formsList ? [...state.formsList, ...action.list] : [...action.list],
        formsDict: {...state.formsDict, ...dict},
      };

    case actionTypes.CLEAR_FORM_LIST:
      return {...initialState};

    case actionTypes.ADD_FORM:
      const dictItem = {};
      dictItem[action.payload.id] = action.payload;
      return {
        ...state,
        formsDict: {...state.formsDict, ...dictItem},
      }

    default:
      return state;
  }
}

export default reducer;
