import * as React from 'react';
import {ExpensionStep, ExpensionStepper} from '../ExpensionStepper';
import {Section} from './Section';
import {useSelector} from 'react-redux';
import {Id} from '../types/Id';
import {IAnswer} from '../types/Answer';
import {QuestionId, QuestionType} from '../types/Question';
import {IDoc} from '../types/Doc';
import {IForm} from '../types/Form';
import {defaultMessages, IMessages} from '../types/Messages';
import {useEffect} from "react";
import {useFormActions} from "../utils/hooks";
import {FormAnswerState} from "./form.reducer";

export interface FormProps {
  form: IForm;
  readonly?: boolean;
  dateFormat?: string;
  lang?: string;
  messages?: IMessages;
  maxUploadFileSize?: number;
  scrollOffset: number;
  onChange?: (a: IAnswer) => void;
  onSectionEnd?: (a: IAnswer[]) => void;
  onEnd?: (a: IAnswer[]) => void;
  onUploadFile?: (file: File, callback: (d: IDoc) => void) => void;
  onRemoveFile?: (id: string) => void;
}

const Form = (props: FormProps) =>  {

  const {form, messages = defaultMessages, scrollOffset, dateFormat, lang, maxUploadFileSize, readonly = false,
    onChange, onUploadFile, onRemoveFile, onSectionEnd, onEnd } = props

  const formActions = useFormActions()

  const formState: FormAnswerState = useSelector((state: any) => state.formAnswer)

  const {answers} = formState

  useEffect(() => {
    initReducerParams();
    initReducerAnswers();
  }, [])

  useEffect(() => {
    initReducerAnswers();
  }, [form])

  const initReducerParams = () => {
    formActions.init({
      dateFormat: dateFormat,
      lang: lang,
      messages: messages,
      maxUploadFileSize: maxUploadFileSize,
      triggerOnChange: handleChange,
      onUploadFile: onUploadFile,
      onRemoveFile: onRemoveFile,
      readonly: readonly,
      scrollOffset: scrollOffset
    })
  }

  const initReducerAnswers = () => {
    formActions.resetAnswers();
    form.sections.forEach(s => s.questions.forEach(q => {
      if (q.question_type === QuestionType.LABEL) return;
      formActions.updateAnswer(q.id, q.answers);
    }));
  }

  const handleChange = (questionIdAnswered: QuestionId) => {
    if (!onChange) return;
    setTimeout(() =>
      onChange(parseAnswer(questionIdAnswered, answers[questionIdAnswered]))
    );
  };

  const next = (sectionIndex: number) => {
    if (!onSectionEnd) return;
    onSectionEnd(parseAnswers(getSectionAnswers(sectionIndex)));
  };

  const end = () => {
    if (onSectionEnd)
      onSectionEnd(parseAnswers(getSectionAnswers(form.sections.length - 1)));
    if (onEnd)
      onEnd(parseAnswers(answers));
  };

  const getSectionAnswers = (sectionIndex: number): { [key: string]: string[] } => {
    const sectionQuestionIds = form.sections[sectionIndex].questions.map(q => q.id);
    return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
      obj[key] = answers[key];
      return obj;
    }, {});
  }

  const parseAnswers = (answers: { [key: string]: string[] }): IAnswer[] => {
    return Object.keys(answers).map((k: Id) => parseAnswer(k, answers[k])).filter((v: any) => v);
  };

  const parseAnswer = (id: Id, answer: string[]): IAnswer | null => {
    return answer ? {question_id: id, answer} : null
  };

  return (
    <ExpensionStepper free={readonly} onNext={next} onEnd={end}>
      {form.sections.map(s =>
        <ExpensionStep label={s.name} component={<Section section={s}/>} key={s.id} {...scrollOffset && {scrollOffset}}/>
      )}
    </ExpensionStepper>
  )

}

export default Form;
