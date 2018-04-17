import React, {Component} from "react";
import {FormControl, MenuItem, Select} from "material-ui";
import Input from "material-ui/Input";
import {questionWrapper} from "../questionWrapper";
import QuestionRadio from "../Radio/QuestionRadio";

class QuestionSelect extends Component {

    render() {
        const {question, value, readonly} = this.props;
        if (readonly) return <QuestionRadio {...this.props}/>
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
    }

    handleChange = value => {
        this.props.onChange(value);
    };
}

export default questionWrapper(QuestionSelect);