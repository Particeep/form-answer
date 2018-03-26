import React, {Component} from "react";
import {formAction} from "../formAction";
import {isDependable} from "../../utils/common";
import {connect} from "react-redux";

export function questionWrapper(Question) {

    class QuestionWrapper extends Component {

        render() {
            return <Question
                {...this.props}
                value={this.getAnswer()}
                onChange={this.update}
            />
        }

        componentDidMount() {
            const {dispatch, question, validator} = this.props;
            const answer = this.getAnswer();
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, validator(answer)));
            this.handlePossibilityCaching(answer);
        }

        componentWillUnmount() {
            const {dispatch, question} = this.props;
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, true));
            dispatch(formAction.removeAnswer(question.id));
            this.handlePossibilityCaching();
        }

        update = (value) => {
            const {dispatch, question, validator} = this.props;
            dispatch(formAction.updateAnswer(question.id, question.question_type, value));
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, validator(value)));
            this.handlePossibilityCaching(value);
            this.props.notifyChange(question.id);
        };

        getAnswer() {
            const answer = this.props.answers[this.props.question.id];
            return answer && answer.value;
        }

        handlePossibilityCaching(value) {
            const {dispatch, question} = this.props;
            if (!isDependable(question)) return;
            if (value) {
                const possibility = question.possibilities.find(p => p.label === value);
                dispatch(formAction.addCheckedPossbility(question.id, possibility.id));
            } else {
                dispatch(formAction.removeCheckedPossbility(question.id));
            }
        }
    }

    const state2Props = (state, props) => ({
        messages: state.formAnswer.messages,
        notifyChange: state.formAnswer.notifyChange,
        answers: state.formAnswer.answers,
        isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
    });

    return connect(state2Props)(QuestionWrapper);
}