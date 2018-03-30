import React, {Component} from "react";
import {FormControl, FormHelperText, Input} from "material-ui";
import {questionWrapper} from "../questionWrapper";

class QuestionText extends Component {

    state = {
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

    handleChange = value => {
        this.props.onChange(value);
    };

    showError() {
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

export default questionWrapper(QuestionText);