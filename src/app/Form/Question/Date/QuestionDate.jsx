import React, {Component} from "react";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import InputDate from "../../../InputDate/InputDate";
import {TextField} from "material-ui";

class QuestionDate extends Component {

    render() {
        const {dateFormat, value} = this.props;
        if (dateFormat) {
            return (
                <InputDate
                    value={value || ''}
                    onChange={e => this.handleChange(e.target.value)}
                    format={dateFormat}
                    fullWidth/>
            );
        } else {
            return (
                <TextField value={value || ''} onChange={e => this.handleChange(e.target.value)} fullWidth/>
            )
        }
    }

    componentDidMount() {
        const {value} = this.props;
        if (value != undefined) this.update(value);
        this.updateValidity(value);
    }

    handleChange = value => {
        console.log(value);
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
        return !this.props.question.required || (!!value && value !== '');
    }
}

const state2Props = (state, props) => ({
    value: mapSingleAnswer(state.form.answers[props.question.id]),
    notifyChange: state.form.notifyChange,
    dateFormat: state.form.dateFormat,
});

export default connect(state2Props)(QuestionDate)