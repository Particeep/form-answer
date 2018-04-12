import "./Question.scss";

import * as React from 'react';
import {connect} from "react-redux";
import QuestionText from "./Text/QuestionText";
import QuestionLongText from "./LongText/QuestionLongText";
import QuestionRadio from "./Radio/QuestionRadio";
import QuestionSelect from "./Select/QuestionSelect";
import QuestionCheckbox from "./Checkbox/QuestionCheckbox";
import QuestionDate from "./Date/QuestionDate";
import QuestionDocument from "./Document/QuestionDocument";
import * as Moment from 'moment';
import {Question, QuestionType} from "../../model/Question";

export const maxPossibilitiesBeforeAutocomplete = 10;

interface QuestionProps {
    readonly: boolean;
    dateFormat: string;
    question: Question;
}

class QuestionComponent extends React.Component<QuestionProps, any> {

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

    renderQuestion(q: Question) {
        const props = {question: q, readonly: this.props.readonly};
        switch (q.question_type) {
            case QuestionType.TEXT:
                return <QuestionText
                    {...props}
                    validator={this.isTextValid}
                />;

            case QuestionType.LONGTEXT:
                return <QuestionLongText
                    {...props}
                    validator={this.isTextValid}
                />;

            case QuestionType.RADIO:
                return <QuestionRadio
                    {...props}
                    validator={this.isRadioValid}
                />;

            case QuestionType.SELECT:
                return <QuestionSelect
                    {...props}
                    validator={this.isSelectValid}
                />;

            case QuestionType.CHECKBOX:
                return <QuestionCheckbox
                    {...props}
                    validator={this.isCheckboxValid}
                />;

            case QuestionType.DATE:
                return <QuestionDate
                    {...props}
                    validator={this.isDateValid}
                    dateFormat={this.props.dateFormat}
                />;

            case QuestionType.DOCUMENT:
                return <QuestionDocument
                    {...props}
                    validator={this.isDocumentValid}
                />;

            case QuestionType.LABEL:
                return '';

            default:
                return <QuestionText
                    {...props}
                    validator={this.isTextValid}
                />;
        }
    }

    isSelectValid = (value: string): boolean => {
        return this.isRadioValid(value);
    };

    isRadioValid = (value: string): boolean => {
        return !this.props.question.required || value !== '';
    };

    isTextValid = (value: string): boolean => {
        const {question} = this.props;
        if (question.required && (!value || value === '')) return false;
        return !question.pattern || new RegExp(question.pattern).test(value);
    };

    isCheckboxValid = (values: string[]): boolean => {
        return !this.props.question.required || values.length > 0;
    };

    isDateValid = (value: string): boolean => {
        if (!this.props.question.required && (!value || value === '')) return true;
        return Moment(value, this.props.dateFormat.toUpperCase(), true).isValid()
    };

    isDocumentValid = (value: string): boolean => {
        return !this.props.question.required || value.length === 2;
    }
}

const state2Props = (state, props) => ({
    answers: state.formAnswer.answers,
    readonly: state.formAnswer.readonly,
    dateFormat: state.formAnswer.dateFormat || '',
});

export default connect(state2Props)(QuestionComponent)