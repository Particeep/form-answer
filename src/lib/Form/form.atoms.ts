import {atom} from "recoil";
import {InitParams} from "../types/Form";
import {IAnswers} from "../types/Answer";
import {ISectionValidity} from "../types/Section";

const formAtom = atom({
  key: "FormState",
  default: {} as InitParams
})

const answersAtom = atom({
  key: "AnswerState",
  default: {} as IAnswers
})

const sectionsValidityAtom = atom({
  key: "SectionsValidityState",
  default: {} as ISectionValidity
})

const checkedPossibilityIdsAtom = atom({
  key: "CheckedPossibilityIdsState",
  default: {}
})

export {formAtom, answersAtom, sectionsValidityAtom, checkedPossibilityIdsAtom}
