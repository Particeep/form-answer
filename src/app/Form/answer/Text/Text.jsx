import React, {Component} from "react";
import {TextField} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";

class Text extends Component {

    render() {
        const {answers, question} = this.props;
        return (
            <TextField
                value={answers[question.id] || ''}
                onChange={e => this.valueChange(e.target.value)}
                fullWidth/>
        );
    }

    componentDidMount() {
        const {question} = this.props;
        this.valueChange(question.answers ? question.answers[0] : '')
    }

    valueChange = value => {
        this.props.onValidationChange(this.isValid(value));
        this.props.dispatch(formAction.updateAnswer(this.props.question.id, value));
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

export default connect(state2Props)(Text)