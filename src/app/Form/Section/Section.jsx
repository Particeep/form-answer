import "./Section.scss";

import React, {Component} from "react";
import {Button} from "material-ui";
import Question from "../Question/Question";
import {connect} from "react-redux";

class Section extends Component {

    render() {
        return (
            <main>
                <div className="Section_label">{this.props.section.description}</div>
                {this.props.section.questions.map(q =>
                    <Question key={q.id} question={q}/>
                )}
                <Button raised color="primary" onClick={this.props.next} disabled={!this.isValid()}>Next</Button>
            </main>
        );
    }

    isValid() {
        const validity = this.props.sectionsValidity[this.props.section.id];
        if(validity) return Object.values(validity).every(v => !!v);
    }
}

function state2Props(state) {
    return {
        sectionsValidity: state.form.sectionsValidity,
    }
}

export default connect(state2Props)(Section);