import * as React from 'react';
import InputDate from '../../../InputDate/InputDate';
import {FormControl, FormHelperText} from '@material-ui/core';
import {QuestionProps, questionWrapper} from '../questionWrapper';
import {mapProps, mapSingleValue, parseSingleValue} from '../Text/QuestionText';
import {IQuestion} from '../../../types/Question';
import * as Moment from 'moment';
import {stringToDate} from '../../../utils/common';
import moment = require('moment');

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
          onChange={this.handleChange}
          onBlur={this.setTouched}
          disabled={readonly}/>
        <FormHelperText>{this.showError() ? messages.invalidDate : ''}</FormHelperText>
      </FormControl>
    );
  }

  private handleChange = (e: any) => {
    this.props.onChange(e.target.value);
  };

  private setTouched = () => {
    this.setState({touched: true});
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

const isDateValid = (dateFormat?: string) => (question: IQuestion, value: string) => {
  if (!question.required && (!value || value === '')) return true;
  return Moment(value, dateFormat.toUpperCase(), true).isValid()
};

const mapDate = (dateFormat?: string) => (answer: string[]) => {
  const mappedAnswer = mapSingleValue(answer);
  if(!dateFormat) return mappedAnswer;
  return Moment(mappedAnswer).format(dateFormat.toUpperCase());
};

const parseDate = (dateFormat?: string) => (x: string) => {
  if(dateFormat) {
    const date: Date = stringToDate(x, dateFormat.toLowerCase());
    const mmt = moment.utc(date).set('hour', 0);
    if (mmt.isValid()) x = mmt.toISOString().replace(/\.000Z$/, 'Z');
    else x = null;
  }
  return parseSingleValue(x);
};

export const mapDateProps = Component => props => {
  const {dateFormat} = props;
  return mapProps(mapDate(dateFormat), parseDate(dateFormat), isDateValid(dateFormat))(Component)(props);
};

export default mapDateProps(questionWrapper(QuestionDate));
