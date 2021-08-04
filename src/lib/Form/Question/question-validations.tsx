import {IQuestion} from '../../types/Question';
import {IPossibility} from "../../types/Possiblity";

export type Validation = (q: IQuestion, value: string | string[]) => boolean;

export const isTextValid = (question: IQuestion, value: string): boolean => {
  if (question.required && (!value || value === '')) return false;
  return question.required === false && value === '' ? true : !question.pattern || new RegExp(question.pattern).test(value) ;
};

export const isRadioValid = (question: IQuestion, value: string): boolean => {
  return (!question.required || value !== '') && isAllowedAnswer(question, value);
}

export const isSelectValid = isRadioValid;

export const isCheckboxValid = (question: IQuestion, values: string[]): boolean => {
  return !question.required || values.length > 0;
};

const isAllowedAnswer = (question: IQuestion, value: string): boolean => {
  if (!value) return false
  const possibility = question.possibilities.find((p: IPossibility) => p.label === value)
  if (!question.valid_possibilities) return true
  return question.valid_possibilities.split(',').includes(possibility.id)
}
