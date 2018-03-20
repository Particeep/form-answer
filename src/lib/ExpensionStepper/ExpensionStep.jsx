import "./ExpensionStep.scss";

import React, {Component} from "react";
import {Collapse, Icon} from "material-ui";

const animationDuration = 300;

class ExpensionStep extends Component {

    render() {
        const {isDone, isCurrent, index, label, component, goTo} = this.props;
        return (
            <main className={'ExpensionStep ' + (isCurrent ? '-current' : isDone ? '-done' : '-undone')}
                  ref={node => this.$root = node}>
                <header className="ExpensionStep_header" onClick={() => goTo(index)}>
                    {isDone && !isCurrent && <Icon className="ExpensionStep_i">check</Icon>}
                    {index + 1}. {label}
                </header>
                <Collapse in={isCurrent} timeout={animationDuration} className="ExpensionStep_body">
                    <div className="ExpensionStep_content">
                        {React.cloneElement(component, {...this.props})}
                    </div>
                </Collapse>
            </main>
        );
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isCurrent && this.props.isCurrent)
            setTimeout(() => this.scrollTop(), animationDuration);
    }

    scrollTop = () => {
        this.$root.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

export default ExpensionStep;