import * as React from 'react';
import {FormControl, FormHelperText, Input} from '@material-ui/core';
import {QuestionProps, questionWrapper} from '../questionWrapper';
import {IQuestion} from '../../../types/Question';

interface Props extends QuestionProps {
}

interface State {
  touched: boolean;
}

class QuestionText extends React.Component<Props, State> {

  state: State = {
    touched: false,
  };

  render() {
    const {value, question, messages, multiline, rows, rowsMax, readonly} = this.props;
    return (
      <FormControl error={this.showError()} fullWidth>
        <Input value={value}
               multiline={multiline}
               rows={rows}
               rowsMax={rowsMax}
               onChange={e => this.handleChange(e.target.value)}
               onBlur={() => this.setState({touched: true})}
               disabled={readonly}/>
        <FormHelperText title={'pattern: ' + question.pattern}>
          {this.showError() ? messages.invalidText : ''}
        </FormHelperText>
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
    if (!value || value === '') {
      if (!this.state.touched) return false;
      return question.required;
    }
    return true;
  }
}

export const mapSingleValue = (answer: string[]): string => answer && answer[0] || '';

export const parseSingleValue = (value: string): string[] => value && [value];

export const isTextValid = (question: IQuestion, value: string): boolean => {
  if (question.required && (!value || value === '')) return false;
  return !question.pattern || new RegExp(question.pattern).test(value);
};

export const mapProps = (
  map: (a: string[]) => string | string[],
  parse: (a: string | string[]) => string[],
  validation: (q: IQuestion, value: string | string[]) => boolean
) => Component => props => {
  const {answer, onChange, ...other} = props;

  function change(value: string) {
    return onChange(parse(value), validation(props.question, value));
  }

  return <Component {...other} value={map(answer)} onChange={change}/>;
};

export const mapSingleValueProps = (validation: (q: IQuestion, value: string | string[]) => boolean) =>
  mapProps(mapSingleValue, parseSingleValue, validation);

export const mapTextProps = mapSingleValueProps(isTextValid);

export default mapTextProps(questionWrapper(QuestionText));
