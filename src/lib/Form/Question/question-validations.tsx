import {IQuestion} from '../../types/Question';

export type Validation = (q: IQuestion, value: string | string[]) => boolean;

export const isTextValid = (question: IQuestion, value: string): boolean => {
  if (question.required && (!value || value === '')) return false;
  return question.required === true ? !question.pattern || new RegExp(question.pattern).test(value) : true;
};

export const isRadioValid = (question: IQuestion, value: string): boolean => !question.required || value !== '';

export const isSelectValid = isRadioValid;

export const isCheckboxValid = (question: IQuestion, values: string[]): boolean => {
  return !question.required || values.length > 0;
};
