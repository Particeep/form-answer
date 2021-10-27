import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

export const testStore = createStore(
  combineReducers({
  }),
  compose(
    applyMiddleware(thunk)
  )
);
