import * as React from 'react';
import {Form} from "../lib/Form";
import {isFunction} from "../lib/utils/common";
import {createMuiTheme, MuiThemeProvider} from "material-ui";
import {defaultMuiTheme} from "../lib/conf/mui-theme";

interface FormAnswerParams {
    form: any;
    messages: any;
    dateFormat: any;
    maxUploadFileSize: any;
    muiTheme: any;
    readonly: any;
    onChange: any;
    onSectionEnd: any;
    onEnd: any;
    onUploadFile: any;
}

function getFormAnswerParams(): FormAnswerParams {
    return (window as any)['formAnswer'];
}

class App extends React.Component {

    render() {
        if (!getFormAnswerParams().form) {
            console.error('No form passed in object \'window["formAnswer"].form\'');
            return <div>No form passed in object 'getFormAnswerParams.form'</div>;
        }
        return (
            <MuiThemeProvider theme={createMuiTheme(getFormAnswerParams().muiTheme || defaultMuiTheme)}>
                <Form
                    form={getFormAnswerParams().form}
                    messages={getFormAnswerParams().messages}
                    dateFormat={getFormAnswerParams().dateFormat}
                    maxUploadFileSize={getFormAnswerParams().maxUploadFileSize}
                    readonly={getFormAnswerParams().readonly}
                    onChange={this.changed}
                    onSectionEnd={this.sectionEnded}
                    onEnd={this.ended}
                    onUploadFile={this.uploadFile}/>
            </MuiThemeProvider>
        );
    }

    uploadFile = (file: File, callback: any): void => {
        if (isFunction(getFormAnswerParams().onUploadFile))
            getFormAnswerParams().onUploadFile(file, callback);
    };

    changed = (answer: any): void => {
        if (isFunction(getFormAnswerParams().onChange))
            getFormAnswerParams().onChange(answer);
    };

    sectionEnded = (sectionAnswers: any[]): void => {
        if (isFunction(getFormAnswerParams().onSectionEnd))
            getFormAnswerParams().onSectionEnd(sectionAnswers);
    };

    ended = (answers: any[]): void => {
        if (isFunction(getFormAnswerParams().onEnd))
            getFormAnswerParams().onEnd(answers);
    };
}

export default App;