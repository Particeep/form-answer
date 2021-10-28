import './QuestionDocument.scss';

import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {mapMultipleValueProps, MappedQuestionProps} from '../question-wrappers';
import QuestionDocumentReadonly from './QuestionDocumentReadonly';
import {IQuestion} from '../../../types/Question';
import {IMessages} from '../../../types/Messages';
import {IDoc} from '../../../types/Doc';
import {useState} from "react";
import {FormAnswerState} from "../../form.reducer";
import formAnswerAction from "../../form.action";

interface Props extends MappedQuestionProps {
  readonly documentId: string;
  readonly documentName: string;
  readonly documentUrl: string;
  readonly messages: IMessages;
}

const QuestionDocument  = (props: Props) => {

  const dispatch = useDispatch()

  let fileInput: HTMLInputElement;

  const [errorMessage, setErrorMessage] = useState()
  const [isUploading, setIsUploading] = useState()

  const formState: FormAnswerState = useSelector((state: any) => state.formAnswer)
  const {onUploadFile, onRemoveFile, maxUploadFileSize} = formState

  const {question, onChange, messages, isValid, readonly, value} = props;
  const { documentId, documentName, documentUrl} = mapValueProps(value)

  const openFileSelection = () => {
    fileInput.click();
  };

  const handleChange = (file: File) => {
    if (!new RegExp(question.pattern, 'i').test(file.name)) {
      setErrorMessage(file.name + ': ' + messages.invalidPattern)
      return;
    }
    if (maxUploadFileSize && file.size > maxUploadFileSize * 1024 * 1024) {
      setErrorMessage(messages.invalidFileSize)
      return;
    }
    setIsUploading(true)
    setErrorMessage('')
    onChange([file.name]);
    onUploadFile(file, uploadedCallback);
  };

  const uploadedCallback = (uploadedFile: IDoc) => {
    setIsUploading(false)
    dispatch(formAnswerAction.updateAnswer(question.id, [uploadedFile.id, uploadedFile.name, uploadedFile.permalink]))
    dispatch(formAnswerAction.updateSectionValidity(question.section_id, question.id, true))
  };

  const clear = () => {
    onChange([]);
    if (onRemoveFile)
      onRemoveFile(documentId)
  };

  if (readonly) return (
    <QuestionDocumentReadonly
      documentName={documentName}
      documentUrl={documentUrl}
      messages={messages}
      isValid={isValid}/>
  )

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
        <Button color="primary" variant="outlined" onClick={openFileSelection}>
          {messages.upload}
          <Icon className="QuestionDocument_btn_i">file_upload</Icon>
          <input style={{display: 'none'}} type="file" ref={file => fileInput = file}
                 onChange={e => handleChange(e.target.files[0])}/>
        </Button>
        }

        {documentUrl && !isUploading &&
        <Chip
          className="QuestionDocument_doc" label={documentName}
          onDelete={clear} onClick={() => window.open(documentUrl, '_blank')}
          avatar={
            <Avatar>
              <Icon className="QuestionDocument_doc_i">insert_drive_file</Icon>
            </Avatar>
          }
        />
        }

        {errorMessage &&
        <div className="QuestionDocument_error">
          <Icon className="QuestionDocument_error_i">warning</Icon>
          {errorMessage}
          <Icon className="QuestionDocument_error_clear" onClick={() => setErrorMessage('')}>clear</Icon>
        </div>
        }
      </main>
    );
}

const mapValueProps = (value: any) => {
  const documentId = value[0]
  const documentName = value[1];
  const documentUrl = value[2];
  return {documentId, documentName, documentUrl}
};

const isValid = (question: IQuestion, value: string): boolean => !question.required || value.length === 3;

export default mapMultipleValueProps(isValid)(QuestionDocument);
