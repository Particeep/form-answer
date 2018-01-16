import React, {Component} from "react";
import {FormControl, FormHelperText, Input} from "material-ui";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionWrapper} from "../questionWrapper";

class QuestionText extends Component {

    state = {
        touched: false,
    };

    render() {
        const {values, question, messages, multiline, rows, rowsMax} = this.props;
        return (
            <FormControl error={this.showError()} fullWidth>
                <Input value={mapSingleAnswer(values)}
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
        this.props.onChange(parseSingleAnswer(value));
    };

    showError() {
        const value = mapSingleAnswer(this.props.values);
        if (this.props.isValid) return false;
        if (this.props.question.required && (!value || value === '') && !this.state.touched) return false;
        return true;
    }
}

export default questionWrapper(QuestionText);