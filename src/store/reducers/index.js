import {combineReducers} from 'redux';
import draftReducer from "./draft";
import fillsReducer from "./fills";
import formsReducer from './forms';
import formReducer from './form';
import modalsReducer from './modals';

const reducer = combineReducers({fills: fillsReducer, forms: formsReducer, form: formReducer, modals: modalsReducer, draft: draftReducer});
export default reducer;
