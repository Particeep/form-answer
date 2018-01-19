import "./Section.scss";

import React, {Component} from "react";
import {Button} from "material-ui";
import Question from "../Question/Question";
import {connect} from "react-redux";

class Section extends Component {

    render() {
        const {section, messages, next, isLast} = this.props;
        return (
            <main>
                <div className="Section_label">{section.description}</div>
                {section.questions.map(q => {
                    if (this.showQuestion(q)) return <Question key={q.id} question={q}/>
                })}
                <div className="Section_action">
                    <Button raised color="primary" onClick={next} disabled={!this.isValid()}
                            className={'Section_' + (isLast ? 'end' : 'next')}>
                        <span>{isLast ? messages.buttonEnd : messages.buttonNext}</span>
                    </Button>
                </div>
            </main>
        );
    }

    isValid() {
        const validity = this.props.sectionsValidity[this.props.section.id];
        if (validity) return Object.values(validity).every(v => !!v);
    }

    showQuestion(q) {
        const {checkedPossibilityIds} = this.props;
        if (!q.possibility_id_dep) return true;
        for (let k in checkedPossibilityIds) {
            if (checkedPossibilityIds[k] === q.possibility_id_dep) return true;
        }
        return false;
    }
}

const state2Props = (state) => ({
    sectionsValidity: state.formAnswer.sectionsValidity,
    answers: state.formAnswer.answers,
    messages: state.formAnswer.messages,
    checkedPossibilityIds: state.formAnswer.checkedPossibilityIds,
});

export default connect(state2Props)(Section);