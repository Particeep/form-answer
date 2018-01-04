import React, {Component} from "react";

class Section extends Component {

    render() {
        return (
            <main>
                Section !!
                <button onClick={this.props.next}>Next</button>
            </main>
        );
    }
}


export default Section;