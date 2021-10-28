import {InitParams} from "../types/Form";
import {QuestionId} from "../types/Question";
import {SectionId} from "../types/Section";
import {PossiblityId} from "../types/Possiblity";

const formAnswerAction = {
    init                     : (params: InitParams): any => ({ type: "formAnswer/INIT", ...params }),
    resetAnswers             : (): any => ({ type: "formAnswer/RESET_ANSWERS" }),
    updateAnswer             : (questionId: QuestionId, answer: string[]): any => ({ type: "formAnswer/UPDATE_ANSWER", questionId, answer }),
    removeAnswer             : (questionId: QuestionId): any => ({ type: "formAnswer/REMOVE_ANSWER", questionId }),
    updateSectionValidity    : (sectionId: SectionId, questionId: QuestionId, isValid: boolean): any => ({ type: "formAnswer/UPDATE_SECTION_VALIDITY", sectionId, questionId, isValid }),
    addCheckedPossibility    : (questionId: QuestionId, possibilityId: PossiblityId): any => ({ type: "formAnswer/ADD_CHECKED_POSSIBILITY", questionId, possibilityId }),
    removeCheckedPossibility : (questionId: QuestionId): any => ({ type: "formAnswer/REMOVE_CHECKED_POSSIBILITY", questionId }),
}

export default formAnswerAction
