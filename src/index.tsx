import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './table.css';
import './pagination.css';
import './voucher.css';
import './loading.css';
import App from './App';
import { Router } from 'react-router-dom';
import history from './history';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { store } from './state';
import store from './state/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
