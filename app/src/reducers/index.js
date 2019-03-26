import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux'
import {MenuLeft} from './MenuLeft'
import {Account} from './Account'

const reducer = combineReducers({
	routing: routerReducer,
	MenuLeft,
	Account,
});

export {reducer};
