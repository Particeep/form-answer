import * as React from 'react';
import {formAction} from '../form.action';
import {connect} from 'react-redux';
import {isDependable, IQuestion, QuestionId, QuestionType} from '../../types/Question';
import {IPossibility, PossiblityId} from '../../types/Possiblity';
import {SectionId} from '../../types/Section';
import {Subtract} from 'utility-types';
import {IMessages} from '../../types/Messages';

export interface QuestionProps {
  readonly readonly: boolean;
  readonly question: IQuestion;
  readonly messages: IMessages,
  readonly isValid: boolean;
  readonly multiline: boolean,
  readonly rows: number,
  readonly rowsMax: number,
  readonly onChange: (value: string | string[]) => void;
  readonly value: any;
}

export const questionWrapper = <P extends QuestionProps>(WrappedQuestion: React.ComponentType<P>) => {

  interface Props {
    readonly rows: number,
    readonly rowsMax: number,
    readonly readonly: boolean;
    readonly multiline: boolean,
    readonly multiSelect: boolean;
    readonly dateFormat: string;
    readonly question: IQuestion;
    readonly validator: (value: any) => boolean;
    readonly messages: IMessages,
    readonly triggerOnChange: any,
    readonly isValid: boolean;
    readonly answer: any,
    readonly removeAnswer: (qId: QuestionId) => void;
    readonly updateAnswer: (qId: QuestionId, qType: QuestionType, value: any) => void;
    readonly updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => void;
    readonly addCheckedPossbility: (qId: QuestionId, pId: PossiblityId) => void;
    readonly removeCheckedPossbility: (qId: QuestionId) => void;
  }

  class QuestionWrapper extends React.Component<Subtract<P, QuestionProps> & Props, {}> {

    render() {
      return <WrappedQuestion
        {...this.props}
        value={this.getAnswer()}
        onChange={this.update}
      />
    }

    componentDidMount() {
      const {updateSectionValidity, question, validator} = this.props;
      const answer = this.getAnswer();
      updateSectionValidity(question.section_id, question.id, validator(answer));
      this.handlePossibilityDependencyCaching(answer);
    }

    componentWillUnmount() {
      const {updateSectionValidity, removeAnswer, question} = this.props;
      updateSectionValidity(question.section_id, question.id, true);
      removeAnswer(question.id);
      this.handlePossibilityDependencyCaching();
    }

    shouldComponentUpdate(nextProps: Props) {
      return this.props.answer !== nextProps.answer
        || this.props.isValid !== nextProps.isValid;
    }

    private update = (value: any) => {
      const {updateAnswer, updateSectionValidity, question, validator} = this.props;
      updateAnswer(question.id, question.question_type, value);
      updateSectionValidity(question.section_id, question.id, validator(value));
      this.handlePossibilityDependencyCaching(value);
      this.props.triggerOnChange(question.id);
    };

    private getAnswer() {
      const {answer} = this.props;
      return answer && answer.value || '';
    }

    /** Store checked possibility id to easily show Questions according to their dependency_id_dep */
    private handlePossibilityDependencyCaching(value?: string) {
      const {addCheckedPossbility, removeCheckedPossbility, question} = this.props;
      if (!isDependable(question)) return;
      if (value) {
        const possibility = question.possibilities.find((p: IPossibility) => p.label == value);
        if (!possibility) return;
        removeCheckedPossbility(question.id);
        addCheckedPossbility(question.id, possibility.id);
      } else {
        removeCheckedPossbility(question.id);
      }
    }
  }

  const state2Props = (state, props) => ({
    messages: state.formAnswer.messages,
    triggerOnChange: state.formAnswer.triggerOnChange,
    answer: state.formAnswer.answers[props.question.id],
    isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
  });

  const dispatch2Props = (dispatch) => ({
    removeAnswer: (qId: QuestionId) => dispatch(formAction.removeAnswer(qId)),
    updateAnswer: (qId: QuestionId, qType: QuestionType, value: any) => dispatch(formAction.updateAnswer(qId, qType, value)),
    updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => dispatch(formAction.updateSectionValidity(sId, qId, validator)),
    addCheckedPossbility: (qId: QuestionId, pId: PossiblityId) => dispatch(formAction.addCheckedPossbility(qId, pId)),
    removeCheckedPossbility: (qId: QuestionId) => dispatch(formAction.removeCheckedPossbility(qId)),
  });

  return connect(state2Props, dispatch2Props)(QuestionWrapper);
};
