import {createStore, applyMiddleware, compose} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configStore = (reducer, middleware) => {
  return createStore(reducer, composeEnhancers(
    applyMiddleware(middleware)
  ));
};
