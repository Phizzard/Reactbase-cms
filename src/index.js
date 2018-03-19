import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './firebase.json';

ReactDOM.render(<App config={config} />, document.getElementById('root'));
registerServiceWorker();
