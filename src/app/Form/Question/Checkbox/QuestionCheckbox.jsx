import React, {Component} from "react";
import {Checkbox, FormControlLabel, FormGroup} from "material-ui";
import {connect} from "react-redux";
import formAction from "../../formAction";
import {questionWrapper} from "../questionWrapper";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";

class QuestionCheckbox extends Component {

    render() {
        const {question, values} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <FormGroup>
                    {question.possibilities.map(p =>
                        <FormControlLabel key={p.id} label={p.label} control={
                            <Checkbox
                                checked={values.indexOf(p.label) !== -1}
                                onChange={this.handleChange(p.label)}
                                value={p.label}
                            />
                        }/>
                    )}
                </FormGroup>
            );
        return <QuestionAutocomplete multiSelect {...this.props}/>
    }

    componentDidMount() {
        const {values} = this.props;
        if (values.length > 0) this.update(values);
        this.updateValidity(values);
    }

    handleChange = value => (event, checked) => {
        let values;
        if (checked) {
            if (this.props.values.indexOf(value) === -1)
                values = this.props.values.concat(value)
        } else {
            values = this.props.values.filter(v => v !== value);
        }
        this.update(values);
        this.updateValidity(values);
        this.props.notifyChange(this.props.question.id);
    };

    update(values) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateAnswer(question.id, values));
    }

    updateValidity(values) {
        const {dispatch, question} = this.props;
        dispatch(formAction.updateSectionValidity(question.section_id, question.id, this.isValid(values)));
    }

    isValid(values) {
        return !this.props.question.required || (!!values && values.length > 0);
    }
}

const state2Props = (state, props) => ({
    values: state.form.answers[props.question.id] || [],
    notifyChange: state.form.notifyChange,
});

export default connect(state2Props)(questionWrapper(QuestionCheckbox))