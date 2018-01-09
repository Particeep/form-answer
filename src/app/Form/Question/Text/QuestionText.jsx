import React, {Component} from "react";
import {FormControl, FormHelperText, Input, TextField} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionBehavior} from "../questionBehavior";

class QuestionText extends Component {

    state = {
        errorMessage: null,
        touched: false,
    };

    render() {
        const {value, multiline, rows, rowsMax} = this.props;
        const {errorMessage, touched} = this.state;
        return (
            <FormControl error={touched && errorMessage != null} fullWidth>
                <Input value={value || ''}
                       multiline={multiline}
                       rows={rows}
                       rowsMax={rowsMax}
                       onChange={e => this.handleChange(e.target.value)} fullWidth
                       onBlur={() => this.setState({touched: true})}/>
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
        const isValid = this.isValid(value);
        this.setState({errorMessage: !isValid ? this.props.messages.invalidText : null});
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, isValid));
    }

    isValid(value) {
        const {question} = this.props;
        if (!value) return !this.props.question.required;
        if (question.pattern && !new RegExp(question.pattern).test(value)) return false;
        return true;
    }
}

const state2Props = (state, props) => ({
    value: mapSingleAnswer(state.form.answers[props.question.id]),
    notifyChange: state.form.notifyChange,
    messages: state.form.messages,
});

export default connect(state2Props)(questionBehavior(QuestionText));