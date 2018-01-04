import update from 'immutability-helper';
import formAction from "./formAction";

const DEFAULT_REDUCER = {
    answers: {},
};

export const formReducer = function (state = DEFAULT_REDUCER, action) {
    switch (action.type) {
        case formAction.UPDATE_ANSWER:
            return update(state, {
                answers: {
                    $merge: {[action.questionId]: action.answer}
                }
            });
        default:
            return state
    }
};