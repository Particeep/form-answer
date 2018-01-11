import React, {Component} from "react";
import QuestionText from "../Text/QuestionText";

class QuestionLongText extends Component {

    render() {
        return (
            <QuestionText {...this.props} multiline rows="3" rowsMax="10"/>
        );
    }
}

export default QuestionLongText;