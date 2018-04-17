import * as React from "react";
import QuestionText from "../Text/QuestionText";
import {Question} from "../../../types/Question";

interface Props {
    readonly question: Question;
    readonly readonly: boolean
    readonly validator: (value: string) => boolean;
}

class QuestionLongText extends React.Component<Props, {}> {

    render() {
        return (
            <QuestionText {...this.props} multiline rows="3" rowsMax="10"/>
        );
    }
}

export default QuestionLongText;