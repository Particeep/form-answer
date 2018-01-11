import React, {Component} from "react";
import formAction from "../formAction";
import {isDependable} from "../utils";

export function questionWrapper(Question) {
    return class extends Component {

        render() {
            return <Question {...this.props}/>
        }

        componentWillUnmount() {
            const {dispatch, question} = this.props;
            dispatch(formAction.updateSectionValidity(question.section_id, question.id, true));
            dispatch(formAction.removeAnswer(question.id));
            if (isDependable(question)) {
                dispatch(formAction.removeCheckedPossbility(question.id));
            }
        }
    }
}