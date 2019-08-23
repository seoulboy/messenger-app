import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, {});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
