import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {defaultMuiTheme} from '../lib/conf/mui-theme';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme(defaultMuiTheme)}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('form-answer-root')
);
