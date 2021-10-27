import * as React from 'react';
import {ExpensionStep, ExpensionStepper} from '../ExpensionStepper';
import {Section} from './Section';
import {Id} from '../types/Id';
import {IAnswer} from '../types/Answer';
import {QuestionId, QuestionType} from '../types/Question';
import {defaultMessages} from '../types/Messages';
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {answersSelector, formSelector} from "./form.selectors";
import {FormProps} from "./FormProps";
import {mergeAnswers} from "./helpers";

const FormDisplay = (props: FormProps) =>  {

  const {form, messages = defaultMessages, scrollOffset, dateFormat, lang, maxUploadFileSize, readonly = false,
    onChange, onUploadFile, onRemoveFile, onSectionEnd, onEnd } = props

  const [formState, setFormAState] = useRecoilState(formSelector)
  const [answers, setAnswers] = useRecoilState(answersSelector)

  useEffect(() => {
    initReducerParams();
    initReducerAnswers();
  }, [])

  useEffect(() => {
    initReducerAnswers();
  }, [form])

  const initReducerParams = () => {
    setFormAState({
      dateFormat: dateFormat,
      lang: lang,
      messages: messages || defaultMessages,
      maxUploadFileSize: maxUploadFileSize,
      triggerOnChange: handleChange,
      onUploadFile: onUploadFile,
      onRemoveFile: onRemoveFile,
      readonly: readonly,
      scrollOffset: scrollOffset
    })
  }

  const initReducerAnswers = () => {
    form.sections.forEach(s => s.questions.forEach(q => {
      if (q.question_type === QuestionType.LABEL) return;
      setAnswers(mergeAnswers(q.id, q.answers))
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

  if(Object.keys(formState).length === 0) {
    return <></>
  }

  return (
    <ExpensionStepper free={readonly} onNext={next} onEnd={end}>
      {form.sections.map(s =>
        <ExpensionStep label={s.name} component={<Section section={s}/>} key={s.id} {...scrollOffset && {scrollOffset}}/>
      )}
    </ExpensionStepper>
  )

}

export default FormDisplay;
