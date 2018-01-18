import "normalize.css/normalize.css";

import React, {Component} from "react";
import {Form} from "Form";

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
                onChange={this.changed}
                onSectionEnd={this.sectionEnded}
                onEnd={this.ended}
                onUploadFile={this.uploadFile}/>
        );
    }

    uploadFile = (file, callback) => {
        if (this.isCallbackDefined(window.formAnswer.onUploadFile))
            window.formAnswer.onUploadFile(file, callback);
    };

    changed = (answers, answer) => {
        if (this.isCallbackDefined(window.formAnswer.onChange))
            window.formAnswer.onChange(answers, answer);
    };

    sectionEnded = (sectionAnswers) => {
        if (this.isCallbackDefined(window.formAnswer.onSectionEnd))
            window.formAnswer.onSectionEnd(sectionAnswers);
    };

    ended = (answers) => {
        if (this.isCallbackDefined(window.formAnswer.onEnd))
            window.formAnswer.onEnd(answers);
    };

    isCallbackDefined(callback) {
        return callback && typeof callback === 'function';
    }
}

export default App;