import "normalize.css/normalize.css";

import React, {Component} from "react";
import Form from "./Form/Form";

class App extends Component {

    render() {
        return (
            <Form
                form={window.formAnswer.form}
                onChange={this.changed}
                dateFormat="yyyy-MM-dd"
                onEnd={this.ended}/>
        );
    }

    changed = (answers, answer) => {
        window.formAnswer.onChange(answers, answer);
    };

    ended = (answers) => {
        window.formAnswer.onEnd(answers);
    };
}

export default App;