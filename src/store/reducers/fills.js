import * as actionTypes from '../actions';

const initialState = {
  fillsList: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FILL_LIST:
      return {
        ...state,
        fillsList: state.fillsList ? [...state.fillsList, ...action.list] : [...action.list],
      };
    case actionTypes.CLEAR_FILL_LIST:
      return {
        ...state,
        fillsList: null
      };
    default:
      return state;
  }
}

export default reducer;
