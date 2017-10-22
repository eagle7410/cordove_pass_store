import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {recordAdd} from './Storage/RecordAdd';
import {storage} from './Storage/Storage';
import {storageFilters} from './Storage/Filters';
import {storageCategories} from './Storage/Categories';
import {storagePagination} from './Storage/Pagination'
import {dataConfirm} from './Confirm';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import {alert} from './Alert'
import {dataLoader} from './DataLoader'
import {stepsUpload} from './Settings/StepsUpload'
import {stepsDownload} from './Settings/StepsDownload'


const reducer = combineReducers({
	routing: routerReducer,
	recordAdd,
	login,
	users,
	storage,
	storageFilters,
	storageCategories,
	storagePagination,
	alert,
	dataConfirm,
	dataLoader,
	navMenu,
	stepsUpload,
	stepsDownload
});

export {reducer};
