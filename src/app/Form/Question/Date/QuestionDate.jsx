import React, {Component} from "react";
import InputDate from "../../../InputDate/InputDate";
import {FormControl, FormHelperText} from "material-ui";
import QuestionText from "../Text/QuestionText";
import {questionWrapper} from "../questionWrapper";
import {apiFormatToDate, dateToApiFormat, mapSingleAnswer, parseSingleAnswer} from "../../utils";
import moment from "moment";

class QuestionDate extends Component {

    state = {
        touched: false,
        value: '',
    };

    render() {
        const {dateFormat, messages} = this.props;

        if (!dateFormat) {
            return <QuestionText {...this.props}/>
        }
        return (
            <FormControl error={this.showError()} fullWidth>
                {dateFormat &&
                <InputDate
                    value={this.state.value}
                    format={dateFormat}
                    onChange={e => this.handleChange(e.target.value)}
                    onBlur={() => this.setState({touched: true})}/>
                }
                <FormHelperText>{this.showError() ? messages.invalidDate : ''}</FormHelperText>
            </FormControl>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.values !== this.props.values) {
            const date = mapSingleAnswer(this.props.values);
            this.setState({value: date ? apiFormatToDate(date, this.props.dateFormat) : ''});
        }
    }

    handleChange = value => {
        this.setState({value});
        const parsedValue = dateToApiFormat(value, this.props.dateFormat);
        if (parsedValue && this.props.validator(parsedValue)) this.props.onChange(parseSingleAnswer(parsedValue));
    };

    showError() {
        const value = mapSingleAnswer(this.props.values);
        if (this.props.isValid) return false;
        if ((!value || value === '')) {
            if (!this.state.touched) return false;
            return this.props.question.required;
        }
        return true;
    }

    isValid() {
        return moment(this.state.value, this.props.dateFormat.toUpperCase(), true).isValid()
    }
}

export default questionWrapper(QuestionDate);