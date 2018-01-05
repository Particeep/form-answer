import React, {Component} from "react";
import {Checkbox, FormControlLabel} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";

class QuestionCheckbox extends Component {

    render() {
        const {question, value} = this.props;
        return (
            <div>
                {/*<FormControlLabel*/}
                    {/*control={*/}
                        {/*<Checkbox*/}
                            {/*checked={this.state.gilad}*/}
                            {/*onChange={this.handleChange('gilad')}*/}
                            {/*value="gilad"*/}
                        {/*/>*/}
                    {/*}*/}
                    {/*label="Gilad Gray"*/}
                {/*/>*/}
            </div>
        );
    }

    componentDidMount() {
        const {question} = this.props;
        this.valueChange(question.answers ? question.answers[0] : '')
    }

    valueChange = value => {
        this.props.onValidationChange(this.isValid(value));
        this.props.dispatch(formAction.updateAnswer(this.props.question.id, [value]));
    };

    isValid(value) {
        return !this.props.question.required || (!!value && value !== '');
    }
}

function state2Props(state) {
    return {
        answers: state.form.answers,
    }
}

export default connect(state2Props)(QuestionCheckbox)