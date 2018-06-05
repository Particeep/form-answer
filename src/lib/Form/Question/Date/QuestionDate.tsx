import * as React from 'react';
import InputDate from '../../../InputDate/InputDate';
import {FormControl, FormHelperText} from 'material-ui';
import {QuestionProps, questionWrapper} from '../questionWrapper';

interface Props extends QuestionProps {
  dateFormat: string;
}

interface State {
  touched: boolean;
}

class QuestionDate extends React.Component<Props, State> {

  state: State = {
    touched: false,
  };

  render() {
    const {dateFormat, value, messages, readonly} = this.props;
    return (
      <FormControl error={this.showError()} fullWidth>
        <InputDate
          value={value}
          format={dateFormat}
          onChange={e => this.handleChange(e.target.value)}
          onBlur={() => this.setState({touched: true})}
          disabled={readonly}/>
        <FormHelperText>{this.showError() ? messages.invalidDate : ''}</FormHelperText>
      </FormControl>
    );
  }

  private handleChange = value => {
    this.props.onChange(value);
  };

  private showError() {
    const {value, isValid, readonly, question} = this.props;
    if (isValid) return false;
    if (readonly) return true;
    if ((!value || value === '')) {
      if (!this.state.touched) return false;
      return question.required;
    }
    return true;
  }
}

export default questionWrapper(QuestionDate);
