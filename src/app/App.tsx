import * as React from 'react';
import {Form} from '../lib/Form';
import {IAnswer} from '../lib/types/Answer';
import {IDoc} from '../lib/types/Doc';
import {store} from './store';
import {connect} from 'react-redux';
import {appAction} from './app.action';
import {IForm} from '../lib/types/Form';
import {IMessages} from '../lib/types/Messages';
import {defaultMuiPalette, IMuiPalette} from "../lib/types/MuiPalette";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {defaultMuiTheme} from '../lib/conf/mui-theme';

interface FormAnswerParams {
  form: any;
  messages: IMessages;
  muiPalette: IMuiPalette;
  lang: string;
  dateFormat: string;
  maxUploadFileSize: number;
  readonly: boolean;
  scrollOffset: number;
  onChange: (a: IAnswer) => void;
  onSectionEnd: (a: IAnswer[]) => void;
  onEnd: (a: IAnswer[]) => void;
  onUploadFile: (file: File, callback: (d: IDoc) => void) => void;
  onRemoveFile: (id: string) => void;
}

interface AppParams {
  form: IForm;
  setForm: (f: object) => void;
}

function getFormAnswerParams(): FormAnswerParams {
  return (window as any)['formAnswer'];
}

getFormAnswerParams()['updateForm'] = (form) => {
  store.dispatch({type: appAction.SET, form});
};

class App extends React.Component<AppParams> {

  getMuiPalette = (): IMuiPalette => {
    if (getFormAnswerParams().muiPalette) {
      return getFormAnswerParams().muiPalette;
    } else {
      return defaultMuiPalette
    }
  }

  render() {
    if (!getFormAnswerParams().form) {
      console.error('No form passed in object \'window["formAnswer"].form\'');
      return <div>No form passed in object 'getFormAnswerParams.form'</div>;
    }
    if (!this.props.form) return <div/>;
    return (
      <MuiThemeProvider theme={createMuiTheme(defaultMuiTheme(this.getMuiPalette()))}>
        <Form
          form={this.props.form}
          lang={getFormAnswerParams().lang}
          messages={getFormAnswerParams().messages}
          dateFormat={getFormAnswerParams().dateFormat}
          scrollOffset={getFormAnswerParams().scrollOffset}
          maxUploadFileSize={getFormAnswerParams().maxUploadFileSize}
          readonly={getFormAnswerParams().readonly}
          onChange={this.changed}
          onSectionEnd={this.sectionEnded}
          onEnd={this.ended}
          onUploadFile={this.uploadFile}
          onRemoveFile={this.removeFile}/>
      </MuiThemeProvider>
    );
  }

  componentWillMount() {
    this.props.setForm(getFormAnswerParams().form);
  }

  private uploadFile = (file: File, callback: (_: IDoc) => void): void => {
    if (getFormAnswerParams().onUploadFile)
      getFormAnswerParams().onUploadFile(file, callback);
  };

  private removeFile = (id: string): void => {
    if (getFormAnswerParams().onRemoveFile)
      getFormAnswerParams().onRemoveFile(id);
  };

  private changed = (answer: any): void => {
    if (getFormAnswerParams().onChange)
      getFormAnswerParams().onChange(answer);
  };

  private sectionEnded = (sectionAnswers: any[]): void => {
    if (getFormAnswerParams().onSectionEnd)
      getFormAnswerParams().onSectionEnd(sectionAnswers);
  };

  private ended = (answers: any[]): void => {
    if (getFormAnswerParams().onEnd)
      getFormAnswerParams().onEnd(answers);
  };
}

const state2Props = (state: any) => ({
  form: state.app.form,
});

const dispatch2Props = (dispatch) => ({
  setForm: (f: IForm) => dispatch(appAction.set(f)),
});

export default connect(state2Props, dispatch2Props)(App);
