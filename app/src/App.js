import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
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
			</div>
		);
	}
}

export default App;
