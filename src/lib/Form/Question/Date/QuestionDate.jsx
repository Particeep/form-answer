import React, {Component} from "react";
import InputDate from "../../../InputDate/InputDate";
import {FormControl, FormHelperText} from "material-ui";
import QuestionText from "../Text/QuestionText";
import {questionWrapper} from "../questionWrapper";

class QuestionDate extends Component {

    state = {
        touched: false,
    };

    render() {
        const {dateFormat, value, messages, readonly} = this.props;

        if (!dateFormat) {
            return <QuestionText {...this.props}/>
        }
        return (
            <FormControl error={this.showError()} fullWidth>
                {dateFormat &&
                <InputDate
                    value={value}
                    format={dateFormat}
                    onChange={e => this.handleChange(e.target.value)}
                    onBlur={() => this.setState({touched: true})}
                    disabled={readonly}/>
                }
                <FormHelperText>{this.showError() ? messages.invalidDate : ''}</FormHelperText>
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

export default questionWrapper(QuestionDate);