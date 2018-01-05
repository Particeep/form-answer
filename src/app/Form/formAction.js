const formAction = {
    UPDATE_ANSWER: 'form/UPDATE_ANSWER',
    UPDATE_SECTION_VALIDITY: 'form/UPDATE_SECTION_VALIDITY',

    updateAnswer: (questionId, answer) => dispatch => {
        dispatch({
            type: formAction.UPDATE_ANSWER,
            questionId, answer,
        });
    },

    updateSectionValidity: (sectionId, questionId, isValid) => dispatch => {
        dispatch({
            type: formAction.UPDATE_SECTION_VALIDITY,
            sectionId, questionId, isValid
        });
    }
};

export default formAction;