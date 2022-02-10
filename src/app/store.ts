import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './app.reducer';

export const store = createStore(
  combineReducers({
    app: appReducer,
  }),
  compose(
    applyMiddleware(thunk)
    // Redux DevToops Chrome plugins
    // , (<any> window).__REDUX_DEVTOOLS_EXTENSION__ && (<any> window).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
