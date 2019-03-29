import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux'
import {Categories} from './Categories'
import {CategoryAdd} from './CategoryAdd'
import {MenuLeft} from './MenuLeft'
import {Account} from './Account'
import {StoreFilters} from './StoreFilters'
import {Store} from './Store'
import {Alert} from './Alert'

const reducer = combineReducers({
	routing: routerReducer,
	StoreFilters,
	CategoryAdd,
	Categories,
	MenuLeft,
	Account,
	Store,
	Alert,
});

export {reducer};
