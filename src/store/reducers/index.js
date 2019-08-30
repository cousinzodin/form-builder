import {combineReducers} from 'redux';
import draftReducer from "./draft";
import fillsReducer from "./fills";
import formsReducer from './forms';
import modalsReducer from './modals';

const reducer = combineReducers({fills: fillsReducer, forms: formsReducer, modals: modalsReducer, draft: draftReducer});
export default reducer;
