import * as React from 'react';
import {ExpensionStep, ExpensionStepper} from '../ExpensionStepper';
import {Section} from './Section';
import {connect} from 'react-redux';
import {formAction} from './form.action';
import {Id} from '../types/Id';
import {IAnswer} from '../types/Answer';
import {QuestionId, QuestionType} from '../types/Question';
import {IDoc} from '../types/Doc';
import {IForm} from '../types/Form';
import {defaultMessages, IMessages} from '../types/Messages';

export interface FormProps {
  form: IForm;
  readonly?: boolean;
  dateFormat?: string;
  lang?: string;
  messages?: IMessages;
  maxUploadFileSize?: number;
  dispatch: any;
  answers: any;
  onChange?: (a: IAnswer) => void;
  onSectionEnd?: (a: IAnswer[]) => void;
  onEnd?: (a: IAnswer[]) => void;
  onUploadFile?: (file: File, callback: (d: IDoc) => void) => void;
  onRemoveFile?: (id: string) => void;
}

class Form extends React.Component<FormProps, any> {

  public static defaultProps: Partial<FormProps> = {
    messages: defaultMessages
  };

  render() {
    return this.renderForm();
  }

  renderForm() {
    return (
      <ExpensionStepper free={this.props.readonly} onNext={this.next} onEnd={this.end}>
        {this.props.form.sections.map(s =>
          <ExpensionStep label={s.name} component={<Section section={s}/>} key={s.id}/>
        )}
      </ExpensionStepper>
    );
  }

  componentWillMount() {
    this.initReducerParams();
    this.initReducerAnswers();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.form != prevProps.form) this.initReducerAnswers();
  }

  private initReducerParams() {
    const {
      dispatch,
      dateFormat,
      lang,
      messages,
      maxUploadFileSize,
      readonly,
    } = this.props;
    dispatch(formAction.init({
      dateFormat: dateFormat,
      lang: lang,
      messages: messages,
      maxUploadFileSize: maxUploadFileSize,
      triggerOnChange: this.onChange,
      onUploadFile: this.onUploadFile,
      onRemoveFile: this.onRemoveFile,
      readonly: readonly || false,
    }));
  }

  private initReducerAnswers() {
    const {dispatch, form} = this.props;
    dispatch(formAction.resetAnswers());
    form.sections.forEach(s => s.questions.forEach(q => {
      if (q.question_type === QuestionType.LABEL) return;
      dispatch(formAction.updateAnswer(q.id, q.answers));
    }));
  }

  private onUploadFile = (file: File, callback: any) => {
    const {onUploadFile} = this.props;
    onUploadFile(file, callback);
  };

  private onRemoveFile = (id: string) => {
    const {onRemoveFile} = this.props;
    onRemoveFile(id);
  };

  private onChange = (questionIdAnswered: QuestionId) => {
    if (!this.props.onChange) return;
    setTimeout(() =>
      this.props.onChange(this.parseAnswer(questionIdAnswered, this.props.answers[questionIdAnswered]))
    );
  };

  private next = (sectionIndex: number) => {
    if (!this.props.onSectionEnd) return;
    this.props.onSectionEnd(this.parseAnswers(this.getSectionAnswers(sectionIndex)));
  };

  private end = () => {
    const {form, answers, onSectionEnd, onEnd} = this.props;
    if (onSectionEnd)
      onSectionEnd(this.parseAnswers(this.getSectionAnswers(form.sections.length - 1)));
    if (onEnd)
      onEnd(this.parseAnswers(answers));
  };

  private getSectionAnswers(sectionIndex: number): { [key: string]: string[] } {
    const {answers} = this.props;
    const sectionQuestionIds = this.props.form.sections[sectionIndex].questions.map(q => q.id);
    return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
      obj[key] = answers[key];
      return obj;
    }, {});
  }

  private parseAnswers = (answers: { [key: string]: string[] }): IAnswer[] => {
    return Object.keys(answers).map((k: Id) => this.parseAnswer(k, answers[k])).filter((v: any) => v);
  };

  private parseAnswer = (id: Id, answer: string[]): IAnswer | null => {
    if (answer)
      return {question_id: id, answer}
  };
}

const state2Props = (state: any) => ({
  answers: state.formAnswer.answers,
});

export default connect(state2Props)(Form);
