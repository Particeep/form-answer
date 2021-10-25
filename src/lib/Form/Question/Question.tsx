import './Question.scss';

import * as React from 'react';
import {useSelector} from 'react-redux';
import QuestionText from './Text/QuestionText';
import {IQuestion, isDependable, QuestionType} from '../../types/Question';
import {IPossibility} from '../../types/Possiblity';
import QuestionRadio from './Radio/QuestionRadio';
import QuestionAutocomplete from './Autocomplete/QuestionAutocomplete';
import QuestionSelect from './Select/QuestionSelect';
import QuestionDate from './Date/QuestionDate';
import QuestionCheckbox from './Checkbox/QuestionCheckbox';
import QuestionDocument from './Document/QuestionDocument';
import QuestionLongText from './LongText/QuestionLongText';
import ReactHtmlParser from 'react-html-parser';
import {urlify} from "../../utils/common";
import {useEffect} from "react";
import {useFormActions} from "../../utils/hooks";
import {FormAnswerState} from "../form.reducer";

const maxPossibilitiesBeforeAutocomplete = 10;

export interface QuestionProps {
  question: IQuestion;
  answer: string[]
  isValid: boolean
}

const Question = ({question, answer, isValid}: QuestionProps) => {

  const formActions = useFormActions()

  const {removeAnswer, updateAnswer, updateSectionValidity, addCheckedPossibility, removeCheckedPossibility} = formActions

  const formState: FormAnswerState = useSelector((state: any) => state.formAnswer)
  const {lang = 'en', dateFormat = '', messages, readonly, triggerOnChange} = formState

  const renderQuestion = (question: IQuestion) => {

    const questionProps = {
      lang,
      question,
      messages,
      readonly,
      answer,
      isValid,
      onChange: update,
    };
    switch (question.question_type) {
      case QuestionType.TEXT:
        return <QuestionText {...questionProps}/>;

      case QuestionType.LONGTEXT:
        return <QuestionLongText {...questionProps}/>;

      case QuestionType.RADIO:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionRadio {...questionProps}/>;
        return <QuestionAutocomplete {...questionProps}/>;
      //
      case QuestionType.SELECT:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionSelect {...questionProps}/>;
        return <QuestionAutocomplete {...questionProps}/>;

      case QuestionType.CHECKBOX:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionCheckbox {...questionProps}/>;
        return <QuestionAutocomplete multiSelect {...questionProps}/>;

      case QuestionType.DATE:
        if (dateFormat)
          return <QuestionDate {...questionProps} dateFormat={dateFormat}/>;
        return <QuestionText {...questionProps}/>;

      case QuestionType.DOCUMENT:
        return <QuestionDocument {...questionProps}/>;

      case QuestionType.LABEL:
        return '';

      default:
        return <QuestionText {...questionProps}/>;
    }
  }

  useEffect(() => {
    return () => {
      updateSectionValidity(question.section_id, question.id, true);
      removeAnswer(question.id);
      if (isDependable(question)) {
        removeCheckedPossibility(question.id);
      }
    }
  }, [])

  const update = (value: string[], isValid: boolean) => {
    updateSectionValidity(question.section_id, question.id, isValid);
    handlePossibilityDependencyCaching(value);
    if (checkValueChange(value)) {
      updateAnswer(question.id, value);
      if (isValid && triggerOnChange) triggerOnChange(question.id);
    }
  };

  const checkValueChange = (value: string[] | undefined): boolean => {
    if (answer && value)
      return !(value.length === answer.length && value.every((v, i) => v === answer[i]));
    return true;
  }

  const handlePossibilityDependencyCaching = (value?: string[]) => {
    if (!isDependable(question)) return;
    if (value && value[0]) {
      const possibility = question.possibilities.find((p: IPossibility) => p.label === value[0]);
      if (!possibility) return;
      removeCheckedPossibility(question.id);
      addCheckedPossibility(question.id, possibility.id);
    } else {
      removeCheckedPossibility(question.id);
    }
  }

  return (
    <main className={`Question Question-${question.id} Question-${question.question_type}`}>
      <div className="Question_label">
        {ReactHtmlParser(urlify(question.label))}
        {question.required && <span className="Question_required">*</span>}
      </div>
      <div className="Question_description">
        {ReactHtmlParser(urlify(question.description))}
      </div>
      <div className="Question_answer">{renderQuestion(question)}</div>
    </main>
  );
}

export default Question
