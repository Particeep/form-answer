import * as React from 'react';
import {Input} from '@material-ui/core';
import Mask from './Mask';
import {InputProps} from '@material-ui/core/Input';

interface Props extends InputProps {
  format: string;
}

class InputDate extends React.Component<Props, {}> {

  render() {
    const {format, ...props} = this.props;
    return (
      <Input {...props} inputComponent={this.mask} />
    );
  }

  private mask = (props) => {
    const {inputRef, ...other} = props;
    return <Mask {...other} format={this.props.format} lang={this.props.lang}/>;
  }
}

export default InputDate;
