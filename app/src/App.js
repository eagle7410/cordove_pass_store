import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Alert from './Components/Alert'

import {
	Base,
	DataList
} from './pages'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Switch>
						<Route path="/" exact component={Base}/>
						<Route path="/data-list" component={DataList}/>
					</Switch>
				</header>
				<Alert/>
			</div>
		);
	}
}

export default App;
