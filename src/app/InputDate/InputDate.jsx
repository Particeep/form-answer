import React, {Component} from "react";
import {Input} from "material-ui";
import Mask from "./Mask";

class InputDate extends Component {

    render() {
        return (
            <Input {...this.props} inputComponent={this.mask}/>
        );
    }

    mask = () => {
        return <Mask format={this.props.format || 'dd/MM/yyyy'}/>;
    }
}

export default InputDate;