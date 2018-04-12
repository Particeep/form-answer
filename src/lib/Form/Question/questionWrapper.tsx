import * as React from "react";
import {formAction} from "../formAction";
import {connect} from "react-redux";
import {isDependable, Question, QuestionId, QuestionType} from "../../types/Question";
import {Possibility, PossiblityId} from "../../types/Possiblity";
import {SectionId} from "../../types/Section";
import {Subtract} from "utility-types";
import {Messages} from "../../types/Messages";

export interface QuestionProps {
    readonly: boolean;
    question: Question;
    messages: Messages,
    isValid: boolean;
    multiline: boolean,
    rows: number,
    rowsMax: number,
    onChange: (value: string) => void;
    value: string;
    answers: { [key: string]: any },
}

export const questionWrapper = <P extends QuestionProps>(WrappedQuestion: React.ComponentType<P>) => {

    interface Props {
        multiline: boolean,
        rows: number,
        rowsMax: number,
        readonly: boolean;
        dateFormat: string;
        question: Question;
        validator: any;
        messages: Messages,
        notifyChange: any,
        answers: { [key: string]: any },
        isValid: boolean;
        removeAnswer: (qId: QuestionId) => void;
        updateAnswer: (qId: QuestionId, qType: QuestionType, value: any) => void;
        updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => void;
        addCheckedPossbility: (qId: QuestionId, pId: PossiblityId) => void;
        removeCheckedPossbility: (qId: QuestionId) => void;
    }

    class QuestionWrapper extends React.Component<Subtract<P, QuestionProps> & Props, {}> {

        render() {
            return <WrappedQuestion
                readonly={this.props.readonly}
                question={this.props.question}
                messages={this.props.messages}
                isValid={this.props.isValid}
                multiline={this.props.multiline}
                rows={this.props.rows}
                rowsMax={this.props.rowsMax}
                answers={this.props.answers}
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
            // this.props.notifyChange(question.id);
        };

        getAnswer() {
            const answer = this.props.answers[this.props.question.id];
            return answer && answer.value;
        }

        /** Store checked possibility id to easily show Questions according to their dependency_id_dep */
        handlePossibilityDependencyCaching(value?: string) {
            const {addCheckedPossbility, removeCheckedPossbility, question} = this.props;
            if (!isDependable(question)) return;
            if (value) {
                const possibility = question.possibilities.find((p: Possibility) => p.label == value);
                removeCheckedPossbility(question.id);
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
        removeAnswer: (qId: QuestionId) => dispatch(formAction.removeAnswer(qId)),
        updateAnswer: (qId: QuestionId, qType: QuestionType, value: any) => dispatch(formAction.updateAnswer(qId, qType, value)),
        updateSectionValidity: (sId: SectionId, qId: QuestionId, validator) => dispatch(formAction.updateSectionValidity(sId, qId, validator)),
        addCheckedPossbility: (qId: QuestionId, pId: PossiblityId) => dispatch(formAction.addCheckedPossbility(qId, pId)),
        removeCheckedPossbility: (qId: QuestionId) => dispatch(formAction.removeCheckedPossbility(qId)),
    });

    return connect(state2Props, dispatch2Props)(QuestionWrapper);
};