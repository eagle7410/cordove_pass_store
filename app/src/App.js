import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Alert from './Components/Alert'
import {LocalStore} from "./Api";

import {
	PREFIX_ACCOUNT as PREFIX,
	PREFIX_ALERT as ALERT
} from "./const/prefix";

import {
	Auth,
	DataList,
	Categories
} from './pages'

class App extends Component {
	componentWillMount() {
		try {
			let dataString = LocalStore.getItem('credentials');
			this.props.setCredentials(JSON.parse(dataString));
		} catch (e) {
			this.props.showError(`Error get data from localStore: ${e.message || e}`);
		}
	}

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

export default connect(
	state => ({
		store: state.Account
	}),
	dispatch => ({
		setCredentials: (credentials) => dispatch({type: `${PREFIX}SetCredential`, data : credentials}),
		showError: (message) => dispatch({type: `${ALERT}OpenError`, message}),
	})
)(App)
