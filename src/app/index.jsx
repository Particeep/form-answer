import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {MuiThemeProvider} from "material-ui/styles";
import {muiTheme} from "../lib/conf/mui-theme";
import {Provider} from "react-redux";
import {store} from "../lib/conf/reducer";

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('form-answer-root')
);