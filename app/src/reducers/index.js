import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux'
import {MenuLeft} from './MenuLeft'
import {Account} from './Account'
import {Alert} from './Alert'

const reducer = combineReducers({
	routing: routerReducer,
	MenuLeft,
	Account,
	Alert,
});

export {reducer};
