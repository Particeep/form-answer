import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "../lib/conf/reducer";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('form-answer-root')
);