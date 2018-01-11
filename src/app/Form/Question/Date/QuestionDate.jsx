import React, {Component} from "react";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {mapSingleAnswer, parseSingleAnswer, stringToDate} from "../../utils";
import InputDate from "../../../InputDate/InputDate";
import {FormControl, FormHelperText, Input, TextField} from "material-ui";
import moment from 'moment';
import QuestionText from "../Text/QuestionText";
import {questionWrapper} from "../questionWrapper";

class QuestionDate extends Component {

    state = {
        errorMessage: null,
        touched: false,
    };

    render() {
        const {dateFormat, value} = this.props;
        const {errorMessage, touched} = this.state;
        if (!dateFormat) {
            return <QuestionText {...this.props}/>
        }
        return (
            <FormControl error={touched && errorMessage != null} fullWidth>
                {dateFormat &&
                <InputDate
                    value={value || ''} format={dateFormat}
                    onChange={e => this.handleChange(e.target.value)}
                    onBlur={() => this.setState({touched: true})}/>
                }
                <FormHelperText>{(touched && errorMessage) || ''}</FormHelperText>
            </FormControl>
        );
    }

    componentDidMount() {
        const {value} = this.props;
        if (value != undefined) this.update(value);
        this.updateValidity(value);
    }

    handleChange = value => {
        this.update(value);
        this.updateValidity(value);
        this.props.notifyChange(this.props.question.id);
    };

    update(value) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateAnswer(question.id, parseSingleAnswer(value)));
    }

    updateValidity(value) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(value)));
    }

    isValid(value) {
        const isValid = moment(value, this.props.dateFormat.toUpperCase(), true).isValid();
        this.setState({errorMessage: !isValid ? this.props.messages.invalidDate : null});
        return isValid;
    }
}

const state2Props = (state, props) => ({
    value: mapSingleAnswer(state.form.answers[props.question.id]),
    notifyChange: state.form.notifyChange,
    dateFormat: state.form.dateFormat || '',
    messages: state.form.messages,
});

export default connect(state2Props)(questionWrapper(QuestionDate))