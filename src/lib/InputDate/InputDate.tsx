import * as React from "react";
import {Input} from "material-ui";
import Mask from "./Mask";
import {InputProps} from "material-ui/Input";

interface Props extends InputProps {
    format: string;
}

class InputDate extends React.Component<Props, {}> {

    render() {
        return (
            <Input {...this.props} inputComponent={this.mask}/>
        );
    }

    private mask = (props) => {
        return <Mask {...props} format={this.props.format}/>;
    }
}

export default InputDate;