import React, {Component} from "react";
import {FormControl, FormHelperText, Input} from "material-ui";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionWrapper} from "../questionWrapper";

class QuestionText extends Component {

    state = {
        touched: false,
    };

    render() {
        const {value, question, messages, multiline, rows, rowsMax} = this.props;
        return (
            <FormControl error={this.showError()} fullWidth>
                <Input value={value}
                       multiline={multiline}
                       rows={rows}
                       rowsMax={rowsMax}
                       onChange={e => this.handleChange(e.target.value)}
                       onBlur={() => this.setState({touched: true})}/>
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
        const value = this.props.value;
        if (this.props.isValid) return false;
        if ((!value || value === '')) {
            if (!this.state.touched) return false;
            return this.props.question.required;
        }
        return true;
    }
}

export default questionWrapper(QuestionText);