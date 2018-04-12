import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";

export const defaultMuiTheme = {
    palette: {
        primary: blue,
        secondary: red,
        error: red,
        type: 'light'
    },
    overrides: {
        MuiInput: {
            root: {
                background: 'rgba(0, 0, 0, .05)',
                borderRadius: '3px',
                overflow: 'hidden',
                paddingRight: '8px !important',
                paddingLeft: '8px !important',
            },
            underline: {
                '&:hover:not($disabled):before': {
                    backgroundColor: 'this is an invalid property to get the default color',
                    height: 1,
                },
            },
        },
    },
};