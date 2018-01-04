const formAction = {
    UPDATE_ANSWER: 'form/UPDATE_ANSWER',

    updateAnswer: (questionId, answer) => dispatch => {
        dispatch({
            type: formAction.UPDATE_ANSWER,
            questionId: questionId,
            answer: answer,
        });
    }
};

export default formAction;