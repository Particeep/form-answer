import {createMuiTheme} from 'material-ui'
import blue from 'material-ui/colors/blue'
import red from 'material-ui/colors/red'

const muiTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        error: red,
        type: 'light'
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):before': {
                    backgroundColor: 'this is an invalid property to get the default color',
                    height: 1,
                },
            },
        },
    },

});

export default muiTheme;