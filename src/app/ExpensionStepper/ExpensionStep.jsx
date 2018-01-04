import "./ExpensionStep.scss";

import React, {Component} from "react";
import {Collapse, Icon} from "material-ui";

class ExpensionStep extends Component {

    render() {
        const {isDone, isCurrent, index, label, component} = this.props;
        return (
            <main className={'ExpensionStep ' + (isCurrent ? '-current' : isDone ? '-done' : '-undone')}>
                {isDone}
                <header className="ExpensionStep_header" onClick={() => this.props.goTo(index)}>
                    <div className="ExpensionStep_i">
                        {!isDone && index && <span>{index + 1}</span>}
                        {isDone && <Icon>check</Icon>}
                    </div>
                    {label}
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