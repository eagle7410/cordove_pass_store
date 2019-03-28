import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux'
import {Categories} from './Categories'
import {MenuLeft} from './MenuLeft'
import {Account} from './Account'
import {Store} from './Store'
import {Alert} from './Alert'

const reducer = combineReducers({
	routing: routerReducer,
	Categories,
	MenuLeft,
	Account,
	Store,
	Alert,
});

export {reducer};
