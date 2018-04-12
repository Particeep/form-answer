import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {formReducer} from "../Form/index";

export const store = createStore(
    combineReducers({
        formAnswer: formReducer
    }),
    compose(
        applyMiddleware(thunk)
        // Redux DevToops Chrome plugins

        , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);