import "./Question.scss";

import React, {Component} from "react";
import {connect} from "react-redux";
import QuestionText from "./Text/QuestionText";
import QuestionLongText from "./LongText/QuestionLongText";
import QuestionRadio from "./Radio/QuestionRadio";
import QuestionSelect from "./Select/QuestionSelect";
import QuestionCheckbox from "./Checkbox/QuestionCheckbox";

const questionType = {
    TEXT: 'TEXT',
    LONGTEXT: 'LONGTEXT',
    DATE: 'DATE',
    NUMBER: 'NUMBER',
    RADIO: 'RADIO',
    SELECT: 'SELECT',
    CHECKBOX: 'CHECKBOX',
    DOCUMENT: 'DOCUMENT',
    LABEL: 'LABEL',
};

class Question extends Component {

    render() {
        const {question} = this.props;
        return (
            <main className="Question">
                <label className="Question_label">
                    {question.label}
                    {question.required && <span className="Question_required">*</span>}
                </label>
                <div className="Question_answer">{this.renderQuestion(question)}</div>
            </main>
        );
    }

    renderQuestion(q) {
        switch (q.question_type) {
            case questionType.TEXT:
                return <QuestionText question={q}/>;
            case questionType.LONGTEXT:
                return <QuestionLongText question={q}/>;
            case questionType.RADIO:
                return <QuestionRadio question={q}/>;
            case questionType.SELECT:
                return <QuestionSelect question={q}/>;
            case questionType.CHECKBOX:
                return <QuestionCheckbox question={q}/>;
            default:
                return <QuestionText question={q}/>;
        }
    }
}

const state2Props = (state, props) => ({
    answers: state.form.answers,
});

export default connect(state2Props)(Question)