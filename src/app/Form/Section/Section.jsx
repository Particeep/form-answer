import "./Section.scss";

import React, {Component} from "react";
import {Button} from "material-ui";
import Text from "../answer/Text/Text";
import LongText from "../answer/LongText/LongText";
import Radio from "../answer/Radio/Radio";
import {connect} from "react-redux";

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
                    <div key={q.id} className="Section_q">
                        <label className="Section_q_label">
                            {q.label}
                            {q.required && <span className="Section_q_required">*</span>}
                        </label>
                        <div className="Section_q_answer">{this.renderQuestion(q)}</div>
                    </div>
                )}
                <Button raised color="primary" onClick={this.props.next} disabled={!this.isValid()}>Next</Button>
            </main>
        );
    }

    renderQuestion(q) {
        const {answers} = this.props;
        const props = {
            question: q,
            value: (answers[q.id] && answers[q.id][0]) || '',
            onValidationChange: (valid) => this.setState({[q.id]: valid})
        };
        switch (q.question_type) {
            case questionType.TEXT:
                return <Text {...props}/>;
            case questionType.LONGTEXT:
                return <LongText {...props}/>;
            case questionType.RADIO:
                return <Radio {...props}/>;
            default:
                return <Text {...props}/>;
        }
    }

    isValid() {
        return Object.values(this.state).every(v => !!v);
    }
}

function state2Props(state) {
    return {
        answers: state.form.answers,
    }
}

export default connect(state2Props)(Section)