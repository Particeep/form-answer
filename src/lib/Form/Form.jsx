import "./Form.scss";

import React, {Component} from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import {Section} from "./Section";
import {connect} from "react-redux";
import {formAction} from "./formAction";
import {isFunction} from "./utils";
import {ApiParser} from "./api-parser";
import {questionType} from "./Question";

class Form extends Component {

    render() {
        return (
            <ExpensionStepper onNext={this.next} onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label={s.name} component={<Section section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    constructor(props) {
        super(props);
        this.parser = new ApiParser(this.props.dateFormat)
    }

    componentWillMount() {
        this.props.dispatch(formAction.init({
            dateFormat: this.props.dateFormat,
            messages: this.props.messages,
            maxUploadFileSize: this.props.maxUploadFileSize,
            notifyChange: this.onChange,
            onUploadFile: this.onUploadFile,
        }));
        this.initAnswers();
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

    onUploadFile = (sectionId, questionId, file) => {
        const {dispatch, onUploadFile} = this.props;
        onUploadFile(file, this.onFileUploaded(sectionId, questionId));
        dispatch(formAction.documentUploading(questionId, true));
    };

    onFileUploaded = (sectionId, questionId) => uploadedFile => {
        const {dispatch} = this.props;
        dispatch(formAction.documentUploading(questionId, false));
        dispatch(formAction.updateAnswer(questionId, questionType.DOCUMENT, [uploadedFile.name, uploadedFile.permalink]));
        dispatch(formAction.updateSectionValidity(sectionId, questionId, true));
    };

    onChange = (questionIdAnswered) => {
        if (!isFunction(this.props.onChange)) return;
        setTimeout(() =>
            this.props.onChange(this.parseAnswer(questionIdAnswered, this.props.answers[questionIdAnswered]))
        );
    };

    next = (sectionIndex) => {
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

    getSectionAnswers(sectionIndex) {
        const {answers} = this.props;
        const sectionQuestionIds = this.props.form.sections[sectionIndex].questions.map(q => q.id);
        return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
            obj[key] = answers[key];
            return obj;
        }, {});
    }

    parseAnswers = (answers) => {
        return Object.keys(answers).map(k => this.parseAnswer(k, answers[k])).filter(v => v);
    };

    parseAnswer = (id, answer) => {
        const value = this.parser.toApi(answer.type)(answer.value);
        if (value)
            return {question_id: id, answer: value}
    };
}

const state2Props = (state) => ({
    answers: state.formAnswer.answers,
});

export default connect(state2Props)(Form);