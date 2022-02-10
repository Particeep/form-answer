import {InitParams} from "../types/Form";
import {QuestionId} from "../types/Question";
import {SectionId} from "../types/Section";
import {PossiblityId} from "../types/Possiblity";

const formAnswerAction = {
    INIT                       : 'form/INIT',
    RESET_ANSWERS              : 'form/RESET_ANSWERS',
    UPDATE_ANSWER              : 'form/UPDATE_ANSWER',
    REMOVE_ANSWER              : 'form/REMOVE_ANSWER',
    UPDATE_SECTION_VALIDITY    : 'form/UPDATE_SECTION_VALIDITY',
    ADD_CHECKED_POSSIBILITY    : 'form/ADD_CHECKED_POSSIBILITY',
    REMOVE_CHECKED_POSSIBILITY : 'form/REMOVE_CHECKED_POSSIBILITY',
    init                       : (params: InitParams): any => ({ type: formAnswerAction.INIT, ...params }),
    resetAnswers               : (): any => ({ type: formAnswerAction.RESET_ANSWERS }),
    updateAnswer               : (questionId: QuestionId, answer: string[]): any => ({ type: formAnswerAction.UPDATE_ANSWER, questionId, answer }),
    removeAnswer               : (questionId: QuestionId): any => ({ type: formAnswerAction.REMOVE_ANSWER, questionId }),
    updateSectionValidity      : (sectionId: SectionId, questionId: QuestionId, isValid: boolean): any => ({ type: formAnswerAction.UPDATE_SECTION_VALIDITY, sectionId, questionId, isValid }),
    addCheckedPossibility      : (questionId: QuestionId, possibilityId: PossiblityId): any => ({ type: formAnswerAction.ADD_CHECKED_POSSIBILITY, questionId, possibilityId }),
    removeCheckedPossibility   : (questionId: QuestionId): any => ({ type: formAnswerAction.REMOVE_CHECKED_POSSIBILITY, questionId }),
}

export default formAnswerAction
