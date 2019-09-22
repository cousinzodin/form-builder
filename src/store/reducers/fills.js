import * as actionTypes from '../actions/actionTypes';
import {createSelector} from 'reselect';
import {selectForms} from './forms';

const initialState = {
  fillsList: null,
  id: null,
  isAllLoaded: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FILL_LIST:
      return {
        id: action.id,
        fillsList: state.fillsList ? [...state.fillsList, ...action.payload] : [...action.payload],
      };
    case actionTypes.CLEAR_FILL_LIST:
      return initialState;

    case actionTypes.SET_ALL_FILLS_LOADED:
      return {
        ...state,
        isAllLoaded: true,
      }
    default:
      return state;
  }
}

const selectId = state => state.fills.id;

export const selectName = createSelector([selectId, selectForms], (id, forms) => {
  return (forms && forms[id]) ? forms[id].name : "";
});

export default reducer;
