import "./Form.scss";

import * as React from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import {SectionComponent} from "./Section";
import {connect} from "react-redux";
import {formAction} from "./formAction";
import {isFunction} from "../utils/common";
import {ApiParser} from "../utils/ApiParser";
import {Id} from "../types/Id";
import {Answer} from "../types/Answer";
import {QuestionId, QuestionType} from "../types/Question";
import {SectionId} from "../types/Section";
import {Doc} from "../types/Doc";
import {Form} from "../types/Form";
import {Messages} from "../types/Messages";

export interface FormProps {
    readonly: boolean;
    form: Form;
    dateFormat: string;
    messages: Messages;
    maxUploadFileSize: number;
    dispatch: any;
    answers: any;
    onChange: any;
    onSectionEnd: any;
    onEnd: any;
    onUploadFile: any;
}

class FormComponent extends React.Component<FormProps, any> {

    private parser: ApiParser;

    render() {
        return (
            <ExpensionStepper free={this.props.readonly} onNext={this.next} onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label={s.name} component={<SectionComponent section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    componentWillMount() {
        this.parser = new ApiParser(this.props.dateFormat);
        this.initReducer();
        this.initAnswers();
    }

    private initReducer() {
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

    private initAnswers() {
        this.props.form.sections.forEach(s => s.questions.forEach(q => {
            if (q.question_type === QuestionType.LABEL) return;
            this.props.dispatch(formAction.updateAnswer(
                q.id,
                q.question_type,
                this.parser.fromApi(q.question_type)(q.answers)
            ))
        }));
    }

    private onUploadFile = (sectionId: SectionId, questionId: QuestionId, file: File) => {
        const {dispatch, onUploadFile} = this.props;
        onUploadFile(file, this.onFileUploaded(sectionId, questionId));
        dispatch(formAction.documentUploading(questionId, true));
    };

    private onFileUploaded = (sectionId: SectionId, questionId: QuestionId) => (uploadedFile: Doc) => {
        const {dispatch} = this.props;
        dispatch(formAction.documentUploading(questionId, false));
        dispatch(formAction.updateAnswer(questionId, QuestionType.DOCUMENT, [uploadedFile.name, uploadedFile.permalink]));
        dispatch(formAction.updateSectionValidity(sectionId, questionId, true));
        this.onChange(questionId);
    };

    private onChange = (questionIdAnswered: QuestionId) => {
        if (!isFunction(this.props.onChange)) return;
        setTimeout(() =>
            this.props.onChange(this.parseAnswer(questionIdAnswered, this.props.answers[questionIdAnswered]))
        );
    };

    private next = (sectionIndex: number) => {
        if (!isFunction(this.props.onSectionEnd)) return;
        this.props.onSectionEnd(this.parseAnswers(this.getSectionAnswers(sectionIndex)));
    };

    private end = () => {
        const {form, answers, onSectionEnd, onEnd} = this.props;
        if (isFunction(onSectionEnd))
            onSectionEnd(this.parseAnswers(this.getSectionAnswers(form.sections.length - 1)));
        if (isFunction(onEnd))
            onEnd(this.parseAnswers(answers));
    };

    private getSectionAnswers(sectionIndex: number): { [key: string]: Answer[] } {
        const {answers} = this.props;
        const sectionQuestionIds = this.props.form.sections[sectionIndex].questions.map(q => q.id);
        return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
            obj[key] = answers[key];
            return obj;
        }, {});
    }

    private parseAnswers = (answers: { [key: string]: Answer[] }): Answer[] => {
        return Object.keys(answers).map((k: Id) => this.parseAnswer(k, answers[k])).filter((v: any) => v);
    };

    private parseAnswer = (id: Id, answer: any): Answer | null => {
        const value = this.parser.toApi(answer.type)(answer.value);
        if (value)
            return {question_id: id, answer: value}
    };
}

const state2Props = (state: any) => ({
    answers: state.formAnswer.answers,
});

export default connect(state2Props)(FormComponent);