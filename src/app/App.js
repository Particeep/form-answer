import React, {Component} from "react";
import {Form} from "../lib/Form";
import {isFunction} from "../lib/utils/common";

class App extends Component {

    render() {
        if (!window.formAnswer.form) {
            console.error('No form passed in object \'window.formAnswer.form\'');
            return <div>No form passed in object 'window.formAnswer.form'</div>;
        }
        return (
            <Form
                form={window.formAnswer.form}
                messages={window.formAnswer.messages}
                dateFormat={window.formAnswer.dateFormat}
                maxUploadFileSize={window.formAnswer.maxUploadFileSize}
                readonly={window.formAnswer.readonly}
                onChange={this.changed}
                onSectionEnd={this.sectionEnded}
                onEnd={this.ended}
                onUploadFile={this.uploadFile}/>
        );
    }

    uploadFile = (file, callback) => {
        if (isFunction(window.formAnswer.onUploadFile))
            window.formAnswer.onUploadFile(file, callback);
    };

    changed = (answers, answer) => {
        if (isFunction(window.formAnswer.onChange))
            window.formAnswer.onChange(answers, answer);
    };

    sectionEnded = (sectionAnswers) => {
        if (isFunction(window.formAnswer.onSectionEnd))
            window.formAnswer.onSectionEnd(sectionAnswers);
    };

    ended = (answers) => {
        if (isFunction(window.formAnswer.onEnd))
            window.formAnswer.onEnd(answers);
    };
}

export default App;