import "./QuestionDocument.scss";

import React, {Component} from "react";
import {Avatar, Button, Chip, CircularProgress, Icon} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {parseSingleAnswer} from "../../utils";

class QuestionDocument extends Component {

    state = {
        errorMessage: null
    };

    render() {
        const {documentName, documentUrl, messages, isUploading} = this.props;
        return (
            <main className="QuestionDocument">
                {isUploading &&
                <Chip className="QuestionDocument_doc -uploading" label={documentName + '...'} avatar={
                    <Avatar>
                        <CircularProgress size={36} className="QuestionDocument_doc_progress"/>
                        <Icon className="QuestionDocument_doc_i">insert_drive_file</Icon>
                    </Avatar>
                }/>
                }

                {!documentUrl && !isUploading &&
                <Button color="primary" onClick={this.openFileSelection}>
                    {messages.upload}
                    <Icon className="QuestionDocument_btn_i">file_upload</Icon>
                    <input style={{display: 'none'}} type="file" ref="file"
                           onChange={e => this.handleChange(e.target.files[0])}/>
                </Button>
                }

                {documentUrl && !isUploading &&
                <Chip
                    className="QuestionDocument_doc" label={documentName}
                    onDelete={this.clear} onClick={() => window.open(documentUrl, '_blank')}
                    avatar={
                        <Avatar>
                            <Icon className="QuestionDocument_doc_i">insert_drive_file</Icon>
                        </Avatar>
                    }
                />
                }

                {this.state.errorMessage &&
                <div className="QuestionDocument_error">
                    <Icon className="QuestionDocument_error_i">warning</Icon>
                    {this.state.errorMessage}
                    <Icon className="QuestionDocument_error_clear" onClick={() => this.setState({errorMessage: ''})}>clear</Icon>
                </div>
                }
            </main>
        );
    }

    componentDidMount() {
        const {value} = this.props;
        if (value != undefined) this.update(value);
        this.updateValidity();
    }

    openFileSelection = () => {
        this.refs.file.click();
    };

    handleChange = (file) => {
        const {question, messages, maxUploadFileSize} = this.props;
        if (maxUploadFileSize && file.size > maxUploadFileSize * 1024 * 1024) {
            this.setState({errorMessage: messages.invalidFileSize});
            return;
        }
        this.setState({errorMessage: ''});
        this.update(file.name);
        this.props.onUploadFile(question.section_id, question.id, file);
    };

    clear = () => {
        this.update('');
    };

    update(fileName) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateAnswer(question.id, parseSingleAnswer(fileName)));
        this.updateValidity();
    }

    updateValidity() {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, !question.required));
    }
}

const state2Props = (state, props) => {
    const answer = state.formAnswer.answers[props.question.id] || [];
    return {
        documentName: answer[0],
        documentUrl: answer[1],
        onUploadFile: state.formAnswer.onUploadFile,
        messages: state.formAnswer.messages,
        maxUploadFileSize: state.formAnswer.maxUploadFileSize,
        isUploading: state.formAnswer.uploadingDocuments[props.question.id],
    }
};

export default connect(state2Props)(QuestionDocument)