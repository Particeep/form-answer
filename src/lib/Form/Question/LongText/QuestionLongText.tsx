import * as React from 'react';
import QuestionText from '../Text/QuestionText';
import {IQuestion} from '../../../types/Question';

interface Props {
  readonly question: IQuestion;
  readonly readonly: boolean
}

class QuestionLongText extends React.Component<Props, {}> {

  render() {
    return (
      <QuestionText {...this.props} multiline rows="3" rowsMax="10"/>
    );
  }
}

export default QuestionLongText;
