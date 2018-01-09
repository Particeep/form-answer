import "normalize.css/normalize.css";

import React, {Component} from "react";
import Form from "./Form/Form";

class App extends Component {

    render() {
        return (
            <Form
                form={window.formAnswer.form}
                messages={window.formAnswer.messages}
                maxUploadFileSize={window.formAnswer.maxUploadFileSize}
                dateFormat="yyyy-MM-dd"
                onChange={this.changed}
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

    ended = (answers) => {
        window.formAnswer.onEnd(answers);
    };
}

export default App;