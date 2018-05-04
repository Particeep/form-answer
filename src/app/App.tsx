import * as React from "react";
import {Form} from "../lib/Form";
import {IAnswer} from "../lib/types/Answer";
import {IDoc} from "../lib/types/Doc";
import {defaultMuiTheme} from "../lib/conf/mui-theme";

interface FormAnswerParams {
    form: any;
    messages: any;
    dateFormat: string;
    maxUploadFileSize: number;
    muiTheme: any;
    readonly: boolean;
    onChange: (a: IAnswer) => void;
    onSectionEnd: (a: IAnswer[]) => void;
    onEnd: (a: IAnswer[]) => void;
    onUploadFile: (file: File, callback: (d: IDoc) => void) => void;
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
            <Form
                form={getFormAnswerParams().form}
                messages={getFormAnswerParams().messages}
                dateFormat={getFormAnswerParams().dateFormat}
                maxUploadFileSize={getFormAnswerParams().maxUploadFileSize}
                readonly={getFormAnswerParams().readonly}
                muiTheme={defaultMuiTheme}
                onChange={this.changed}
                onSectionEnd={this.sectionEnded}
                onEnd={this.ended}
                onUploadFile={this.uploadFile}/>
        );
    }

    private uploadFile = (file: File, callback: any): void => {
        if (getFormAnswerParams().onUploadFile)
            getFormAnswerParams().onUploadFile(file, callback);
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

export default App;