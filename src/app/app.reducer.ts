import update from 'immutability-helper';
import {appAction} from './app.action';
import {IForm} from '../lib/types/Form';

export type State = {
    form: IForm;
};

const initialState: State = {
    form: null,
};

export const appReducer = function (state = initialState, a) {
    switch (a.type) {
        case appAction.SET:
            return update(state, {
                form: {$set: a.form},
            });
        default:
            return state
    }
};