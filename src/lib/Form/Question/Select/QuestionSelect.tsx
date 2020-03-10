import * as React from 'react';
import {FormControl, Input, MenuItem, Select} from '@material-ui/core';
import {MappedQuestionProps, mapSelectProps} from '../question-wrappers';

interface Props extends MappedQuestionProps {
}

class QuestionSelect extends React.Component<Props, {}> {

  render() {
    const {question, value, readonly} = this.props;
    return (
      <FormControl fullWidth style={{minHeight: '40px'}}>
        <Select
          value={value}
          onChange={this.handleChange}
          input={<Input/>}
          disabled={readonly}>
          <MenuItem value=""/>
          {question.possibilities.map(p =>
            <MenuItem key={p.id} value={p.label}>{p.label}</MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(e.target.value);
  };
}

export default mapSelectProps(QuestionSelect);
