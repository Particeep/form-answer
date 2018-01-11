import "./Form.scss";

import React, {Component} from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import Section from "./Section/Section";
import {connect} from "react-redux";
import formAction from "./formAction";

class Form extends Component {

    render() {
        return (
            <ExpensionStepper onNext={this.next} onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label="label!" component={<Section section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    componentWillMount() {
        this.props.dispatch(formAction.init({
            dateFormat: this.props.dateFormat,
            messages: this.props.messages,
            maxUploadFileSize: this.props.maxUploadFileSize,
            notifyChange: this.notifyChange,
            onUploadFile: this.onUploadFile,
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
        dispatch(formAction.updateAnswer(questionId, [uploadedFile.name, uploadedFile.permalink]));
        dispatch(formAction.updateSectionValidity(sectionId, questionId, true));
    };

    notifyChange = (questionIdAnswered) => {
        setTimeout(() => this.props.onChange(
            {[questionIdAnswered]: this.props.answers[questionIdAnswered]},
            this.props.answers,
        ));
    };

    next = (sectionIndex) => {
        this.props.onSectionEnd(this.getSectionAnswers(sectionIndex));
    };

    end = () => {
        this.props.onSectionEnd(this.getSectionAnswers(this.props.form.sections.length - 1));
        this.props.onEnd(this.props.answers);
    };

    getSectionAnswers(sectionIndex) {
        const {answers} = this.props;
        const sectionQuestionIds = this.props.form.sections[sectionIndex].questions.map(q => q.id);
        return Object.keys(answers).filter(key => sectionQuestionIds.includes(key)).reduce((obj, key) => {
            obj[key] = answers[key];
            return obj;
        }, {});
    }
}

const state2Props = (state) => ({
    answers: state.form.answers,
});

export default connect(state2Props)(Form);