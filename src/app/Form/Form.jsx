import "./Form.scss";

import React, {Component} from "react";
import {ExpensionStep, ExpensionStepper} from "../ExpensionStepper";
import Section from "./Section/Section";

class Form extends Component {

    render() {
        return (
            <ExpensionStepper onEnd={this.end}>
                {this.props.form.sections.map(s =>
                    <ExpensionStep label="label!" component={<Section section={s}/>} key={s.id}/>
                )}
            </ExpensionStepper>
        );
    }

    end = () => {
        console.log("end");
    }
}


export default Form;