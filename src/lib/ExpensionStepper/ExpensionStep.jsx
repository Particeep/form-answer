import "./ExpensionStep.scss";

import React, {Component} from "react";
import {Collapse, Icon} from "material-ui";

class ExpensionStep extends Component {

    scrollToTopOfSection = () => {
        console.log("dazdndzaodjnbzajdnoâznipbdoza");
        this.Element.scrollIntoView();
    };

    render() {
        const {isDone, isCurrent, index, label, component} = this.props;
        return (
            <main className={'ExpensionStep ' + (isCurrent ? '-current' : isDone ? '-done' : '-undone')} ref={node => this.Element = node}>
                <header className={"ExpensionStep_header ExpensionStep_Step" + index} onClick={() => this.props.goTo(index)}>
                    {isDone && !isCurrent && <Icon className="ExpensionStep_i">check</Icon>}
                    {index + 1}. {label}
                </header>
                <Collapse in={isCurrent} timeout="auto" className="ExpensionStep_body">
                    <div className="ExpensionStep_content">
                        {React.cloneElement(component, {...this.props, scrollToTop: this.scrollToTopOfSection})}
                    </div>
                </Collapse>
            </main>
        );
    }
}

export default ExpensionStep;