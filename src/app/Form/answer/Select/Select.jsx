import React, {Component} from "react";
import {MenuItem, Select as MuiSelect} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import Input from "material-ui/Input";

class Select extends Component {

    render() {
        const {question, value} = this.props;
        return (
            <MuiSelect
                value={value}
                onChange={e => this.valueChange(e.target.value)}
                input={<Input fullWidth/>}
            >
                <MenuItem value=""/>
                {question.possibilities.map(p =>
                    <MenuItem value={p.label}>{p.label}</MenuItem>
                )}
            </MuiSelect>
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

export default connect(state2Props)(Select)