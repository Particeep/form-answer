import React, {Component} from "react";
import {Checkbox, FormControlLabel, FormGroup} from "material-ui";
import {questionWrapper} from "../questionWrapper";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";

class QuestionCheckbox extends Component {

    render() {
        const {question, readonly} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <FormGroup>
                    {question.possibilities.map(p =>
                        <FormControlLabel key={p.id} label={p.label} control={
                            <Checkbox
                                checked={this.isPossibilityChecked(p.label)}
                                onChange={this.handleChange(p.label)}
                                value={p.label}
                                disabled={readonly}
                            />
                        }/>
                    )}
                </FormGroup>
            );
        return <QuestionAutocomplete multiSelect {...this.props}/>
    }

    handleChange = value => (event, checked) => {
        let values;
        if (checked) {
            if (!this.isPossibilityChecked(value))
                values = this.props.value.concat(value)
        } else {
            values = this.props.value.filter(v => v !== value);
        }
        this.props.onChange(values);
    };

    isPossibilityChecked(label) {
        return this.props.value.indexOf(label) !== -1;
    }
}

export default questionWrapper(QuestionCheckbox);