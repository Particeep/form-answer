import update from 'immutability-helper';
import formAction from "./formAction";

const DEFAULT_REDUCER = {
    answers: {},
    sectionsValidity: {},
};

export const formReducer = function (state = DEFAULT_REDUCER, a) {
    switch (a.type) {
        case formAction.UPDATE_ANSWER:
            return update(state, {
                answers: {
                    $merge: {[a.questionId]: a.answer}
                }
            });
        case formAction.UPDATE_SECTION_VALIDITY:
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