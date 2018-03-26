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
            const {updateSectionValidity, question, validator} = this.props;
            const answer = this.getAnswer();
            updateSectionValidity(question.section_id, question.id, validator(answer));
            this.handlePossibilityDependencyCaching(answer);
        }

        componentWillUnmount() {
            const {updateSectionValidity, removeAnswer, question} = this.props;
            updateSectionValidity(question.section_id, question.id, true);
            removeAnswer(question.id);
            this.handlePossibilityDependencyCaching();
        }

        update = (value) => {
            const {updateAnswer, updateSectionValidity, question, validator} = this.props;
            updateAnswer(question.id, question.question_type, value);
            updateSectionValidity(question.section_id, question.id, validator(value));
            this.handlePossibilityDependencyCaching(value);
            this.props.notifyChange(question.id);
        };

        getAnswer() {
            const answer = this.props.answers[this.props.question.id];
            return answer && answer.value;
        }

        /** Store checked possibility id to easily show Questions according to their dependency_id_dep */
        handlePossibilityDependencyCaching(value) {
            const {addCheckedPossbility, removeCheckedPossbility, question} = this.props;
            if (!isDependable(question)) return;
            if (value) {
                const possibility = question.possibilities.find(p => p.label === value);
                addCheckedPossbility(question.id, possibility.id);
            } else {
                removeCheckedPossbility(question.id);
            }
        }
    }

    const state2Props = (state, props) => ({
        messages: state.formAnswer.messages,
        notifyChange: state.formAnswer.notifyChange,
        answers: state.formAnswer.answers,
        isValid: (state.formAnswer.sectionsValidity[props.question.section_id] || [])[props.question.id]
    });

    const dispatch2Props = (dispatch) => ({
        removeAnswer: (qId) => dispatch(formAction.removeAnswer(qId)),
        updateAnswer: (qId, qType, value) => dispatch(formAction.updateAnswer(qId, qType, value)),
        updateSectionValidity: (sId, qId, validator) => dispatch(formAction.updateSectionValidity(sId, qId, validator)),
        addCheckedPossbility: (qId, pId) => dispatch(formAction.addCheckedPossbility(qId, pId)),
        removeCheckedPossbility: (qId) => dispatch(formAction.removeCheckedPossbility(qId)),
    });

    return connect(state2Props, dispatch2Props)(QuestionWrapper);
}