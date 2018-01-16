import React, {Component} from "react";
import {FormControlLabel, Radio, RadioGroup} from "material-ui";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionWrapper} from "../questionWrapper";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";

class QuestionRadio extends Component {

    render() {
        const {question, values} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <RadioGroup
                    value={mapSingleAnswer(values)}
                    onChange={e => this.handleChange(e.target.value)}
                >
                    {question.possibilities.map(p =>
                        <FormControlLabel
                            value={p.label}
                            control={<Radio/>}
                            label={p.label}
                            key={p.id}
                            onClick={() => values === this.props.value && this.handleChange('')}/>
                    )}
                </RadioGroup>
            );
        return <QuestionAutocomplete {...this.props}/>
    }

    handleChange = value => {
        this.props.onChange(parseSingleAnswer(value));
        this.props.onCheckPossibility(this.props.question.possibilities.find(p => p.label === value).id);
    };
}

export default questionWrapper(QuestionRadio);