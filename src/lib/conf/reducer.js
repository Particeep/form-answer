import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {formReducer} from "../Form";

export const store = createStore(
    combineReducers({
        formAnswer: formReducer
    }),
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk,
        createLogger({
            collapsed: true,
            diff: true,
            diffPredicate: true,
        })
    )
);