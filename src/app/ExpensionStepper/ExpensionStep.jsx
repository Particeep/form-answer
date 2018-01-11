import "./ExpensionStep.scss";

import React, {Component} from "react";
import {Collapse, Icon} from "material-ui";

class ExpensionStep extends Component {

    render() {
        const {isDone, isCurrent, index, label, component} = this.props;
        return (
            <main className={'ExpensionStep ' + (isCurrent ? '-current' : isDone ? '-done' : '-undone')}>
                <header className="ExpensionStep_header" onClick={() => this.props.goTo(index)}>
                    {isDone && !isCurrent && <Icon className="ExpensionStep_i">check</Icon>}
                    {index + 1}. {label}
                </header>
                <Collapse in={isCurrent} timeout="auto" className="ExpensionStep_body">
                    <div className="ExpensionStep_content">
                        {React.cloneElement(component, {next: this.props.next, ...this.props})}
                    </div>
                </Collapse>
            </main>
        );
    }
}

export default ExpensionStep;