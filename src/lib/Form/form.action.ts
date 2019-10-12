import {QuestionId} from '../types/Question';
import {SectionId} from '../types/Section';
import {IMessages} from '../types/Messages';
import {PossiblityId} from '../types/Possiblity';
import {IDoc} from '../types/Doc';

interface InitParams {
  dateFormat: string;
  lang: string;
  messages: IMessages;
  maxUploadFileSize: number;
  triggerOnChange: (qId: QuestionId) => void;
  onUploadFile: (f: File, callback: (uploadedFile: IDoc) => void) => void;
  onRemoveFile: (id: string) => void;
  readonly: boolean;
  scrollOffset: number;
  isLoading: boolean;
}

export const formAction = {
  RESET_ANSWERS: 'form/RESET_ANSWERS',
  INIT: 'form/INIT',
  UPDATE_ANSWER: 'form/UPDATE_ANSWER',
  REMOVE_ANSWER: 'form/REMOVE_ANSWER',
  UPDATE_SECTION_VALIDITY: 'form/UPDATE_SECTION_VALIDITY',
  ADD_CHECKED_POSSIBILITY: 'form/ADD_CHECKED_POSSIBILITY',
  REMOVE_CHECKED_POSSIBILITY: 'form/REMOVE_CHECKED_POSSIBILITY',

  init: (params: InitParams) => dispatch => {
    dispatch({
      type: formAction.INIT,
      ...params
    });
  },

  resetAnswers: () => dispatch => {
    dispatch({
      type: formAction.RESET_ANSWERS
    })
  },

  updateAnswer: (questionId: QuestionId, answer: string[]) => dispatch => {
    dispatch({
      type: formAction.UPDATE_ANSWER,
      questionId, answer,
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

  addCheckedPossibility: (questionId: QuestionId, possiblityId: PossiblityId) => dispatch => {
    dispatch({
      type: formAction.ADD_CHECKED_POSSIBILITY,
      questionId, possiblityId
    });
  },

  removeCheckedPossibility: (questionId: QuestionId,) => dispatch => {
    dispatch({
      type: formAction.REMOVE_CHECKED_POSSIBILITY,
      questionId
    });
  }
};

