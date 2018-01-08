import update from 'immutability-helper';
import formAction from "./formAction";

const DEFAULT_REDUCER = {
    answers: {},
    sectionsValidity: {},
    notifyChange: null,
};

export const formReducer = function (state = DEFAULT_REDUCER, a) {
    switch (a.type) {
        case formAction.BIND:
            return update(state, {
                notifyChange: {$set: a.notifyChange},
            });
        case formAction.UPDATE_ANSWER:
            return update(state, {
                answers: {
                    $merge: {[a.questionId]: a.answer}
                }
            });
        case formAction.UPDATE_SECTION_VALIDITY:
            // Cannot perform nested $merge, so do it in 2 steps
            let updatedState = state;
            if (!state.sectionsValidity[a.sectionId])
                updatedState = update(state, {
                    sectionsValidity: {
                        $merge: {[a.sectionId]: {}}
                    }
                });
            return update(updatedState, {
                sectionsValidity: {
                    [a.sectionId]: {$merge: {[a.questionId]: a.isValid}}
                }
            });
        default:
            return state
    }
};