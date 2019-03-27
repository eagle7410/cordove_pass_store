import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Alert from './Components/Alert'

import {
	Auth,
	DataList,
	Categories
} from './pages'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Switch>
						<Route path="/" exact component={Auth}/>
						<Route path="/data-list" component={DataList}/>
						<Route path="/categories" component={Categories}/>
					</Switch>
				</header>
				<Alert/>
			</div>
		);
	}
}

export default App;
