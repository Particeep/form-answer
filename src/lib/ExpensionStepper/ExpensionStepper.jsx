import "./ExpensionStepper.scss";

import React, {Component} from "react";

class ExpensionStepper extends Component {

    render() {
        return (
            <main>
                {React.Children.map(this.props.children, (step, i) => React.cloneElement(step, {
                    prev: this.prev,
                    next: this.next,
                    goTo: this.goTo,
                    free: this.props.free,
                    index: i,
                    disabled: i > this.state.reached,
                    isCurrent: i === this.state.current,
                    isLast: i === this.props.children.length - 1
                }))}
            </main>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            reached: props.free ? props.children.length - 1 : 0,
        }
    }

    goTo = i => {
        if (this.state.reached >= i) this.setState({current: i});
    };

    prev = () => {
        if (this.state.current > 0) {
            this.setState({current: this.state.current - 1});
        }
    };

    next = () => {
        if (this.state.current < this.props.children.length - 1) {
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