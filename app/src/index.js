import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {history, store} from './store';

render(
	<Router history={history}>
		<Provider store={store}>
			<App/>
		</Provider>
	</Router>
	,
	document.getElementById('root')
);

