import "./ExpensionStep.scss";
import * as React from "react";
import {ReactElement} from "react";
import {Collapse, Icon} from "material-ui";

const animationDuration = 300;

interface Props {
    label: string;
    component: ReactElement<any>;

    // Prop pass by ExpensionStepper
    prev?: () => void;
    next?: () => void;
    goTo?: (i: number) => void;
    free?: boolean;
    index?: number;
    disabled?: boolean;
    isCurrent?: boolean;
    isLast?: boolean;
}

class ExpensionStep extends React.Component<Props, {}> {

    private $root: HTMLElement;

    render() {
        const {disabled, free, isCurrent, index, label, component, goTo} = this.props;
        return (
            <main className={'ExpensionStep ' + (isCurrent ? '-current' : !disabled ? '-done' : '-undone')}
                  ref={node => this.$root = node}>
                <header className="ExpensionStep_header" onClick={() => goTo(index)}>
                    {!free && !disabled && !isCurrent && <Icon className="ExpensionStep_i">check</Icon>}
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

    componentDidUpdate(prevProps: any) {
        if (!prevProps.isCurrent && this.props.isCurrent)
            setTimeout(() => this.scrollTop(), animationDuration);
    }

    private scrollTop = () => {
        this.$root.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

export default ExpensionStep;