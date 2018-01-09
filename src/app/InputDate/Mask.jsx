import React, {Component} from "react";
import MaskedInput from "react-text-mask";

class Mask extends Component {

    render() {
        const {format} = this.props;
        return (
            <MaskedInput
                {...this.props}
                mask={this.buildMask(format)}
                placeholder={format}
                style={{
                    height: '1em',
                    font: 'inherit',
                    color: 'currentColor',
                    width: '100%',
                    margin: 0,
                    padding: '7px 0',
                    display: 'block',
                    boxSizing: 'content-box',
                    background: 'none',
                    verticalAlign: 'middle',
                    border: 0,
                    outline: 'none',
                }}
            />
        );
    }

    buildMask(format) {
        const delimiter = this.determineDelimiterFromFormat(format);
        const yearRegex = [/[1-2]/, /\d/, /\d/, /\d/];
        const monthRegex = [/[0-1]/, /\d/];
        const dayRegex = [/[0-3]/, /\d/];

        let mask = format.split(new RegExp(`(${delimiter})`, 'g'));
        mask = this.replace(mask, 'yyyy', yearRegex);
        mask = this.replace(mask, 'MM', monthRegex);
        mask = this.replace(mask, 'dd', dayRegex);
        return mask;
    }

    /**  @returns {string} '/' or '-' */
    determineDelimiterFromFormat(format) {
        return format.indexOf('/') >= 0 ? '/' : '-';
    }

    replace(array, string, replacement) {
        const i = array.indexOf(string);
        if (i != null) array.splice(i, 1, ...replacement);
        return array;
    }
}

export default Mask;