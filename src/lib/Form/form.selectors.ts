import {selector} from "recoil";
import {answersAtom, checkedPossibilityIdsAtom, formAtom, sectionsValidityAtom} from "./form.atoms";
import {InitParams} from "../types/Form";
import {IAnswers} from "../types/Answer";
import {ISectionValidity} from "../types/Section";
import {ICheckedPossibilityIds} from "../types/Possiblity";

const formSelector = selector<InitParams>({
  key: "FormSelector",
  get: ({get}) => get(formAtom),
  set: ({set}, initParams) => set(formAtom, initParams)
})

const answersSelector = selector<IAnswers>({
  key: "AnswersSelector",
  get: ({get}) => get(answersAtom),
  set: ({set}, answers) => set(answersAtom, answers)
})

const sectionsValiditySelector = selector<ISectionValidity>({
  key: "SectionsValiditySelector",
  get: ({get}) => get(sectionsValidityAtom),
  set: ({set}, sectionsValidity) => set(sectionsValidityAtom, sectionsValidity)
})

const checkedPossibilityIdsSelector = selector<ICheckedPossibilityIds>({
  key: "CheckedPossibilityIdsSelector",
  get: ({get}) => get(checkedPossibilityIdsAtom),
  set: ({set}, checkedPossibilityIds) => set(checkedPossibilityIdsAtom, checkedPossibilityIds)
})

export {formSelector, answersSelector, sectionsValiditySelector, checkedPossibilityIdsSelector}
