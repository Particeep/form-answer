import React, {Component} from "react";
import {formAction} from "../formAction";
import {isDependable} from "../utils";
import {connect} from "react-redux";

export function questionWrapper(Question) {

    class QuestionWrapper extends Component {

        render() {
            return <Question
                {...this.props}
                value={this.getAnswer()}
                onChange={this.update}
                onCheckPossibility={this.addCheckedPossibility}
            />
        }

        componentDidMount() {
            const {dispatch, question, validator} = this.props;
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, validator(this.getAnswer())));
        }

        componentWillUnmount() {
            const {dispatch, question} = this.props;
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, true));
            dispatch(formAction.removeAnswer(question.id));
            if (isDependable(question)) {
                dispatch(formAction.removeCheckedPossbility(question.id));
            }
        }

        getAnswer() {
            return this.props.answers[this.props.question.id].value;
        }

        update = (value) => {
            const {dispatch, question, validator} = this.props;
            dispatch(formAction.updateAnswer(question.id, question.question_type, value));
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, validator(value)));
            this.props.notifyChange(question.id);
        };

        addCheckedPossibility = (possibilityLabel) => {
            const {dispatch, question} = this.props;
            dispatch(formAction.addCheckedPossbility(question.id, possibilityLabel));
        };
    }

    const state2Props = (state, props) => ({
        messages: state.formAnswer.messages,
        notifyChange: state.formAnswer.notifyChange,
        answers: state.formAnswer.answers,
        isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
    });

    return connect(state2Props)(QuestionWrapper);
}