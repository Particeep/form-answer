import React, {Component} from "react";
import {MenuItem, Select} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import Input from "material-ui/Input";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";

class QuestionSelect extends Component {

    render() {
        const {question, value} = this.props;
        return (
            <Select
                value={value || ''}
                onChange={e => this.handleChange(e.target.value)}
                input={<Input fullWidth/>}
            >
                <MenuItem value=""/>
                {question.possibilities.map(p =>
                    <MenuItem key={p.id} value={p.label}>{p.label}</MenuItem>
                )}
            </Select>
        );
    }

    componentDidMount() {
        const {value} = this.props;
        this.update(value);
    }

    handleChange = value => {
        this.update(value);
        this.props.notifyChange(this.props.question.id);
    };

    update(value) {
        const {dispatch, question} = this.props;
        if (value != undefined) dispatch(formAction.updateAnswer(question.id, parseSingleAnswer(value)))
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(value)));
    }

    isValid(value) {
        return !this.props.question.required || (!!value && value !== '');
    }
}

const state2Props = (state, props) => ({
    value: mapSingleAnswer(state.form.answers[props.question.id]),
    notifyChange: state.form.notifyChange,
});

export default connect(state2Props)(QuestionSelect)