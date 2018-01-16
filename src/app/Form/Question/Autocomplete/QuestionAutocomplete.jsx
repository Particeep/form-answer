import "./QuestionAutocomplete.scss";

import React, {Component} from "react";
import {MenuItem} from "material-ui/Menu";
import {Checkbox, FormControl, Input, Menu, Radio} from "material-ui";

class QuestionAutocomplete extends Component {

    state = {
        anchorEl: null,
        filter: null
    };

    render() {
        const {values, question, multiSelect, messages} = this.props;
        const {anchorEl} = this.state;
        return (
            <div>
                <FormControl onClick={this.open} fullWidth>
                    <Input value={values.join(', ')} multiline readOnly rows="1" rowsMax="10"/>
                </FormControl>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.close}>
                    <header className={'Qac_Menu_head' + (multiSelect ? ' -withCb' : '')}>
                        {multiSelect &&
                        <Checkbox onChange={this.selectAll}
                                  indeterminate={values.length > 0 && values.length < question.possibilities.length}/>
                        }
                        <input className="Qac_Menu_input" placeholder={messages.search + '...'}
                               onChange={e => this.setState({filter: e.target.value})}/>
                    </header>
                    <div className="Qac_Menu_items">
                        {this.getFilteredPossibilities().map(p =>
                            <MenuItem key={p.id} onClick={() => this.handleChange(p.label)} style={{paddingLeft: 0}}>
                                {multiSelect && <Checkbox checked={values.indexOf(p.label) !== -1}/>}
                                {!multiSelect && <Radio checked={values.indexOf(p.label) !== -1}/>}
                                {p.label}
                            </MenuItem>
                        )}
                    </div>
                </Menu>
            </div>
        );
    }

    open = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    close = () => {
        this.setState({anchorEl: null});
    };

    handleChange = (value) => {
        let values;
        if (this.props.multiSelect) {
            if (this.props.values.indexOf(value) === -1) values = this.props.values.concat(value)
            else values = this.props.values.filter(v => v !== value);
        } else {
            if (this.props.values.indexOf(value) === -1) values = [value];
            else value = [];
            this.close();
        }
        this.props.onChange(values);
    };

    getFilteredPossibilities() {
        const {filter} = this.state;
        if (filter && filter !== '')
            return this.props.question.possibilities.filter(q => q.label.indexOf(this.state.filter) !== -1);
        return this.props.question.possibilities;
    }

    selectAll = (event, checked) => {
        const values = checked ? this.props.question.possibilities.map(p => p.label) : [];
        this.props.onChange(values);
    };
}

export default QuestionAutocomplete;