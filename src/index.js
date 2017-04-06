import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import App from './components/App';

import configureStore from './stores/configureStore';

// css
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const token = localStorage.getItem('token');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={App} />

      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
