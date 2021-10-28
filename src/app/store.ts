import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {formReducer} from '../lib/Form/index';
import {appReducer} from './app.reducer';

export const store = createStore(
  combineReducers({
    formAnswer: formReducer,
    app: appReducer,
  }),
  compose(
    applyMiddleware(thunk)
    // Redux DevToops Chrome plugins
    // , (<any> window).__REDUX_DEVTOOLS_EXTENSION__ && (<any> window).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
