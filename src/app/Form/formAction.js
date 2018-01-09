const formAction = {
    INIT: 'form/INIT',
    UPDATE_ANSWER: 'form/UPDATE_ANSWER',
    UPDATE_SECTION_VALIDITY: 'form/UPDATE_SECTION_VALIDITY',
    DOCUMENT_UPLOADING: 'form/DOCUMENT_UPLOADING',

    init: (params) => dispatch => {
        dispatch({
            type: formAction.INIT,
            ...params
        });
    },

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
    },

    documentUploading: (questionId, isUploading) => dispatch => {
        dispatch({
            type: formAction.DOCUMENT_UPLOADING,
            questionId, isUploading
        });
    }
};

export default formAction;