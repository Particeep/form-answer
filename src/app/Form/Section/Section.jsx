import "./Section.scss";

import React, {Component} from "react";
import {Button} from "material-ui";
import Text from "../answer/Text/Text";

const questionType = {
    TEXT: 'TEXT',
    LONGTEXT: 'LONGTEXT',
    DATE: 'DATE',
    NUMBER: 'NUMBER',
    RADIO: 'RADIO',
    SELECT: 'SELECT',
    CHECKBOX: 'CHECKBOX',
    DOCUMENT: 'DOCUMENT',
    LABEL: 'LABEL',
};

class Section extends Component {

    render() {
        return (
            <main>
                {this.props.section.questions.map(q =>
                    <div key={q.id} className="Section_question">
                        <label className="Section_question_label">{q.label}</label>
                        <div className="Section_question_answer">{this.renderQuestion(q)}</div>
                    </div>
                )}
                <Button raised color="primary" onClick={this.props.next}>Next</Button>
            </main>
        );
    }

    renderQuestion(q) {
        switch (q.type) {
            case questionType.TEXT:
                return <Text question={q}/>;
            default:
                return <Text question={q}/>;
        }
    }
}


export default Section;