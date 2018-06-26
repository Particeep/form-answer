import * as React from 'react';
import {IQuestion} from '../../types/Question';
import {Subtract} from 'utility-types';
import {IMessages} from '../../types/Messages';
import {connect} from 'react-redux';

export interface QuestionProps {
  readonly readonly: boolean;
  readonly question: IQuestion;
  readonly messages: IMessages,
  readonly isValid: boolean;
  readonly multiline?: boolean,
  readonly multiSelect?: boolean;
  readonly rows?: number,
  readonly rowsMax?: number,
  readonly onChange: (value: string | string[]) => void;
  readonly value: any; // TODO string[] | string;
}

export const questionWrapper = <P extends QuestionProps>(WrappedQuestion: React.ComponentType<P>) => {

  interface Props {
    readonly rows?: number,
    readonly rowsMax?: number,
    readonly multiline?: boolean,
    readonly readonly: boolean;
    readonly multiSelect?: boolean;
    readonly dateFormat?: string;
    readonly question: IQuestion;
    readonly messages: IMessages,
    readonly isValid: boolean;
    readonly value: any,
    readonly onChange: any, // TODO type
    // readonly removeAnswer: (qId: QuestionId) => void;
    // readonly updateAnswer: (qId: QuestionId, qType: QuestionType, value: any) => void;
    // readonly updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => void;
    // readonly addCheckedPossibility: (qId: QuestionId, pId: PossiblityId) => void;
    // readonly removeCheckedPossibility: (qId: QuestionId) => void;
  }

  class QuestionWrapper extends React.Component<Subtract<P, QuestionProps> & Props, {}> {

    render() {
      return <WrappedQuestion
        {...this.props}
      />
    }

    componentDidMount() {
      const {question, isValid, value, onChange} = this.props;
      onChange(value);
    }

    // componentWillUnmount() {
    //   const {question, onChange, updateSectionValidity} = this.props;
    //   onChange();
    //   updateSectionValidity(question.section_id, question.id, true);
    // }

    // private getAnswer() {
    //   const {answer} = this.props;
    //   return answer && answer.value || '';
    // }

    /** Store checked possibility id to easily show Questions according to their dependency_id_dep */
    // private handlePossibilityDependencyCaching(value?: string) {
    //   const {addCheckedPossibility, removeCheckedPossibility, question} = this.props;
    //   if (!isDependable(question)) return;
    //   if (value) {
    //     const possibility = question.possibilities.find((p: IPossibility) => p.label == value);
    //     if (!possibility) return;
    //     removeCheckedPossibility(question.id);
    //     addCheckedPossibility(question.id, possibility.id);
    //   } else {
    //     removeCheckedPossibility(question.id);
    //   }
    // }
  }

  const state2Props = (state, props) => ({
    // messages: state.formAnswer.messages,
    // triggerOnChange: state.formAnswer.triggerOnChange,
    // answer: state.formAnswer.answers[props.question.id],
    // isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
  });

  const dispatch2Props = (d) => ({
    // removeAnswer: (qId: QuestionId) => d(formAction.removeAnswer(qId)),
    // updateAnswer: (qId: QuestionId, answer: any) => d(formAction.updateAnswer(qId, answer)),
    // updateSectionValidity: (sId: SectionId, qId: QuestionId, isValid: boolean) => d(formAction.updateSectionValidity(sId, qId, isValid)),
    // addCheckedPossibility: (qId: QuestionId, pId: PossiblityId) => d(formAction.addCheckedPossibility(qId, pId)),
    // removeCheckedPossibility: (qId: QuestionId) => d(formAction.removeCheckedPossibility(qId)),
  });

  return connect(null, dispatch2Props)(QuestionWrapper);
};
