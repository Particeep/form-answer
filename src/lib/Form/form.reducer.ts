import {IMessages} from "../types/Messages";
import {QuestionId} from "../types/Question";
import {IDoc} from "../types/Doc";
import {PossiblityId} from "../types/Possiblity";
import {createSlice, Slice} from "@reduxjs/toolkit";
import {InitParams} from "../types/Form";

export interface FormAnswerState {
    messages: IMessages;
    dateFormat: string;
    lang: string;
    maxUploadFileSize: number;
    readonly: boolean;
    scrollOffset: number;
    triggerOnChange?: (qId: QuestionId) => void;
    onUploadFile?: (f: File, callback: (uploadedFile: IDoc) => void) => void;
    onRemoveFile?: (id: string) => void;
    answers: { [key: string]: string[] };
    sectionsValidity: { [key: string]: {} };
    checkedPossibilityIds: { [key: string]: PossiblityId };
}

const initialState: FormAnswerState = {
    messages: {},
    dateFormat: 'dd/MM/yyyy',
    lang: 'en',
    maxUploadFileSize: null,
    readonly: false,
    scrollOffset: 60,
    triggerOnChange: null,
    onUploadFile: null,
    onRemoveFile: null,
    answers: {},
    sectionsValidity: {},
    checkedPossibilityIds: {},
}

const formAnswerSlice: Slice<any, any, "formAnswer"> = createSlice({
  name          : "formAnswer",
  initialState,
  reducers      : {},
  extraReducers : (builder: any) => {
    builder
      .addCase("formAnswer/INIT", (state: any, a: InitParams) => {
        return { ...state, ...a }
      })
      .addCase("formAnswer/RESET_ANSWERS", (state: any, a: any) => {
        return { ...state, answers: {} }
      })
      .addCase("formAnswer/UPDATE_ANSWER", (state: any, a: any) => {
        const answers: { [key: string]: string[] } = destructState(state).answers
        return {...state, answers: {...answers, [a.questionId] : a.answer}}
      })
      .addCase("formAnswer/REMOVE_ANSWER", (state: any, a: any) => {
       const answers: { [key: string]: string[] } = destructState(state).answers
        return {...state, answers: {...answers, [a.questionId] : ['']}}
      })
      .addCase("formAnswer/UPDATE_SECTION_VALIDITY", (state: any, a: any) => {
        const currentSectionsValidity: { [key: string]: {} } = destructState(state).sectionsValidity
        return {...state, sectionsValidity: computeSectionValidity(currentSectionsValidity, a)}
      })
      .addCase("formAnswer/ADD_CHECKED_POSSIBILITY", (state: any, a: any) => {
        const possibilityIdsChecked: { [key: string]: PossiblityId } = destructState(state).checkedPossibilityIds
        return {...state, possibilityIdsChecked: {...possibilityIdsChecked, [a.questionId] : a.possiblityId}}
      })
      .addCase("formAnswer/REMOVE_CHECKED_POSSIBILITY", (state: any, a: any) => {
        const possibilityIdsChecked: { [key: string]: PossiblityId } = state.checkedPossibilityIds
        return {...state, possibilityIdsChecked: {...possibilityIdsChecked, [a.questionId] : undefined}}
      })
  }
})

const computeSectionValidity = (current: { [key: string]: {} }, a: any) => {
  const sectionsValidity = {...current, [a.sectionId]: current[a.sectionId] || {}}
  return {
    ...sectionsValidity,
    [a.sectionId] : {...sectionsValidity[a.sectionId], [a.questionId] : a.isValid}
  }
}

const destructState = (state: any): FormAnswerState => {
  return JSON.parse(JSON.stringify(state))
}

export default formAnswerSlice.reducer
