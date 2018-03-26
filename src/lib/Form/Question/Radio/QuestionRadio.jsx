import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup} from "material-ui";
import {questionWrapper} from "../questionWrapper";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";

class QuestionRadio extends Component {

    render() {
        const {question, value, readonly} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <RadioGroup
                    value={value}
                    onChange={e => this.handleChange(e.target.value)}
                >
                    {question.possibilities.map(p =>
                        <FormControlLabel
                            value={p.label}
                            control={<Radio/>}
                            label={p.label}
                            key={p.id}
                            onClick={() => value === p.label && this.handleChange('')}
                            disabled={readonly}/>
                    )}
                </RadioGroup>
            );
        return <QuestionAutocomplete {...this.props}/>
    }

    handleChange = value => {
        this.props.onChange(value);
    };
}

export default questionWrapper(QuestionRadio);