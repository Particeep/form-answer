import "./Form.scss";

import React, {Component} from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import Section from "./Section/Section";
import {connect} from "react-redux";
import formAction from "./formAction";

class Form extends Component {

    render() {
        return (
            <ExpensionStepper onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label="label!" component={<Section section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    componentWillMount() {
        this.props.dispatch(formAction.init({
            notifyChange: this.notifyChange,
            dateFormat: this.props.dateFormat,
            messages: this.props.messages,
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

    end = () => {
        this.props.onEnd(this.props.answers);
    }
}

function state2Props(state) {
    return {
        answers: state.form.answers,
    }
}

export default connect(state2Props)(Form);