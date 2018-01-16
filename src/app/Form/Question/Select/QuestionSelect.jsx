import React, {Component} from "react";
import {FormControl, MenuItem, Select} from "material-ui";
import Input from "material-ui/Input";
import {mapSingleAnswer, parseSingleAnswer} from "../../utils";
import {questionWrapper} from "../questionWrapper";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";

class QuestionSelect extends Component {

    render() {
        const {question, values} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <FormControl fullWidth style={{minHeight: '40px'}}>
                    <Select
                        value={mapSingleAnswer(values) || ''}
                        onChange={e => this.handleChange(e.target.value)}
                        input={<Input/>}>
                        <MenuItem value=""/>
                        {question.possibilities.map(p =>
                            <MenuItem key={p.id} value={p.label}>{p.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            );
        return <QuestionAutocomplete {...this.props}/>
    }

    handleChange = value => {
        this.props.onChange(parseSingleAnswer(value));
        this.props.onCheckPossibility(this.props.question.possibilities.find(p => p.label === value).id);
    };
}

export default questionWrapper(QuestionSelect);