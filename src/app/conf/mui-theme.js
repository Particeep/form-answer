import {createMuiTheme} from 'material-ui'
import indigo from 'material-ui/colors/indigo'
import red from 'material-ui/colors/red'

const muiTheme = createMuiTheme({
    palette: {
        primary: indigo,
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