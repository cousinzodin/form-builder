import {combineReducers} from 'redux';
import draftReducer from "./draft";
import fillsReducer from "./fills";
import formsReducer from './forms';

const reducer = combineReducers({fills: fillsReducer, forms: formsReducer, draft: draftReducer});
export default reducer;
