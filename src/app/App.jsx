import "normalize.css/normalize.css";

import React, {Component} from "react";
import {Form} from "Form";

class App extends Component {

    render() {
        return (
            <Form
                form={window.formAnswer.form}
                messages={window.formAnswer.messages}
                maxUploadFileSize={window.formAnswer.maxUploadFileSize}
                onChange={this.changed}
                onSectionEnd={this.sectionEnded}
                onEnd={this.ended}
                onUploadFile={this.uploadFile}/>
        );
    }

    uploadFile = (file, callback) => {
        window.formAnswer.onUploadFile(file, callback);
    };

    changed = (answers, answer) => {
        window.formAnswer.onChange(answers, answer);
    };

    sectionEnded = (sectionAnswers) => {
        window.formAnswer.onSectionEnd(sectionAnswers);
    };

    ended = (answers) => {
        window.formAnswer.onEnd(answers);
    };
}

export default App;