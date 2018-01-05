import React, {Component} from "react";
import {FormControlLabel, RadioGroup, Radio as RadioButton} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";

class Radio extends Component {

    render() {
        const {question, value} = this.props;
        return (
            <RadioGroup
                value={value}
                onChange={e => this.valueChange(e.target.value)}
            >
                {question.possibilities.map(p =>
                    <FormControlLabel
                        value={p.label}
                        control={<RadioButton/>}
                        label={p.label}
                        key={p.id}
                        onClick={() => this.onClick(p.label)}/>
                )}
            </RadioGroup>
        );
    }

    componentDidMount() {
        const {question} = this.props;
        this.valueChange(question.answers ? question.answers[0] : '')
    }

    onClick = value => {
        if (value === this.props.value) this.valueChange('');
    };

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

export default connect(state2Props)(Radio)