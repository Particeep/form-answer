import "./ExpensionStepper.scss";
import * as React from "react";
import {ReactElement, ReactNode} from "react";
import ExpensionStep from "./ExpensionStep";

interface Props {
    free: boolean;
    onNext: (index: number) => void;
    onEnd: () => void;
    children: ReactNode;
}

interface State {
    current: number;
    reached: number;
}

class ExpensionStepper extends React.Component<Props, State> {

    render() {
        return (
            <main>
                {React.Children.map(this.props.children, (step: ReactElement<any>, i: number) =>
                    React.cloneElement(step, {
                        prev: this.prev,
                        next: this.next,
                        goTo: this.goTo,
                        free: this.props.free,
                        index: i,
                        disabled: i > this.state.reached,
                        isCurrent: i == this.state.current,
                        isLast: i == React.Children.count(this.props.children) - 1
                    })
                )}
            </main>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            reached: props.free ? React.Children.count(this.props.children) - 1 : 0,
        }
    }

    goTo = (i: number) => {
        if (this.state.reached >= i) this.setState({current: i});
    };

    prev = () => {
        if (this.state.current > 0) {
            this.setState({current: this.state.current - 1});
        }
    };

    next = () => {
        if (this.state.current < React.Children.count(this.props.children) - 1) {
            this.props.onNext(this.state.current);
            this.setState({
                current: this.state.current + 1,
                reached: Math.max(this.state.reached, this.state.current + 1)
            });
        } else if (this.props.onEnd) {
            this.props.onEnd();
        }
    };
}

export default ExpensionStepper;