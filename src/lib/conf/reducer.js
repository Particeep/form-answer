import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {formReducer} from "../Form";

export const store = createStore(
    combineReducers({
        formAnswer: formReducer
    }),
    applyMiddleware(thunk)
    // Redux DevToops Chrome plugins
    // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);