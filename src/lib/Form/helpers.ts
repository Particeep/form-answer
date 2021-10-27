import {ISectionValidity} from "../types/Section";
import {IAnswers} from "../types/Answer";
import {ICheckedPossibilityIds} from "../types/Possiblity";

export const mergeSectionValidity = (sectionId, questionId, isValid) => (current: ISectionValidity) => {
  const sectionsValidity = {...current, [sectionId]: current[sectionId] || {}}
  return {
    ...sectionsValidity,
    [sectionId] : {...sectionsValidity[sectionId], [questionId] : isValid}
  }
}

export const mergeAnswers = (questionId: string, answers: string[]) => (current: IAnswers) => {
  return ({...current, [questionId]: answers})
}

export const mergeCheckedPossibilityIds = (questionId: string, possibilityId: string) => (current: ICheckedPossibilityIds) => {
  return ({...current, [questionId]: possibilityId})
}
