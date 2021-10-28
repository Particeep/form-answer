import update from 'immutability-helper';
import formAnswerAction from './form.action';
import {PossiblityId} from '../types/Possiblity';
import {IMessages} from '../types/Messages';

export type State = {
  messages: IMessages,
  dateFormat: string,
  lang: string;
  maxUploadFileSize: number,
  readonly: boolean,

  // Callbacks
  triggerOnChange: any,
  onUploadFile: any,
  onRemoveFile: any,

  // Application variables
  answers: { [key: string]: string[] },
  sectionsValidity: { [key: string]: boolean },
  checkedPossibilityIds: { [key: string]: PossiblityId },
};

export const initialState: State = {
  messages: {},
  dateFormat: 'dd/MM/yyyy',
  lang: 'en',
  maxUploadFileSize: null,
  readonly: false,

  // Callbacks
  triggerOnChange: null,
  onUploadFile: null,
  onRemoveFile: null,

  // Application variables
  answers: {},
  sectionsValidity: {},
  checkedPossibilityIds: {},
};

export const formReducer = function (state, a) {
  switch (a.type) {
    case formAnswerAction.INIT:
      return update(state, {
        messages: {$set: a.messages},
        lang: {$set: a.lang},
        dateFormat: {$set: a.dateFormat},
        maxUploadFileSize: {$set: a.maxUploadFileSize},
        triggerOnChange: {$set: a.triggerOnChange},
        onUploadFile: {$set: a.onUploadFile},
        onRemoveFile:{$set: a.onRemoveFile},
        readonly: {$set: a.readonly},
      });
    case formAnswerAction.RESET_ANSWERS:
      return update(state, {
        answers: {$set: {}}
      });
    case formAnswerAction.UPDATE_ANSWER:
      return update(state, {
        answers: {
          $merge: {[a.questionId]: a.answer}
        }
      });
    case formAnswerAction.REMOVE_ANSWER:
      return update(state, {
        answers: {
          $merge: {[a.questionId]: ''}
        }
      });
    case formAnswerAction.UPDATE_SECTION_VALIDITY:
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
    case formAnswerAction.ADD_CHECKED_POSSIBILITY:
      return update(state, {
        checkedPossibilityIds: {
          [a.questionId]: {$set: a.possiblityId}
        }
      });
    case formAnswerAction.REMOVE_CHECKED_POSSIBILITY:
      return update(state, {
        checkedPossibilityIds: {$unset: [a.questionId]}
      });
    default:
      return state
  }
};
