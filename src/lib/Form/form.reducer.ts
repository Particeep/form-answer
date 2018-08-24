import update from 'immutability-helper';
import {formAction} from './form.action';
import {PossiblityId} from '../types/Possiblity';
import {IMessages} from '../types/Messages';

export type State = {
  messages: IMessages,
  dateFormat: string,
  maxUploadFileSize: number,
  readonly: boolean,

  // Callbacks
  triggerOnChange: any,
  onUploadFile: any,

  // Application variables
  answers: { [key: string]: string[] },
  sectionsValidity: { [key: string]: boolean },
  checkedPossibilityIds: { [key: string]: PossiblityId },
};

const initialState: State = {
  messages: {},
  dateFormat: 'dd/MM/yyyy',
  maxUploadFileSize: null,
  readonly: false,

  // Callbacks
  triggerOnChange: null,
  onUploadFile: null,

  // Application variables
  answers: {},
  sectionsValidity: {},
  checkedPossibilityIds: {},
};

export const formReducer = function (state = initialState, a) {
  switch (a.type) {
    case formAction.INIT:
      return update(state, {
        messages: {$set: a.messages},
        dateFormat: {$set: a.dateFormat},
        maxUploadFileSize: {$set: a.maxUploadFileSize},
        triggerOnChange: {$set: a.triggerOnChange},
        onUploadFile: {$set: a.onUploadFile},
        readonly: {$set: a.readonly},
      });
    case formAction.RESET_ANSWERS:
      return update(state, {
        answers: {$set: {}}
      });
    case formAction.UPDATE_ANSWER:
      return update(state, {
        answers: {
          $merge: {[a.questionId]: a.answer}
        }
      });
    case formAction.REMOVE_ANSWER:
      return update(state, {
        answers: {[a.questionId]: {value: {$set: ''}}}
      });
    case formAction.UPDATE_SECTION_VALIDITY:
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
    case formAction.ADD_CHECKED_POSSIBILITY:
      return update(state, {
        checkedPossibilityIds: {
          [a.questionId]: {$set: a.possiblityId}
        }
      });
    case formAction.REMOVE_CHECKED_POSSIBILITY:
      return update(state, {
        checkedPossibilityIds: {$unset: [a.questionId]}
      });
    default:
      return state
  }
};
