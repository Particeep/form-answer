import {createMuiTheme} from 'material-ui'
import indigo from 'material-ui/colors/indigo'
import red from 'material-ui/colors/red'

const muiTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: red,
        error: red,
        type: 'light'
    }
});

export default muiTheme;