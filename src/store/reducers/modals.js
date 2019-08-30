import * as actionTypes from '../actions';

const initialState = {
  modals: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
        return {
          modals: [...state.modals, {...action.payload, id: state.modals.length}],
        };
      case actionTypes.CLOSE_MODAL:
        return {
          modals: state.modals.filter(item => item.id !== action.payload),
        };

    default:
      return state;
  }
}

export default reducer;
