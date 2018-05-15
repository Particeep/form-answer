import "./Question.scss";

import * as React from "react";
import {connect} from "react-redux";
import QuestionText from "./Text/QuestionText";
import QuestionLongText from "./LongText/QuestionLongText";
import QuestionRadio from "./Radio/QuestionRadio";
import QuestionSelect from "./Select/QuestionSelect";
import QuestionCheckbox from "./Checkbox/QuestionCheckbox";
import QuestionDate from "./Date/QuestionDate";
import QuestionDocument from "./Document/QuestionDocument";
import * as Moment from "moment";
import {IQuestion, QuestionType} from "../../types/Question";
import QuestionAutocomplete from "./Autocomplete/QuestionAutocomplete";

const maxPossibilitiesBeforeAutocomplete = 10;

interface QuestionProps {
    readonly: boolean;
    dateFormat: string;
    question: IQuestion;
}

class Question extends React.Component<QuestionProps, any> {

    render() {
        const {question} = this.props;
        if (!question.possibilities) question.possibilities = [];
        return (
            <main className={`Question Question-${question.id}`}>
                <div className="Question_label">
                    {question.label}
                    {question.required && <span className="Question_required">*</span>}
                </div>
                <div className="Question_description">
                    {question.description}
                </div>
                <div className="Question_answer">{this.renderQuestion(question)}</div>
            </main>
        );
    }

    renderQuestion(q: IQuestion) {
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
                if (q.possibilities.length < maxPossibilitiesBeforeAutocomplete)
                    return <QuestionRadio
                        {...props}
                        validator={this.isRadioValid}
                    />;
                return <QuestionAutocomplete
                    {...props}
                    validator={this.isRadioValid}
                />;

            case QuestionType.SELECT:
                if (q.possibilities.length < maxPossibilitiesBeforeAutocomplete)
                    return <QuestionSelect
                        {...props}
                        validator={this.isSelectValid}
                    />;
                return <QuestionAutocomplete
                    {...props}
                    validator={this.isSelectValid}
                />;

            case QuestionType.CHECKBOX:
                if (q.possibilities.length < maxPossibilitiesBeforeAutocomplete)
                    return <QuestionCheckbox
                        {...props}
                        validator={this.isCheckboxValid}
                    />;
                return <QuestionAutocomplete
                    multiSelect
                    {...props}
                    validator={this.isCheckboxValid}
                />;

            case QuestionType.DATE:
                if (this.props.dateFormat)
                    return <QuestionDate
                        {...props}
                        dateFormat={this.props.dateFormat}
                        validator={this.isDateValid}
                    />;
                return <QuestionText
                    {...props}
                    validator={this.isDateValid}
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

export default connect(state2Props)(Question)