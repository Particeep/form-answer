import {blue, red} from '@material-ui/core/colors';

export const defaultMuiTheme: any = {
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
        borderRadius: '4px 4px 0 0',
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
