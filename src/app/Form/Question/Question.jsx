import "./Question.scss";

import React, {Component} from "react";
import {connect} from "react-redux";
import QuestionText from "./Text/QuestionText";
import QuestionLongText from "./LongText/QuestionLongText";
import QuestionRadio from "./Radio/QuestionRadio";
import QuestionSelect from "./Select/QuestionSelect";
import QuestionCheckbox from "./Checkbox/QuestionCheckbox";
import QuestionDate from "./Date/QuestionDate";
import QuestionDocument from "./Document/QuestionDocument";
import {mapSingleAnswer} from "../utils";

export const questionType = {
    TEXT: 'TEXT',
    LONGTEXT: 'LONGTEXT',
    DATE: 'DATE',
    RADIO: 'RADIO',
    SELECT: 'SELECT',
    CHECKBOX: 'CHECKBOX',
    DOCUMENT: 'DOCUMENT',
    LABEL: 'LABEL',
};

export const maxPossibilitiesBeforeAutocomplete = 10;

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
                return <QuestionText
                    question={q}
                    validator={this.isTextValid}
                />;

            case questionType.LONGTEXT:
                return <QuestionLongText
                    question={q}
                    validator={this.isTextValid}
                />;

            case questionType.RADIO:
                return <QuestionRadio
                    question={q}
                    validator={this.isRadioValid}
                />;

            case questionType.SELECT:
                return <QuestionSelect
                    question={q}
                    validator={this.isSelectValid}
                />;

            case questionType.CHECKBOX:
                return <QuestionCheckbox
                    question={q}
                    validator={this.isCheckboxValid}
                />;

            case questionType.DATE:
                return <QuestionDate
                    question={q}
                    validator={this.isDateValid}
                    dateFormat={this.props.dateFormat}
                />;

            case questionType.DOCUMENT:
                return <QuestionDocument question={q}/>;

            case questionType.LABEL:
                return '';

            default:
                return <QuestionText
                    question={q}
                    validator={this.isTextValid(q)}
                />;
        }
    }

    isSelectValid = values => {
        return this.isRadioValid(values);
    };

    isRadioValid = values => {
        const value = mapSingleAnswer(values);
        return !this.props.question.required || (!!value && value !== '');
    };

    isTextValid = values => {
        const {question} = this.props;
        const value = mapSingleAnswer(values);
        if (question.required && (!value || value === '')) return false;
        return !question.pattern || new RegExp(question.pattern).test(value);
    };

    isCheckboxValid = values => {
        return !this.props.question.required || (!!values && values.length > 0);
    };

    isDateValid = value => {
        const {question} = this.props;
        if (!question.required && (!value || value === '')) return true;
        return !isNaN(new Date(value).getTime())
    };
}

const state2Props = (state, props) => ({
    answers: state.formAnswer.answers,
    dateFormat: state.formAnswer.dateFormat || '',
});

export default connect(state2Props)(Question)