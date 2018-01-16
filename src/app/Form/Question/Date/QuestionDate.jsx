import React, {Component} from "react";
import {mapSingleAnswer, parseSingleAnswer, stringToDate} from "../../utils";
import InputDate from "../../../InputDate/InputDate";
import {FormControl, FormHelperText} from "material-ui";
import QuestionText from "../Text/QuestionText";
import {questionWrapper} from "../questionWrapper";

class QuestionDate extends Component {

    state = {
        touched: false,
    };

    render() {
        const {dateFormat, values, messages} = this.props;

        if (!dateFormat) {
            return <QuestionText {...this.props}/>
        }
        return (
            <FormControl error={this.showError()} fullWidth>
                {dateFormat &&
                <InputDate
                    value={mapSingleAnswer(values)} format={dateFormat}
                    onChange={e => this.handleChange(e.target.value)}
                    onBlur={() => this.setState({touched: true})}/>
                }
                <FormHelperText>{this.showError() ? messages.invalidDate : ''}</FormHelperText>
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

export default questionWrapper(QuestionDate);