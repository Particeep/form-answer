import {QuestionId, QuestionType} from "../types/Question";
import {SectionId} from "../types/Section";
import {Messages} from "../types/Messages";
import {PossiblityId} from "../types/Possiblity";

interface InitParams {
    dateFormat: string;
    messages: Messages;
    maxUploadFileSize: number;
    triggerOnChange: (qId: QuestionId) => void;
    onUploadFile: (s: SectionId, q: QuestionId, f: File) => void;
    readonly: boolean;
}

export const formAction = {
    INIT: 'form/INIT',
    UPDATE_ANSWER: 'form/UPDATE_ANSWER',
    REMOVE_ANSWER: 'form/REMOVE_ANSWER',
    UPDATE_SECTION_VALIDITY: 'form/UPDATE_SECTION_VALIDITY',
    DOCUMENT_UPLOADING: 'form/DOCUMENT_UPLOADING',
    ADD_CHECKED_POSSIBILITY: 'form/ADD_CHECKED_POSSIBILITY',
    REMOVE_CHECKED_POSSIBILITY: 'form/REMOVE_CHECKED_POSSIBILITY',

    init: (params: InitParams) => dispatch => {
        dispatch({
            type: formAction.INIT,
            ...params
        });
    },

    updateAnswer: (questionId: QuestionId, questionType: QuestionType, answer: any) => dispatch => {
        dispatch({
            type: formAction.UPDATE_ANSWER,
            questionId, questionType, answer,
        });
    },

    removeAnswer: (questionId: QuestionId) => dispatch => {
        dispatch({
            type: formAction.REMOVE_ANSWER,
            questionId
        });
    },

    updateSectionValidity: (sectionId: SectionId, questionId: QuestionId, isValid: boolean) => dispatch => {
        dispatch({
            type: formAction.UPDATE_SECTION_VALIDITY,
            sectionId, questionId, isValid
        });
    },

    documentUploading: (questionId: QuestionId, isUploading: boolean) => dispatch => {
        dispatch({
            type: formAction.DOCUMENT_UPLOADING,
            questionId, isUploading
        });
    },

    addCheckedPossbility: (questionId: QuestionId, possiblityId: PossiblityId) => dispatch => {
        dispatch({
            type: formAction.ADD_CHECKED_POSSIBILITY,
            questionId, possiblityId
        });
    },

    removeCheckedPossbility: (questionId: QuestionId,) => dispatch => {
        dispatch({
            type: formAction.REMOVE_CHECKED_POSSIBILITY,
            questionId
        });
    }
};