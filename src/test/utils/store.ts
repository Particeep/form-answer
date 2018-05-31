import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {formReducer} from '../../lib/Form/form.reducer';

export const testStore = createStore(
    combineReducers({
        formAnswer: formReducer,
    }),
    compose(
        applyMiddleware(thunk)
    )
);