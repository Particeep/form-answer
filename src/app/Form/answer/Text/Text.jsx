import React, {Component} from "react";
import {TextField} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";

class Text extends Component {

    render() {
        return (
            <TextField onChange={this.valueChange} fullWidth/>
        );
    }

    valueChange = e => {
        this.props.dispatch(formAction.updateAnswer(this.props.question.id, e.target.value));
    }
}

function state2Props(state) {
    return {
        answers: state.form.answers,
    }
}

export default connect(state2Props)(Text)