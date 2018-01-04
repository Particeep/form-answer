import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {MuiThemeProvider} from "material-ui/styles";
import muiTheme from "conf/mui-theme";


ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
);