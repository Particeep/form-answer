import './Question.scss';

import * as React from 'react';
import {connect} from 'react-redux';
import QuestionText from './Text/QuestionText';
import {IQuestion, isDependable, QuestionId, QuestionType} from '../../types/Question';
import {formAction} from '../form.action';
import {SectionId} from '../../types/Section';
import {IPossibility, PossiblityId} from '../../types/Possiblity';
import {IMessages} from '../../types/Messages';
import QuestionRadio from './Radio/QuestionRadio';
import QuestionAutocomplete from './Autocomplete/QuestionAutocomplete';
import QuestionSelect from './Select/QuestionSelect';
import QuestionDate from './Date/QuestionDate';
import QuestionCheckbox from './Checkbox/QuestionCheckbox';
import QuestionDocument from './Document/QuestionDocument';
import QuestionLongText from './LongText/QuestionLongText';

const maxPossibilitiesBeforeAutocomplete = 10;

interface QuestionProps {
  answer: string[];
  readonly: boolean;
  dateFormat: string;
  question: IQuestion;
  messages: IMessages;
  isValid: boolean;
  readonly triggerOnChange: (qId: QuestionId) => void,
  readonly removeAnswer: (qId: QuestionId) => void;
  readonly updateAnswer: (qId: QuestionId, value: any) => void;
  readonly updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => void;
  readonly addCheckedPossibility: (qId: QuestionId, pId: PossiblityId) => void;
  readonly removeCheckedPossibility: (qId: QuestionId) => void;
}

class Question extends React.Component<QuestionProps, any> {

  render() {
    const {question} = this.props;
    return (
      <main className={`Question Question-${question.id}`}>
        <div className="Question_label">
          {question.label}
          {question.required && <span className="Question_required">*</span>}
        </div>
        <div className="Question_description">
          {question.description}
        </div>
        <div className="Question_answer">{this.renderQuestion(question)}</div>
      </main>
    );
  }

  renderQuestion(question: IQuestion) {
    const {messages, answer, readonly, isValid} = this.props;
    const props = {
      question,
      messages,
      readonly,
      answer,
      isValid,
      onChange: this.update,
    };
    switch (question.question_type) {
      case QuestionType.TEXT:
        return <QuestionText {...props}/>;

      case QuestionType.LONGTEXT:
        return <QuestionLongText {...props}/>;

      case QuestionType.RADIO:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionRadio {...props}/>;
        return <QuestionAutocomplete {...props}/>;
      //
      case QuestionType.SELECT:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionSelect {...props}/>;
        return <QuestionAutocomplete {...props}/>;

      case QuestionType.CHECKBOX:
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
          return <QuestionCheckbox {...props}/>;
        return <QuestionAutocomplete multiSelect {...props}/>;

      case QuestionType.DATE:
        if (this.props.dateFormat)
          return <QuestionDate {...props} dateFormat={this.props.dateFormat}/>;
        return <QuestionText {...props}/>;

      case QuestionType.DOCUMENT:
        return <QuestionDocument {...props}/>;

      case QuestionType.LABEL:
        return '';

      default:
        return <QuestionText {...props}/>;
    }
  }

  componentWillUnmount() {
    const {question, updateSectionValidity} = this.props;
    updateSectionValidity(question.section_id, question.id, true);
  }

  shouldComponentUpdate(nextProps: QuestionProps) {
    return this.props.answer !== nextProps.answer || this.props.isValid !== nextProps.isValid;
  }

  private update = (value: string[], isValid: boolean) => {
    const {updateAnswer, updateSectionValidity, question, triggerOnChange} = this.props;
    updateSectionValidity(question.section_id, question.id, isValid);
    this.handlePossibilityDependencyCaching(value);
    if (this.checkValueChange(value)) {
      updateAnswer(question.id, value);
      if (isValid && triggerOnChange) triggerOnChange(question.id);
    }
  };

  private checkValueChange(value: string[] | undefined): boolean {
    const {answer} = this.props;
    if (answer && value)
      return !(value.length === answer.length && value.every((v, i) => v === answer[i]));
    return true;
  }

  private handlePossibilityDependencyCaching(value?: string[]) {
    const {addCheckedPossibility, removeCheckedPossibility, question} = this.props;
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
}

const state2Props = (state, props) => ({
  messages: state.formAnswer.messages,
  readonly: state.formAnswer.readonly,
  dateFormat: state.formAnswer.dateFormat || '',
  answer: state.formAnswer.answers[props.question.id],
  triggerOnChange: state.formAnswer.triggerOnChange,
  isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
});

const dispatch2Props = (d) => ({
  removeAnswer: (qId: QuestionId) => d(formAction.removeAnswer(qId)),
  updateAnswer: (qId: QuestionId, answer: any) => d(formAction.updateAnswer(qId, answer)),
  updateSectionValidity: (sId: SectionId, qId: QuestionId, isValid: boolean) => d(formAction.updateSectionValidity(sId, qId, isValid)),
  addCheckedPossibility: (qId: QuestionId, pId: PossiblityId) => d(formAction.addCheckedPossibility(qId, pId)),
  removeCheckedPossibility: (qId: QuestionId) => d(formAction.removeCheckedPossibility(qId)),
});

export default connect(state2Props, dispatch2Props)(Question)
