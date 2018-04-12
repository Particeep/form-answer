import "./Form.scss";

import * as React from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import {Section} from "./Section";
import {connect} from "react-redux";
import {formAction} from "./formAction";
import {isFunction} from "../utils/common";
import {ApiParser} from "../utils/ApiParser";
import {questionType} from "./Question/QuestionType";
import {Id} from "../model/Id";
import {Answer} from "../model/Answer";
import {QuestionId} from "../model/Question";
import {SectionId} from "../model/Section";
import {Doc} from "../model/Doc";

export interface FormProps {
    readonly: boolean;
    form: any;
    dateFormat: string;
    messages: any;
    maxUploadFileSize: any;
    dispatch: any;
    answers: any;
    onChange: any;
    onSectionEnd: any;
    onEnd: any;
    onUploadFile: any;
}

class Form extends React.Component<FormProps, any> {

    private parser: ApiParser;

    render() {
        return (
            <ExpensionStepper free={this.props.readonly} onNext={this.next} onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label={s.name} component={<Section section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    componentWillMount() {
        this.parser = new ApiParser(this.props.dateFormat);
        this.initReducer();
        this.initAnswers();
    }

    initReducer() {
        const {
            dispatch,
            dateFormat,
            messages,
            maxUploadFileSize,
            readonly,
        } = this.props;
        dispatch(formAction.init({
            dateFormat: dateFormat,
            messages: messages,
            maxUploadFileSize: maxUploadFileSize,
            notifyChange: this.onChange,
            onUploadFile: this.onUploadFile,
            readonly: readonly || false,
        }));
    }

    initAnswers() {
        this.props.form.sections.forEach(s => s.questions.forEach(q => {
            if (q.question_type === questionType.LABEL) return;
            this.props.dispatch(formAction.updateAnswer(
                q.id,
                q.question_type,
                this.parser.fromApi(q.question_type)(q.answers)
            ))
        }));
    }

    onUploadFile = (sectionId: SectionId, questionId: QuestionId, file: File) => {
        const {dispatch, onUploadFile} = this.props;
        onUploadFile(file, this.onFileUploaded(sectionId, questionId));
        dispatch(formAction.documentUploading(questionId, true));
    };

    onFileUploaded = (sectionId: SectionId, questionId: QuestionId) => (uploadedFile: Doc) => {
        const {dispatch} = this.props;
        dispatch(formAction.documentUploading(questionId, false));
        dispatch(formAction.updateAnswer(questionId, questionType.DOCUMENT, [uploadedFile.name, uploadedFile.permalink]));
        dispatch(formAction.updateSectionValidity(sectionId, questionId, true));
        this.onChange(questionId);
    };

    onChange = (questionIdAnswered: QuestionId) => {
        if (!isFunction(this.props.onChange)) return;
        setTimeout(() =>
            this.props.onChange(this.parseAnswer(questionIdAnswered, this.props.answers[questionIdAnswered]))
        );
    };

    next = (sectionIndex: number) => {
        if (!isFunction(this.props.onSectionEnd)) return;
        this.props.onSectionEnd(this.parseAnswers(this.getSectionAnswers(sectionIndex)));
    };

    end = () => {
        const {form, answers, onSectionEnd, onEnd} = this.props;
        if (isFunction(onSectionEnd))
            onSectionEnd(this.parseAnswers(this.getSectionAnswers(form.sections.length - 1)));
        if (isFunction(onEnd))
            onEnd(this.parseAnswers(answers));
    };

    getSectionAnswers(sectionIndex: number): { [key: string]: Answer[] } {
        const {answers} = this.props;
        const sectionQuestionIds = this.props.form.sections[sectionIndex].questions.map(q => q.id);
        return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
            obj[key] = answers[key];
            return obj;
        }, {});
    }

    parseAnswers = (answers: { [key: string]: Answer[] }): Answer[] => {
        return Object.keys(answers).map((k: Id) => this.parseAnswer(k, answers[k])).filter((v: any) => v);
    };

    parseAnswer = (id: Id, answer: any): Answer | null => {
        const value = this.parser.toApi(answer.type)(answer.value);
        if (value)
            return {question_id: id, answer: value}
    };
}

const state2Props = (state: any) => ({
    answers: state.formAnswer.answers,
});

export default connect(state2Props)(Form);