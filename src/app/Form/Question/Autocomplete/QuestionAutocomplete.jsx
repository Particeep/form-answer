import "./QuestionAutocomplete.scss";

import React, {Component} from "react";
import {MenuItem} from "material-ui/Menu";

import {connect} from "react-redux";
import {questionWrapper} from "../questionWrapper";
import formAction from "../../formAction";
import {Checkbox, Chip, FormControl, Input, Menu} from "material-ui";

class QuestionAutocomplete extends Component {

    state = {
        anchorEl: null,
        filter: null
    };

    render() {
        const {values, question} = this.props;
        const {anchorEl} = this.state;
        return (
            <div>
                <FormControl onClick={this.open} fullWidth>
                    <Input value={values.join(', ')} multiline readOnly rows="1" rowsMax="10"/>
                </FormControl>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                    <header className="Qac_Menu_head">
                        <Checkbox onChange={this.selectAll}
                                  indeterminate={values.length > 0 && values.length < question.possibilities.length}/>
                        <input className="Qac_Menu_input" placeholder="..."
                               onChange={e => this.setState({filter: e.target.value})}/>
                    </header>
                    <div className="Qac_Menu_items">
                        {this.getFilteredPossibilities().map(p =>
                            <MenuItem key={p.id} onClick={() => this.handleChange(p.label)} style={{paddingLeft: 0}}>
                                <Checkbox checked={values.indexOf(p.label) !== -1}/>
                                {p.label}
                            </MenuItem>
                        )}
                    </div>
                </Menu>
            </div>
        );
    }

    componentDidMount() {
        const {values} = this.props;
        if (values.length > 0) this.update(values);
        this.updateValidity(values);
    }

    open = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleChange = value => {
        let values;
        if (this.props.values.indexOf(value) === -1) {
            values = this.props.values.concat(value)
        } else {
            values = this.props.values.filter(v => v !== value);
        }
        this.update(values);
        this.updateValidity(values);
        this.props.notifyChange(this.props.question.id);
    };

    getFilteredPossibilities() {
        const {filter} = this.state;
        if (filter && filter !== '')
            return this.props.question.possibilities.filter(q => q.label.indexOf(this.state.filter) !== -1);
        return this.props.question.possibilities;
    }

    selectAll = (event, checked) => {
        const values = checked ? this.props.question.possibilities.map(p => p.label) : [];
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

export default connect(state2Props)(questionWrapper(QuestionAutocomplete))