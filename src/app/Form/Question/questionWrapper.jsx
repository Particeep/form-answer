import React, {Component} from "react";
import formAction from "../formAction";
import {isDependable} from "../utils";
import {connect} from "react-redux";

export function questionWrapper(Question) {

    class QuestionWrapper extends Component {

        render() {
            const {question, answers} = this.props;
            return <Question
                {...this.props}
                values={answers[question.id] || []}
                onChange={this.changed}
                onCheckPossibility={this.addCheckedPossibility}
            />
        }

        componentDidMount() {
            this.update(this.props.question.answers);
        }

        componentWillUnmount() {
            const {dispatch, question} = this.props;
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, true));
            dispatch(formAction.removeAnswer(question.id));
            if (isDependable(question)) {
                dispatch(formAction.removeCheckedPossbility(question.id));
            }
        }

        changed = (values) => {
            this.update(values);
        };

        update(values) {
            const {dispatch, question, validator} = this.props;
            dispatch(formAction.updateAnswer(question.id, values));
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, validator(values)));
            this.props.notifyChange(question.id);
        }

        addCheckedPossibility = (possibilityLabel) => {
            const {dispatch, question} = this.props;
            dispatch(formAction.addCheckedPossbility(question.id, possibilityLabel));
        };
    }

    const state2Props = (state, props) => ({
        messages: state.form.messages,
        notifyChange: state.form.notifyChange,
        answers: state.form.answers,
        isValid: (state.form.sectionsValidity[props.question.section_id] || [])[props.question.id]
    });

    return connect(state2Props)(QuestionWrapper);
}