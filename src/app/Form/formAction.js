const formAction = {
    INIT: 'form/INIT',
    UPDATE_ANSWER: 'form/UPDATE_ANSWER',
    UPDATE_SECTION_VALIDITY: 'form/UPDATE_SECTION_VALIDITY',
    DOCUMENT_UPLOADING: 'form/DOCUMENT_UPLOADING',
    ADD_CHECKED_POSSIBILITY: 'form/ADD_CHECKED_POSSIBILITY',
    REMOVE_CHECKED_POSSIBILITY: 'form/REMOVE_CHECKED_POSSIBILITY',

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
    },

    addCheckedPossbility: (questionId, possiblityId) => dispatch => {
        dispatch({
            type: formAction.ADD_CHECKED_POSSIBILITY,
            questionId, possiblityId
        });
    },

    removeCheckedPossbility: (questionId,) => dispatch => {
        dispatch({
            type: formAction.REMOVE_CHECKED_POSSIBILITY,
            questionId
        });
    }
};

export default formAction;