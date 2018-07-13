import * as React from 'react';
import {IQuestion} from '../../types/Question';
import {Subtract} from 'utility-types';
import {IMessages} from '../../types/Messages';

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
    readonly onChange: (value: string | string[]) => void,
  }

  class QuestionWrapper extends React.Component<Subtract<P, QuestionProps> & Props, {}> {

    render() {
      return <WrappedQuestion
        {...this.props}
      />
    }

    componentDidMount() {
      const {value, onChange} = this.props;
      onChange(value);
    }
  }

  return QuestionWrapper;
};
