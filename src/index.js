import React from 'react';
import ReactDOM from 'react-dom';
import './components/Css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './components/Css/Followers.css';
import './components/Css/Repositories.css';
import './components/Css/Activities.css';
import './components/Css/Charts.css';
import './components/Css/ProfileTop.css';
import './components/Css/SearchPage.css';
import './components/Css/Footer.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
