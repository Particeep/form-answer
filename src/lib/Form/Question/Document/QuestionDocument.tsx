import './QuestionDocument.scss';

import * as React from 'react';
import {Avatar, Button, Chip, CircularProgress, Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import {mapMultipleValueProps, MappedQuestionProps} from '../question-wrappers';
import QuestionDocumentReadonly from './QuestionDocumentReadonly';
import {IQuestion} from '../../../types/Question';
import {IMessages} from '../../../types/Messages';
import {IDoc} from '../../../types/Doc';
import {formAction} from '../../form.action';

interface Props extends MappedQuestionProps {
  readonly documentName: string;
  readonly documentUrl: string;
  readonly onUploadFile: (f: File, callback: (uploadedFile: IDoc) => void) => void;
  readonly maxUploadFileSize: number;
  readonly isUploading: boolean;
  readonly messages: IMessages;
  readonly dispatch: any;
}

interface State {
  errorMessage: string;
  isUploading: boolean;
}

class QuestionDocument extends React.Component<Props, State> {

  private fileInput: HTMLInputElement;

  state: State = {
    errorMessage: null,
    isUploading: false,
  };

  render() {
    const {documentName, documentUrl, messages, isValid, readonly} = this.props;
    const {isUploading} = this.state;
    if (readonly) return <QuestionDocumentReadonly
      documentName={documentName}
      documentUrl={documentUrl}
      messages={messages}
      isValid={isValid}/>;

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
        <Button color="primary" variant="outlined" onClick={this.openFileSelection}>
          {messages.upload}
          <Icon className="QuestionDocument_btn_i">file_upload</Icon>
          <input style={{display: 'none'}} type="file" ref={file => this.fileInput = file}
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

  private openFileSelection = () => {
    this.fileInput.click();
  };

  private handleChange = (file: File) => {
    const {question, messages, maxUploadFileSize, onChange, onUploadFile} = this.props;
    if (!new RegExp(question.pattern).test(file.name)) {
      this.setState({errorMessage: file.name + ': ' + messages.invalidPattern});
      return;
    }
    if (maxUploadFileSize && file.size > maxUploadFileSize * 1024 * 1024) {
      this.setState({errorMessage: messages.invalidFileSize});
      return;
    }
    this.setState({errorMessage: '', isUploading: true});
    onChange([file.name]);
    onUploadFile(file, this.uploadedCallback);
  };

  private uploadedCallback = (uploadedFile: IDoc) => {
    const {dispatch, question} = this.props;
    this.setState({isUploading: false});
    dispatch(formAction.updateAnswer(question.id, [uploadedFile.name, uploadedFile.permalink]));
    dispatch(formAction.updateSectionValidity(question.section_id, question.id, true));
  };

  private clear = () => {
    this.props.onChange([]);
  };
}

const state2Props = (state) => ({
  onUploadFile: state.formAnswer.onUploadFile,
  maxUploadFileSize: state.formAnswer.maxUploadFileSize,
});

const mapValueProps = (Component: any) => (props: MappedQuestionProps) => {
  const {value, ...other} = props;
  const documentName = value[0];
  const documentUrl = value[1];
  return <Component {...other} documentName={documentName} documentUrl={documentUrl}/>;
};

const isValid = (question: IQuestion, value: string): boolean => !question.required || value.length === 2;

export default mapMultipleValueProps(isValid)(mapValueProps(connect(state2Props)(QuestionDocument)));
