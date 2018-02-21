import React, {Component} from "react";
import {Input} from "material-ui";
import Mask from "./Mask";

class InputDate extends Component {

    render() {
        return (
            <Input {...this.props} inputComponent={this.mask}/>
        );
    }

    mask = (props) => {
        return <Mask {...props} format={this.props.format}/>;
    }
}

export default InputDate;