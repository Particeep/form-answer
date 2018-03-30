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
import moment from "moment";
import {questionType} from "./QuestionType";

export const maxPossibilitiesBeforeAutocomplete = 10;

class Question extends Component {

    render() {
        const {question} = this.props;
        return (
            <main className="Question">
                <div className="Question_label">
                    {question.label}
                    {question.required && <span className="Question_required">*</span>}
                </div>
                <div className="Question_answer">{this.renderQuestion(question)}</div>
            </main>
        );
    }

    renderQuestion(q) {
        const props = {question: q, readonly: this.props.readonly};
        switch (q.question_type) {
            case questionType.TEXT:
                return <QuestionText
                    {...props}
                    validator={this.isTextValid}
                />;

            case questionType.LONGTEXT:
                return <QuestionLongText
                    {...props}
                    validator={this.isTextValid}
                />;

            case questionType.RADIO:
                return <QuestionRadio
                    {...props}
                    validator={this.isRadioValid}
                />;

            case questionType.SELECT:
                return <QuestionSelect
                    {...props}
                    validator={this.isSelectValid}
                />;

            case questionType.CHECKBOX:
                return <QuestionCheckbox
                    {...props}
                    validator={this.isCheckboxValid}
                />;

            case questionType.DATE:
                return <QuestionDate
                    {...props}
                    validator={this.isDateValid}
                    dateFormat={this.props.dateFormat}
                />;

            case questionType.DOCUMENT:
                return <QuestionDocument
                    {...props}
                    validator={this.isDocumentValid}
                />;

            case questionType.LABEL:
                return '';

            default:
                return <QuestionText
                    {...props}
                    validator={this.isTextValid(q)}
                />;
        }
    }

    isSelectValid = value => {
        return this.isRadioValid(value);
    };

    isRadioValid = value => {
        return !this.props.question.required || value !== '';
    };

    isTextValid = value => {
        const {question} = this.props;
        if (question.required && (!value || value === '')) return false;
        return !question.pattern || new RegExp(question.pattern).test(value);
    };

    isCheckboxValid = values => {
        return !this.props.question.required || values.length > 0;
    };

    isDateValid = value => {
        if (!this.props.question.required && (!value || value === '')) return true;
        return moment(value, this.props.dateFormat.toUpperCase(), true).isValid()
    };

    isDocumentValid = value => {
        return !this.props.question.required || value.length === 2;
    }
}

const state2Props = (state, props) => ({
    answers: state.formAnswer.answers,
    readonly: state.formAnswer.readonly,
    dateFormat: state.formAnswer.dateFormat || '',
});

export default connect(state2Props)(Question)