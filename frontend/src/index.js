import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';


const app = (
	<Provider >
		<App />
	</Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
