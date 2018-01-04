import "./Section.scss";

import React, {Component} from "react";
import {Button} from "material-ui";
import Text from "../answer/Text/Text";
import LongText from "../answer/LongText/LongText";

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

    state = {};

    render() {
        return (
            <main>
                {this.props.section.questions.map(q =>
                    <div key={q.id} className="Section_question">
                        <label className="Section_question_label">{q.id}</label>
                        <div className="Section_question_answer">{this.renderQuestion(q)}</div>
                    </div>
                )}
                <Button raised color="primary" onClick={this.props.next} disabled={!this.isValid()}>Next</Button>
            </main>
        );
    }

    renderQuestion(q) {
        switch (q.question_type) {
            case questionType.TEXT:
                return <Text question={q} onValidationChange={(isValid) => this.setState({[q.id]: isValid})}/>;
            case questionType.LONGTEXT:
                return <LongText question={q} onValidationChange={(isValid) => this.setState({[q.id]: isValid})}/>;
            default:
                return <Text question={q} onValidationChange={(isValid) => this.setState({[q.id]: isValid})}/>;
        }
    }

    isValid() {
        return Object.values(this.state).every(v => !!v);
    }
}


export default Section;