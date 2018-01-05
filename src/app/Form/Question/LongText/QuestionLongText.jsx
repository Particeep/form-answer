import React, {Component} from "react";
import {TextField} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";

class QuestionLongText extends Component {

    render() {
        const {value, question} = this.props;
        return (
            <TextField
                value={value}
                onChange={e => this.valueChange(e.target.value)}
                fullWidth multiline rows="3" rowsMax="10"/>
        );
    }

    componentDidMount() {
        const {question} = this.props;
        this.valueChange(question.answers ? question.answers[0] : '')
    }

    valueChange = value => {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(value)))
        dispatch(formAction.updateAnswer(question.id, [value]));
    };

    isValid(value) {
        return !this.props.question.required || (!!value && value !== '');
    }
}

function state2Props(state) {
    return {
        answers: state.form.answers,
    }
}

export default connect(state2Props)(QuestionLongText)