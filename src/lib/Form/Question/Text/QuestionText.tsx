import * as React from "react";
import {FormControl, FormHelperText, Input} from "material-ui";
import {QuestionProps, questionWrapper} from "../questionWrapper";

interface State {
    touched: boolean;
}

class QuestionText extends React.Component<QuestionProps, State> {

    state = {
        touched: false,
    };

    render() {
        const {value, question, messages, multiline, rows, rowsMax, readonly} = this.props;
        return (
            <FormControl error={this.showError()} fullWidth>
                <Input value={value}
                       multiline={multiline}
                       rows={rows}
                       rowsMax={rowsMax}
                       onChange={e => this.handleChange(e.target.value)}
                       onBlur={() => this.setState({touched: true})}
                       disabled={readonly}/>
                <FormHelperText title={'pattern: ' + question.pattern}>
                    {this.showError() ? messages.invalidText : ''}
                </FormHelperText>
            </FormControl>
        );
    }

    handleChange = value => {
        this.props.onChange(value);
    };

    showError() {
        const {value, isValid, readonly, question} = this.props;
        if (isValid) return false;
        if (readonly) return true;
        if ((!value || value === '')) {
            if (!this.state.touched) return false;
            return question.required;
        }
        return true;
    }
}
// const mapProps = Component => props => <Component {...props} value={props.value && props.value[0] || ''}/>;

export default questionWrapper(QuestionText);