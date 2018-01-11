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
                <Button raised color="primary" onClick={next} disabled={!this.isValid()}>
                    {isLast ? messages.buttonEnd : messages.buttonNext}
                </Button>
            </main>
        );
    }

    isValid() {
        const validity = this.props.sectionsValidity[this.props.section.id];
        if (validity) return Object.values(validity).every(v => !!v);
    }

    showQuestion(q) {
        const {checkePossibilityIds} = this.props;
        if (!q.possibility_id_dep) return true;
        for (let k in checkePossibilityIds) {
            if (checkePossibilityIds[k] === q.possibility_id_dep) return true;
        }
        return false;
    }
}

function state2Props(state) {
    return {
        sectionsValidity: state.form.sectionsValidity,
        answers: state.form.answers,
        messages: state.form.messages,
        checkePossibilityIds: state.form.checkePossibilityIds,
    }
}

export default connect(state2Props)(Section);