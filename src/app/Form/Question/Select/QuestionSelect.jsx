import React, {Component} from "react";
import {FormControl, MenuItem, Select} from "material-ui";
import Input from "material-ui/Input";
import {questionWrapper} from "../questionWrapper";
import {maxPossibilitiesBeforeAutocomplete} from "../Question";
import QuestionAutocomplete from "../Autocomplete/QuestionAutocomplete";

class QuestionSelect extends Component {

    render() {
        const {question, value, ...other} = this.props;
        if (question.possibilities.length < maxPossibilitiesBeforeAutocomplete)
            return (
                <FormControl fullWidth style={{minHeight: '40px'}}>
                    <Select
                        value={value}
                        onChange={e => this.handleChange(e.target.value)}
                        input={<Input/>}>
                        <MenuItem value=""/>
                        {question.possibilities.map(p =>
                            <MenuItem key={p.id} value={p.label}>{p.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            );
        return <QuestionAutocomplete question={question} value={[value]} {...other}/>
    }

    handleChange = value => {
        this.props.onChange(value);
        const possibility = this.props.question.possibilities.find(p => p.label === value);
        if (possibility) this.props.onCheckPossibility(possibility.id);
    };
}

export default questionWrapper(QuestionSelect);