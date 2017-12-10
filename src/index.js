import React from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css'
import config from './firebase-test.json';
import ReactBase from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReactBase config={config} />, document.getElementById('root'));
registerServiceWorker();
