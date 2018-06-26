import * as React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@material-ui/core';
import {QuestionProps, questionWrapper} from '../questionWrapper';
import {IQuestion} from '../../../types/Question';
import {mapProps} from '../Text/QuestionText';

interface Props extends QuestionProps {
}

class QuestionCheckbox extends React.Component<Props, {}> {

  render() {
    const {question, readonly} = this.props;
    return (
      <FormGroup>
        {question.possibilities.map(p =>
          <FormControlLabel key={p.id} label={p.label} control={
            <Checkbox
              checked={this.isPossibilityChecked(p.label)}
              onChange={this.handleChange(p.label)}
              value={p.label}
              disabled={readonly}
            />
          }/>
        )}
      </FormGroup>
    );
  }

  private handleChange = (value: string) => (event: any, checked: boolean) => {
    let values;
    if (checked) {
      if (!this.isPossibilityChecked(value))
        values = this.props.value.concat(value)
    } else {
      values = this.props.value.filter((v: string) => v != value);
    }
    this.props.onChange(values);
  };

  private isPossibilityChecked = (label: string) => this.props.value.indexOf(label) !== -1;
}

const isCheckboxValid = (question: IQuestion, values: string[]): boolean => {
  return !question.required || values.length > 0;
};

const mapMultipleValues = (x: string[]): string[] => x || [];

const parseMultipleValues = (x: string[]): string[] => x.length === 0 ? null : x;

export const mapMutltipleValueProps = (validation: (q: IQuestion, value: string | string[]) => boolean) => mapProps(mapMultipleValues, parseMultipleValues, validation);

export default mapMutltipleValueProps(isCheckboxValid)(questionWrapper(QuestionCheckbox));
