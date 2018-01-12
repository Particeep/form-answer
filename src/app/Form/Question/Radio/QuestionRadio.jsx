import React, {Component} from "react";
import {FormControlLabel, RadioGroup, Radio} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionWrapper} from "../questionWrapper";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";

class QuestionRadio extends Component {

    render() {
        const {question, value} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <RadioGroup
                    value={value || ''}
                    onChange={e => this.handleChange(e.target.value)}
                >
                    {question.possibilities.map(p =>
                        <FormControlLabel
                            value={p.label}
                            control={<Radio/>}
                            label={p.label}
                            key={p.id}
                            onClick={() => this.onClick(p.label)}/>
                    )}
                </RadioGroup>
            );
        return <QuestionAutocomplete {...this.props}/>
    }

    componentDidMount() {
        const {value} = this.props;
        if (value != undefined) this.update(value);
        this.updateValidity(value);
    }

    onClick = value => {
        if (value === this.props.value) this.handleChange('');
    };

    handleChange = value => {
        this.update(value);
        this.updateValidity(value);
        this.props.notifyChange(this.props.question.id);
    };

    update(value) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateAnswer(question.id, parseSingleAnswer(value)));
        dispatch(formAction.addCheckedPossbility(question.id, question.possibilities.find(p => p.label == value).id));
    }

    updateValidity(value) {
        const {dispatch, question} = this.props;
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

export default connect(state2Props)(questionWrapper(QuestionRadio))