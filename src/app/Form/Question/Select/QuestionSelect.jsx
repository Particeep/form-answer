import React, {Component} from "react";
import {MenuItem, Select} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import Input from "material-ui/Input";

class QuestionSelect extends Component {

    render() {
        const {question, value} = this.props;
        return (
            <Select
                value={value}
                onChange={e => this.valueChange(e.target.value)}
                input={<Input fullWidth/>}
            >
                <MenuItem value=""/>
                {question.possibilities.map(p =>
                    <MenuItem value={p.label}>{p.label}</MenuItem>
                )}
            </Select>
        );
    }

    componentDidMount() {
        const {question} = this.props;
        this.valueChange(question.answers ? question.answers[0] : '')
    }

    valueChange = value => {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(value)))
        dispatch(formAction.updateAnswer(question.id, [value]));
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

export default connect(state2Props)(QuestionSelect)