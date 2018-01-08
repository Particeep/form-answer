import React, {Component} from "react";
import {TextField} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";

class QuestionLongText extends Component {

    render() {
        const {value} = this.props;
        return (
            <TextField
                value={value || ''}
                onChange={e => this.handleChange(e.target.value)}
                fullWidth multiline rows="3" rowsMax="10"/>
        );
    }

    componentDidMount() {
        const {value} = this.props;
        this.update(value);
    }

    handleChange = value => {
        this.update(value);
        this.props.notifyChange(this.props.question.id);
    };

    update(value) {
        const {dispatch, question} = this.props;
        if (value != undefined) dispatch(formAction.updateAnswer(question.id, parseSingleAnswer(value)));
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(value)));
    }

    isValid(value) {
        return !this.props.question.required || (!!value && value !== '');
    }
}

const state2Props = (state, props) => ({
    value: mapSingleAnswer(state.form.answers[props.question.id]),
    notifyChange: state.form.notifyChange,
});

export default connect(state2Props)(QuestionLongText)